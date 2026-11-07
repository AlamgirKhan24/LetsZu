/* Cart logic tests. Run with: node tests/cart.test.js (no dependencies) */
const vm = require("vm"),
  fs = require("fs"),
  path = require("path"),
  assert = require("assert");
const root = path.join(__dirname, ".."),
  files = [
    "js/config.js",
    "js/services/storage.js",
    "js/data/categories.js",
    "js/data/products.js",
    "js/data/images.js",
    "js/services/product-service.js",
    "js/services/cart-service.js",
  ];
const makeStore = () => {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    raw: m,
  };
};
/* Simulates one page load. Reuse the same `store` to simulate a reload. */
const load = (store, { broken = false } = {}) => {
  const events = [];
  const ctx = {
    document: {
      body: { dataset: {} },
      dispatchEvent: (e) => events.push(e.type),
      addEventListener() {},
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
    },
    CustomEvent: class {
      constructor(t) {
        this.type = t;
      }
    },
    addEventListener() {},
    console,
    JSON,
    Math,
    Number,
    Array,
    Object,
    parseInt,
    Date,
  };
  ctx.window = ctx;
  ctx.localStorage = broken
    ? {
        getItem() {
          throw new Error("blocked");
        },
        setItem() {
          throw new Error("blocked");
        },
        removeItem() {
          throw new Error("blocked");
        },
      }
    : store;
  vm.createContext(ctx);
  files.forEach((f) =>
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, {
      filename: f,
    }),
  );
  return { LZ: ctx.LZ, events };
};
const plain = (x) => JSON.parse(JSON.stringify(x)),
  eq = (a, b, m) => assert.deepStrictEqual(plain(a), plain(b), m);
const key = "lz_cart";
let passed = 0;
const test = (name, fn) => {
  try {
    fn();
    passed++;
    console.log("  ok  " + name);
  } catch (e) {
    console.error("FAIL  " + name + "\n      " + e.message);
    process.exitCode = 1;
  }
};
const P = (LZ, i = 0) => LZ.data.products.filter((p) => p.tea !== false)[i].id;

