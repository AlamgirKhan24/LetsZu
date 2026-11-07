LZ.lineHTML=l=>{
 const k=`data-id="${l.id}" data-size="${l.size}"`,n=l.p.name,atMax=l.qty>=LZ.config.maxQty;
 return `<li class="cart-line"><a href="${LZ.url('pages/product-details.html')}?id=${l.id}"><img ${LZ.imgAttr(l.p)} alt="${n}"></a>
 <div class="flex-grow-1"><div class="d-flex justify-content-between align-items-start gap-2"><strong>${n}</strong><button type="button" class="icon-btn" style="width:36px;height:36px" data-line-act="rm" ${k} aria-label="Remove ${n} from cart"><i data-lucide="x" width="16"></i></button></div>
 <small class="text-muted">${LZ.products.sizeLabel(l.p,l.size)} · ${LZ.money(l.unit)} each</small>
 <div class="d-flex justify-content-between align-items-center mt-2"><div class="qty" role="group" aria-label="Quantity of ${n}"><button type="button" data-line-act="dec" ${k} aria-label="Decrease quantity of ${n}" ${l.qty<=1?'aria-disabled="true"':''}>−</button><span class="qty-val" aria-live="polite">${l.qty}</span><button type="button" data-line-act="inc" ${k} aria-label="Increase quantity of ${n}" ${atMax?'aria-disabled="true"':''}>+</button></div><strong>${LZ.money(l.unit*l.qty)}</strong></div></div></li>`};
LZ.cartListHTML=items=>`<ul class="cart-list list-unstyled m-0" aria-label="Items in your cart">${items.map(LZ.lineHTML).join('')}</ul>`;
LZ.demoNote=()=>`<p class="demo-note">Demo store: nothing is charged, ordered or shipped.</p>${LZ.storage.persistent?'':'<p class="demo-note warn" role="alert">Your browser is blocking storage, so this cart will be lost when you leave or reload the page.</p>'}`;
LZ.cartDrawer={
 count:null,
 init(){
  this.bd=document.createElement('div');this.bd.className='drawer-backdrop';
  this.el=document.createElement('aside');this.el.className='cart-drawer glass';this.el.setAttribute('role','dialog');this.el.setAttribute('aria-modal','true');this.el.setAttribute('aria-labelledby','drawerTitle');this.el.inert=true;
  this.el.innerHTML=`<header class="d-flex justify-content-between align-items-center"><h2 class="m-0 h4" id="drawerTitle">Your cart</h2><button class="icon-btn" data-cart-close aria-label="Close cart"><i data-lucide="x"></i></button></header><div class="body" id="drawerBody" data-cart-scope></div><footer id="drawerFoot"></footer>`;
  document.body.append(this.bd,this.el);
  this.bd.onclick=()=>this.close();
  this.el.addEventListener('keydown',e=>LZ.trapFocus(this.el,e));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&this.isOpen())this.close()});
  document.addEventListener('click',e=>{if(e.target.closest('[data-cart-open]')){e.preventDefault();this.open()}if(e.target.closest('[data-cart-close]'))this.close()});
  document.addEventListener('cart:change',()=>this.render());this.render()},
 isOpen(){return this.el.classList.contains('open')},
 open(){if(this.isOpen())return;this.opener=document.activeElement;this.el.inert=false;this.el.classList.add('open');this.bd.classList.add('open');document.body.style.overflow='hidden';
  setTimeout(()=>LZ.$('[data-cart-close]',this.el).focus(),60)},
 close(){if(!this.isOpen())return;this.el.classList.remove('open');this.bd.classList.remove('open');this.el.inert=true;document.body.style.overflow='';
  if(this.opener&&this.opener.focus)this.opener.focus()},
 render(){
  const items=LZ.cart.detailed(),t=LZ.cart.totals(),n=LZ.cart.count();
  LZ.$$('[data-cart-open]').forEach(b=>b.setAttribute('aria-label',n?`Open cart, ${n} item${n>1?'s':''}`:'Open cart'));
  LZ.$$('[data-cart-count]').forEach(b=>{b.textContent=n;b.hidden=!n;if(this.count!==null&&this.count!==n){b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}});this.count=n;
  LZ.$('#drawerBody').innerHTML=items.length?LZ.cartListHTML(items):`<div class="empty"><h3>Your cart is empty</h3><p>Add a tea to get started.</p><a class="btn btn-forest mt-2" href="${LZ.url('pages/shop.html')}">Browse teas</a></div>`;
  const left=Math.max(0,LZ.config.freeShipping-t.sub);
  LZ.$('#drawerFoot').innerHTML=items.length?`<div class="progress mb-1" role="progressbar" aria-label="Progress to free shipping" aria-valuenow="${Math.round(Math.min(100,t.sub/LZ.config.freeShipping*100))}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="transform:scaleX(${Math.min(1,t.sub/LZ.config.freeShipping)})"></div></div><small>${left?`Add ${LZ.money(left)} more for free shipping`:'You get free shipping'}</small>
  <div class="d-flex justify-content-between my-2"><span>Subtotal</span><strong>${LZ.money(t.sub)}</strong></div><div class="d-grid gap-2"><a class="btn btn-forest" href="${LZ.url('pages/checkout.html')}">Continue to demo checkout</a><a class="btn btn-ghost" href="${LZ.url('pages/cart.html')}">View cart</a></div>${LZ.demoNote()}`:'';
  LZ.icons(this.el)}};
