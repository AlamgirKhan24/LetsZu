LZ.pages.wishlist=()=>{
 const g=LZ.$('#wishGrid'),draw=()=>{const l=LZ.wishlist.ids().map(LZ.products.get).filter(Boolean);
  LZ.$('#wishCount').textContent=l.length+(l.length===1?' saved tea':' saved teas');
  if(!l.length){g.innerHTML=`<div class="empty" style="grid-column:1/-1"><h3>Your wishlist is empty</h3><p>Tap the heart on any tea to save it here.</p><a class="btn btn-forest" href="${LZ.url('pages/shop.html')}">Browse teas</a></div>`;return}
  LZ.renderGrid(g,l)};
 draw();document.addEventListener('wish:change',draw)};