test("empty cart has zero count and zero totals", () => {
  const { LZ } = load(makeStore());
  eq(LZ.cart.items(), []);
  assert.strictEqual(LZ.cart.count(), 0);
  eq(LZ.cart.totals(), { sub: 0, ship: 0, tax: 0, total: 0 });
});
test("adding the same product and size merges quantities; another size is a new line", () => {
  const { LZ } = load(makeStore()),
    id = P(LZ);
  LZ.cart.add(id, 100, 1);
  LZ.cart.add(id, 100, 2);
  LZ.cart.add(id, 50, 1);
  const i = LZ.cart.items();
  assert.strictEqual(i.length, 2);
  assert.strictEqual(i.find((x) => x.size === 100).qty, 3);
  assert.strictEqual(LZ.cart.count(), 4);
});
test("size passed as a string (from a data attribute) matches the numeric size", () => {
  const { LZ } = load(makeStore()),
    id = P(LZ);
  LZ.cart.add(id, "100", 1);
  LZ.cart.setQty(id, "100", 4);
  assert.strictEqual(LZ.cart.items().length, 1);
  assert.strictEqual(LZ.cart.items()[0].qty, 4);
  LZ.cart.remove(id, "100");
  assert.strictEqual(LZ.cart.count(), 0);
});
test("per-item limit is enforced and reported", () => {
  const { LZ } = load(makeStore()),
    id = P(LZ),
    max = LZ.config.maxQty;
  assert.strictEqual(LZ.cart.add(id, 100, max - 1), true);
  assert.strictEqual(LZ.cart.add(id, 100, 1), true);
  assert.strictEqual(LZ.cart.add(id, 100, 5), false);
  assert.strictEqual(LZ.cart.items()[0].qty, max);
  LZ.cart.setQty(id, 100, 999);
  assert.strictEqual(LZ.cart.items()[0].qty, max);
});
test("invalid additions are ignored", () => {
  const { LZ } = load(makeStore());
  assert.strictEqual(LZ.cart.add("no-such-tea", 100, 1), false);
  assert.strictEqual(LZ.cart.count(), 0);
});
test("quantity below 1 removes the line; remove, clear and restore work", () => {
  const { LZ } = load(makeStore()),
    a = P(LZ, 0),
    b = P(LZ, 1);
  LZ.cart.add(a, 100, 2);
  LZ.cart.add(b, 100, 1);
  LZ.cart.setQty(a, 100, 0);
  assert.strictEqual(LZ.cart.items().length, 1);
  const snap = LZ.cart.items();
  LZ.cart.clear();
  assert.strictEqual(LZ.cart.count(), 0);
  LZ.cart.restore(snap);
  assert.strictEqual(LZ.cart.items().length, 1);
});
test("totals are exact to the cent, with shipping threshold and estimated tax", () => {
  const { LZ } = load(makeStore()),
    id = P(LZ);
  const unit = LZ.products.price(LZ.products.get(id), 100);
  LZ.cart.add(id, 100, 1);
  let t = LZ.cart.totals();
  assert.strictEqual(t.sub, unit);
  assert.strictEqual(
    t.ship,
    unit >= LZ.config.freeShipping ? 0 : LZ.config.shipping,
  );
  assert.strictEqual(t.tax, Math.round(unit * 100 * LZ.config.taxRate) / 100);
  LZ.cart.clear();
  LZ.cart.add(id, 50, 3);
  LZ.cart.add(id, 250, 1);
  t = LZ.cart.totals();
  const cents =
    3 * Math.round(LZ.products.price(LZ.products.get(id), 50) * 100) +
    Math.round(LZ.products.price(LZ.products.get(id), 250) * 100);
  assert.strictEqual(t.sub, cents / 100);
  assert.strictEqual(
    Math.round(t.total * 100),
    Math.round(t.sub * 100) +
      Math.round(t.ship * 100) +
      Math.round(t.tax * 100),
  );
  LZ.cart.add(id, 250, 20);
  assert.strictEqual(LZ.cart.totals().ship, 0);
});
test("cart survives a reload", () => {
  const store = makeStore(),
    first = load(store),
    id = P(first.LZ);
  first.LZ.cart.add(id, 250, 2);
  const second = load(store);
  eq(second.LZ.cart.items(), [{ id, size: 250, qty: 2 }]);
  assert.strictEqual(second.LZ.cart.count(), 2);
});
test("corrupt or foreign stored data is handled safely", () => {
  for (const bad of [
    "{bad json",
    '"just a string"',
    "42",
    '{"id":"x"}',
    "null",
    '[null,1,"a",[],{}]',
  ]) {
    const s = makeStore();
    s.setItem(key, bad);
    const { LZ } = load(s);
    eq(LZ.cart.items(), [], "input: " + bad);
    assert.strictEqual(LZ.cart.count(), 0);
  }
});
test("mixed stored data is repaired: unknown products dropped, sizes and quantities fixed, duplicates merged", () => {
  const s = makeStore(),
    { LZ } = load(s),
    id = P(LZ);
  s.setItem(
    key,
    JSON.stringify([
      { id: "ghost", size: 100, qty: 2 },
      { id, size: 999, qty: "7" },
      { id, size: LZ.defaultSize(LZ.products.get(id)), qty: 3 },
      { id: P(LZ, 1), size: 50, qty: -4 },
      { id: P(LZ, 2), size: 100, qty: 9999 },
      { id: 42, qty: 1 },
      null,
    ]),
  );
  const items = LZ.cart.items(),
    def = LZ.defaultSize(LZ.products.get(id));
  assert.strictEqual(items.find((x) => x.id === id).qty, 10);
  assert.strictEqual(items.find((x) => x.id === id).size, def);
  assert.strictEqual(items.find((x) => x.id === P(LZ, 1)).qty, 1);
  assert.strictEqual(
    items.find((x) => x.id === P(LZ, 2)).qty,
    LZ.config.maxQty,
  );
  assert.strictEqual(items.length, 3);
  eq(JSON.parse(s.getItem(key)), items, "clean data was written back");
});
test("prices are never trusted from storage", () => {
  const s = makeStore(),
    { LZ } = load(s),
    id = P(LZ);
  s.setItem(
    key,
    JSON.stringify([{ id, size: 100, qty: 1, price: 0.01, unit: 0.01 }]),
  );
  assert.strictEqual(
    LZ.cart.totals().sub,
    LZ.products.price(LZ.products.get(id), 100),
  );
  assert.ok(!("price" in LZ.cart.items()[0]));
});
test("change event fires on writes, not when merely reading or repairing", () => {
  const s = makeStore(),
    { LZ, events } = load(s),
    id = P(LZ);
  s.setItem(key, "{bad");
  LZ.cart.items();
  LZ.cart.count();
  assert.strictEqual(events.length, 0);
  LZ.cart.add(id, 100, 1);
  eq(events, ["cart:change"]);
  LZ.cart.setQty(id, 100, 2);
  LZ.cart.remove(id, 100);
  assert.strictEqual(events.length, 3);
});
test("blocked localStorage: cart still works in memory and reports it is not persistent", () => {
  const { LZ } = load(makeStore(), { broken: true }),
    id = P(LZ);
  assert.strictEqual(LZ.storage.persistent, false);
  LZ.cart.add(id, 100, 2);
  assert.strictEqual(LZ.cart.count(), 2);
  LZ.cart.remove(id, 100);
  assert.strictEqual(LZ.cart.count(), 0);
});
console.log(
  `\n${passed} tests passed` + (process.exitCode ? " (with failures)" : ""),
);