/* Returns true when added in full. opts.open=false keeps the drawer closed (used by product cards, which show feedback on the button). */
LZ.addToCart=(id,size,qty,opts={})=>{
 if(!LZ.products.get(id)){LZ.toast('Sorry, that item is unavailable');return false}
 const ok=LZ.cart.add(id,size,qty);
 if(opts.open!==false){LZ.toast(ok?'Added to cart':`Maximum ${LZ.config.maxQty} per item`);LZ.cartDrawer.open()}
 return ok};
/* Moves focus somewhere sensible after the cart re-renders (a re-render destroys the focused element) */
LZ.cartFocus=(scope,sel,idx)=>{
 const el=sel&&LZ.$(sel,scope);if(el){el.focus();return}
 const rm=LZ.$$('[data-line-act=rm]',scope),next=rm[Math.min(idx,rm.length-1)]||LZ.$('a.btn',scope);
 if(next){next.focus();return}scope.tabIndex=-1;scope.focus()};
/* One delegated listener for every cart control (drawer and cart page) */
document.addEventListener('click',e=>{
 const clr=e.target.closest('[data-cart-clear]');
 if(clr){const snap=LZ.cart.items();if(!snap.length)return;const scope=clr.closest('[data-cart-scope]');LZ.cart.clear();LZ.cartFocus(scope,null,0);
  LZ.toast('Cart cleared',{action:'Undo',onAction:()=>LZ.cart.restore(snap)});return}
 const b=e.target.closest('[data-line-act]');if(!b)return;
 const {id,size}=b.dataset,a=b.dataset.lineAct,items=LZ.cart.items(),idx=items.findIndex(x=>x.id===id&&x.size===Number(size)),l=items[idx];
 if(!l||b.getAttribute('aria-disabled')==='true'){if(l&&a==='inc')LZ.toast(`Maximum ${LZ.config.maxQty} per item`);return}
 const scope=b.closest('[data-cart-scope]'),sel=`[data-line-act="${a}"][data-id="${id}"][data-size="${size}"]`;
 if(a==='rm'){const name=LZ.products.get(id).name;LZ.cart.remove(id,size);LZ.cartFocus(scope,null,idx);
  LZ.toast(`${name} removed`,{action:'Undo',onAction:()=>LZ.cart.restore(items)});return}
 LZ.cart.setQty(id,size,l.qty+(a==='inc'?1:-1));LZ.cartFocus(scope,sel,idx)});
