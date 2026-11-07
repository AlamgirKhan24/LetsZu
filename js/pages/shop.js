LZ.pages.shop=()=>{
 const prices=LZ.products.all().map(p=>LZ.products.price(p,LZ.defaultSize(p))),CEIL=Math.ceil(Math.max(...prices)/5)*5,FLOOR=Math.floor(Math.min(...prices)/5)*5,pr=LZ.$('#fPrice');
 pr.min=FLOOR;pr.max=CEIL;pr.value=CEIL;LZ.$('#fPriceVal').textContent=LZ.money(CEIL);
 const qs=new URLSearchParams(location.search);
 const s={cat:LZ.categories.some(c=>c.id===qs.get('cat'))?qs.get('cat'):'all',q:qs.get('q')||'',sort:'featured',maxPrice:CEIL,caf:'any'};
 const grid=LZ.$('#productGrid'),chips=LZ.$('#chips');
 LZ.$('#search').value=s.q;
 chips.innerHTML=[{id:'all',name:'All teas'},...LZ.categories].map(c=>`<button class="chip" data-cat="${c.id}">${c.name}</button>`).join('');
 const run=()=>{
  LZ.$$('.chip',chips).forEach(c=>c.classList.toggle('active',c.dataset.cat===s.cat));
  const l=LZ.sorting.apply(LZ.filters.apply(LZ.products.all(),s),s.sort);
  LZ.renderGrid(grid,l,'No teas match your filters');const act=(s.maxPrice<CEIL)+(s.caf!=='any');LZ.$('#filterBtn').textContent=act?`Filters (${act})`:'Filters';LZ.$('#count').textContent=l.length+(l.length===1?' product':' products')};
 chips.onclick=e=>{const b=e.target.closest('[data-cat]');if(b){s.cat=b.dataset.cat;run()}};
 LZ.$('#search').oninput=e=>{s.q=e.target.value;run()};
 LZ.$('#sort').onchange=e=>{s.sort=e.target.value;run()};
 LZ.$('#fPrice').oninput=e=>{s.maxPrice=+e.target.value;LZ.$('#fPriceVal').textContent=LZ.money(s.maxPrice);run()};
 LZ.$('#fCaf').onchange=e=>{s.caf=e.target.value;run()};
 LZ.$('#fReset').onclick=()=>{Object.assign(s,{cat:'all',q:'',maxPrice:CEIL,caf:'any'});LZ.$('#search').value='';pr.value=CEIL;LZ.$('#fPriceVal').textContent=LZ.money(CEIL);LZ.$('#fCaf').value='any';run()};
 run()};
