/* Icons: small inline set so no icon library is needed. Use <i data-lucide="name" width="20"></i> then call LZ.icons(). */
LZ.ICONS={
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
 'shopping-bag':'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
 user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
 truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
 leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
 'shield-check':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
 coffee:'<path d="M10 2v2M14 2v2M6 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
 eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 'arrow-down':'<path d="M12 5v14M5 12l7 7 7-7"/>',
 'arrow-right':'<path d="M5 12h14M12 5l7 7-7 7"/>',
 home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
 grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>'};
LZ.icons=(root=document)=>LZ.$$('i[data-lucide]',root).forEach(el=>{const p=LZ.ICONS[el.dataset.lucide];if(!p)return;const w=el.getAttribute('width')||22;
 el.outerHTML=`<svg class="icon" width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`});
LZ.card=(p,i=0)=>{
 const H=['shop','wishlist'].includes(LZ.page)?'h2':'h3',g=LZ.defaultSize(p),unit=LZ.products.sizeLabel(p,g),amount=LZ.money(LZ.products.price(p,g)),cat=LZ.products.cat(p.cat).name,
  on=LZ.wishlist.has(p.id),href=`${LZ.url('pages/product-details.html')}?id=${p.id}`,second=(((LZ.images||{}).products||{})[p.id]||[])[1];
 return `<article class="product-card reveal" style="--d:${i%4}">
 ${p.badge?`<span class="p-badge">${p.badge}</span>`:''}
 <button class="icon-btn wish-btn ${on?'on':''}" data-wish="${p.id}" aria-pressed="${on}" aria-label="Save ${p.name} to wishlist"><i data-lucide="heart" width="20"></i></button>
 <div class="thumb"><img loading="lazy" ${LZ.imgAttr(p)} alt="${p.name}, ${cat.toLowerCase()}">${second?`<img class="alt" loading="lazy" ${LZ.imgAttr(p,1)} alt="">`:''}
  <button class="btn quick-btn" data-quick="${p.id}" aria-label="Quick view ${p.name}"><i data-lucide="eye" width="16"></i> Quick view</button></div>
 <div class="info"><div class="cat">${cat}</div><${H}><a href="${href}">${p.name}</a></${H}>
  <p class="notes">${p.notes.slice(0,3).join(' · ')}</p><p class="desc">${p.desc}</p>
  <div class="buy"><div class="price-block"><span class="price">${amount}</span><span class="unit">${unit}</span></div>
  <button class="btn btn-forest add-btn" data-add="${p.id}" aria-label="Add ${p.name}, ${unit}, ${amount} to cart"><span class="ico"><i data-lucide="shopping-bag" width="16"></i></span><span class="lbl">Add</span></button>
  <span class="visually-hidden-live" role="status" aria-live="polite"></span></div></div></article>`};
/* Image loading: a card's skeleton stops as soon as its main image loads (or its fallback does) */
LZ.markLoaded=img=>{const t=img.closest&&img.closest('.thumb');if(t&&!img.classList.contains('alt'))t.classList.add('loaded')};
LZ.renderGrid=(el,list,empty)=>{const again=el.dataset.rendered;el.dataset.rendered=1;el.innerHTML=list.length?list.map((p,i)=>LZ.card(p,i)).join(''):`<div class="empty" style="grid-column:1/-1"><h3>${empty||'Nothing here yet'}</h3></div>`;
 LZ.icons(el);LZ.$$('.thumb img',el).forEach(i=>{if(i.complete&&i.naturalWidth)LZ.markLoaded(i)});LZ.reveal(el,again?{instant:1}:{enter:1})};
/* Add-to-cart button feedback: idle > loading > success | error > idle */
LZ.addState=(btn,state,msg)=>{
 const lbl={idle:'Add',loading:'Adding',success:'Added',error:'Max reached'}[state],ico={idle:'shopping-bag',loading:'shopping-bag',success:'check',error:'x'}[state];
 btn.classList.remove('is-loading','is-success','is-error');if(state!=='idle')btn.classList.add('is-'+state);
 btn.setAttribute('aria-disabled',state==='loading'?'true':'false');btn.toggleAttribute('aria-busy',state==='loading');
 LZ.$('.lbl',btn).textContent=lbl;LZ.$('.ico',btn).innerHTML=`<i data-lucide="${ico}" width="16"></i>`;LZ.icons(btn);
 const live=btn.parentElement.querySelector('[role=status]');if(live)live.textContent=state==='idle'?'':(msg||'')};
LZ.cardAdd=btn=>{
 if(btn.dataset.busy)return;const p=LZ.products.get(btn.dataset.add);if(!p)return;btn.dataset.busy=1;LZ.addState(btn,'loading');
 setTimeout(()=>{ /* short pause so the loading state is perceptible; the cart itself updates instantly */
  const ok=LZ.addToCart(p.id,LZ.defaultSize(p),1,{open:false});
  LZ.addState(btn,ok?'success':'error',ok?`${p.name} added to cart. ${LZ.cart.count()===1?'1 item':LZ.cart.count()+' items'} in your cart.`:`Maximum ${LZ.config.maxQty} per item.`);
  setTimeout(()=>{LZ.addState(btn,'idle');delete btn.dataset.busy},1800)},240)};
document.addEventListener('click',e=>{
 const w=e.target.closest('[data-wish]'),q=e.target.closest('[data-quick]'),a=e.target.closest('[data-add]');
 if(w){const on=LZ.wishlist.toggle(w.dataset.wish);LZ.toast(on?'Saved to wishlist':'Removed from wishlist')}
 if(q)LZ.quickView(q.dataset.quick);
 if(a)LZ.cardAdd(a)});
document.addEventListener('wish:change',()=>{LZ.$$('[data-wish]').forEach(b=>{const on=LZ.wishlist.has(b.dataset.wish);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});LZ.$$('[data-wish-count]').forEach(b=>{const n=LZ.wishlist.ids().length;b.textContent=n;b.hidden=!n})});
/* Image events do not bubble, so one capturing listener on document handles every card */
document.addEventListener('load',e=>{if(e.target.tagName==='IMG')LZ.markLoaded(e.target)},true);
document.addEventListener('error',e=>{const i=e.target;if(!i||i.tagName!=='IMG')return;
 if(i.dataset.fb&&!i.dataset.done){i.dataset.done=1;i.src=i.dataset.fb}else LZ.markLoaded(i)},true);
