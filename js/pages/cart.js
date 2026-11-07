LZ.pages.cart=()=>{
 const lines=LZ.$('#cartLines'),sum=LZ.$('#summary'),status=LZ.$('#cartStatus');lines.setAttribute('data-cart-scope','');
 const draw=()=>{
  const items=LZ.cart.detailed(),t=LZ.cart.totals(),n=LZ.cart.count(),left=Math.max(0,LZ.config.freeShipping-t.sub);
  lines.innerHTML=(items.length?`<div class="d-flex justify-content-between align-items-center mb-2"><h2 class="h5 m-0">${n} item${n>1?'s':''}</h2><button type="button" class="btn btn-link p-0" data-cart-clear>Clear cart</button></div>${LZ.cartListHTML(items)}`
   :`<div class="empty"><h2 class="h4">Your cart is empty</h2><p>Add a tea and it will show up here.</p><a class="btn btn-forest mt-2" href="${LZ.url('pages/shop.html')}">Browse teas</a></div>`);
  sum.innerHTML=`<h2 class="h5">Order summary</h2><dl><dt>Subtotal</dt><dd>${LZ.money(t.sub)}</dd><dt>Shipping</dt><dd>${t.ship?LZ.money(t.ship):'Free'}</dd><dt>Estimated tax</dt><dd>${LZ.money(t.tax)}</dd><dt>Total</dt><dd class="fw-bold">${LZ.money(t.total)}</dd></dl>
  ${items.length?`<p class="small text-muted">${left?`Add ${LZ.money(left)} more for free shipping.`:'You get free shipping.'}</p>`:''}
  <a class="btn btn-gold w-100 ${items.length?'':'disabled'}" href="${LZ.url('pages/checkout.html')}" ${items.length?'':'aria-disabled="true" tabindex="-1"'}>Continue to demo checkout</a>${LZ.demoNote()}`;
  status.textContent=items.length?`Cart updated: ${n} item${n>1?'s':''}, total ${LZ.money(t.total)}.`:'Your cart is empty.';
  LZ.icons()};
 draw();document.addEventListener('cart:change',draw)};
