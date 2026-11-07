LZ.pages.checkout=()=>{
 const items=LZ.cart.detailed(),t=LZ.cart.totals();
 if(!items.length){LZ.$('#checkoutWrap').innerHTML=`<div class="empty"><h2>Nothing to check out</h2><a class="btn btn-forest mt-3" href="${LZ.url('pages/shop.html')}">Browse teas</a></div>`;return}
 LZ.$('#coItems').innerHTML=items.map(l=>`<div class="d-flex justify-content-between small mb-2"><span>${l.p.name} (${LZ.products.sizeLabel(l.p,l.size)}) × ${l.qty}</span><span>${LZ.money(l.unit*l.qty)}</span></div>`).join('')+`<hr><div class="d-flex justify-content-between small"><span>Shipping</span><span>${t.ship?LZ.money(t.ship):'Free'}</span></div><div class="d-flex justify-content-between small"><span>Estimated tax</span><span>${LZ.money(t.tax)}</span></div><div class="d-flex justify-content-between fw-bold mt-2"><span>Total</span><span>${LZ.money(t.total)}</span></div>`;
 LZ.$('#checkoutForm').addEventListener('form:valid',()=>{
  const id='LZ-'+Date.now().toString(36).toUpperCase();LZ.cart.clear();
  LZ.$('#checkoutWrap').innerHTML=`<div class="success"><h1>Demo checkout complete</h1><p class="lead-sm mx-auto">Reference <strong>${id}</strong>. This is a demo store: no order was placed and nothing was charged.</p><a class="btn btn-forest" href="${LZ.url('pages/shop.html')}">Keep shopping</a></div>`})};
