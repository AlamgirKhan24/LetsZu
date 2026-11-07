LZ.pages['product-details']=()=>{
 const p=LZ.products.get(new URLSearchParams(location.search).get('id')),root=LZ.$('#detail');
 if(!p){root.innerHTML=`<div class="empty"><h2>We could not find that product</h2><a class="btn btn-forest mt-3" href="${LZ.url('pages/shop.html')}">Back to shop</a></div>`;return}
 document.title=p.name+' | LetsZu';
 {const t=`${p.name} | LetsZu`,d=`${p.name}: ${p.desc} ${p.origin}. Loose leaf tea from LetsZu.`.replace(/\.\.+/g,'.');
  [['meta[name=description]',d],['meta[property="og:title"]',t],['meta[property="og:description"]',d],['meta[name="twitter:title"]',t],['meta[name="twitter:description"]',d]].forEach(([q,v])=>{const m=document.querySelector(q);if(m)m.content=v})}
 const sizes=LZ.products.sizes(p),cat=LZ.products.cat(p.cat);let g=LZ.defaultSize(p),qty=1;
 root.innerHTML=`<div class="row g-4 g-lg-5"><div class="col-md-6" id="gal"></div><div class="col-md-6">
 <nav class="small mb-3" aria-label="Breadcrumb"><a href="${LZ.url('pages/shop.html')}">Shop</a> / <a href="${LZ.url('pages/shop.html')}?cat=${p.cat}">${cat.name}</a></nav>
 <span class="eyebrow">${p.origin}</span><h1 class="h2 display">${p.name}</h1>
 <p class="mt-2">${p.desc}</p><div class="mb-3">${p.notes.map(n=>`<span class="note">${n}</span>`).join('')}</div>
 <div class="fs-3 price mb-3" id="dPrice"></div>
 <div class="mb-3"><div class="fw-semibold mb-2" id="sizeLbl">${p.tea===false?'Option':'Size'}</div><div class="d-flex flex-wrap gap-2" id="dSizes" role="group" aria-labelledby="sizeLbl">${sizes.map(s=>`<button class="size-btn ${s.g===g?'active':''}" data-g="${s.g}" aria-pressed="${s.g===g}">${s.label}</button>`).join('')}</div></div>
 <div class="d-flex flex-wrap align-items-center gap-3 mb-4"><div class="qty"><button data-d="-1" aria-label="Decrease quantity">−</button><input id="dQty" value="1" aria-label="Quantity" readonly><button data-d="1" aria-label="Increase quantity">+</button></div>
 <button class="btn btn-forest btn-lg" id="dAdd">Add to cart</button><button class="icon-btn" style="border:1px solid var(--line)" data-wish="${p.id}" aria-pressed="false" aria-label="Save ${p.name} to wishlist"><i data-lucide="heart"></i></button></div>
 <ul class="nav nav-tabs" role="tablist"><li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#t1" role="tab">Details</button></li>${p.tea===false?'':'<li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#t2" role="tab">Brewing</button></li>'}</ul>
 <div class="tab-content pt-3"><div class="tab-pane fade show active" id="t1" role="tabpanel"><p><strong>Ingredients:</strong> ${p.ingredients}</p><p><strong>Origin:</strong> ${p.origin}</p><p><strong>Caffeine:</strong> ${p.caf}</p></div>
 ${p.tea===false?'':`<div class="tab-pane fade" id="t2" role="tabpanel"><p><strong>Water:</strong> ${p.brew.temp}°C</p><p><strong>Steep:</strong> ${Math.round(p.brew.time/60*10)/10} min</p><p><strong>Amount:</strong> ${p.brew.amount}</p><a href="${LZ.url('pages/brewing-guide.html')}">Open the brewing guide with timer</a></div>`}</div></div></div>
 <div class="sticky-add glass"><div class="flex-grow-1"><strong>${p.name}</strong><div class="price" id="sPrice"></div></div><button class="btn btn-forest" id="sAdd">Add to cart</button></div>
 <h2 class="mt-5 mb-4">You may also like</h2><div class="product-grid" id="related"></div>`;
 LZ.gallery(LZ.$('#gal'),p);
 const price=()=>{LZ.$('#dPrice').textContent=LZ.money(LZ.products.price(p,g));LZ.$('#sPrice').textContent=LZ.money(LZ.products.price(p,g)*qty)};price();
 LZ.$('#dSizes').onclick=e=>{const b=e.target.closest('[data-g]');if(!b)return;g=+b.dataset.g;LZ.$$('#dSizes .size-btn').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});price()};
 LZ.$('#dQty').onchange=e=>{qty=+e.target.value;price()};
 const add=()=>LZ.addToCart(p.id,g,qty);LZ.$('#dAdd').onclick=add;LZ.$('#sAdd').onclick=add;
 LZ.renderGrid(LZ.$('#related'),LZ.products.related(p));LZ.icons(root);
 document.dispatchEvent(new Event('wish:change'))};
