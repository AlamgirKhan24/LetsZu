LZ.pages['brewing-guide']=()=>{
 const list=LZ.products.all().filter(p=>p.tea!==false),sel=LZ.$('#brewChips');let cur=list[0],left=0,tm=null;
 sel.innerHTML=list.map(p=>`<button class="chip" data-id="${p.id}">${p.name}</button>`).join('');
 const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
 const show=()=>{clearInterval(tm);tm=null;left=cur.brew.time;
  LZ.$$('.chip',sel).forEach(c=>c.classList.toggle('active',c.dataset.id===cur.id));
  LZ.$('#bTemp').textContent=cur.brew.temp+'°C';LZ.$('#bTime').textContent=fmt(cur.brew.time);LZ.$('#bAmt').textContent=cur.brew.amount;
  LZ.$('#bTimer').textContent=fmt(left);LZ.$('#bStart').textContent='Start timer'};
 sel.onclick=e=>{const b=e.target.closest('[data-id]');if(b){cur=LZ.products.get(b.dataset.id);show()}};
 LZ.$('#bStart').onclick=e=>{
  if(tm){clearInterval(tm);tm=null;e.target.textContent='Resume';return}
  e.target.textContent='Pause';tm=setInterval(()=>{left--;LZ.$('#bTimer').textContent=fmt(Math.max(left,0));if(left<=0){clearInterval(tm);tm=null;LZ.toast('Your tea is ready');e.target.textContent='Start timer';left=cur.brew.time}},1000)};
 LZ.$('#bReset').onclick=show;show()};
