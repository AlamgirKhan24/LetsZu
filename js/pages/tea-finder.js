LZ.pages['tea-finder']=()=>{
 const box=LZ.$('#finder'),Q=LZ.finder.questions;let i=0,a={};
 const ask=()=>{const q=Q[i];box.innerHTML=`<div class="progress mb-4"><div class="progress-bar" style="transform:scaleX(${i/Q.length})"></div></div><small class="text-muted">Question ${i+1} of ${Q.length}</small><h2 class="my-3">${q.q}</h2>${q.o.map(o=>`<button class="neo quiz-opt" data-v="${o[1]}">${o[0]}</button>`).join('')}${i?'<button class="btn btn-link" id="back">Back</button>':''}`;
  LZ.$$('.quiz-opt',box).forEach(b=>b.onclick=()=>{a[q.k]=b.dataset.v;i++;i<Q.length?ask():done()});
  const bk=LZ.$('#back');if(bk)bk.onclick=()=>{i--;ask()}};
 const done=()=>{const r=LZ.finder.recommend(a);
  box.innerHTML=`<h2>Your perfect cup</h2><p class="lead-sm">Our top three picks for your taste.</p>`;
  const g=document.createElement('div');g.className='product-grid mt-3';g.style.gridTemplateColumns='1fr';box.append(g);
  LZ.renderGrid(g,r);const b=document.createElement('button');b.className='btn btn-ghost mt-3';b.textContent='Retake the quiz';b.onclick=()=>{i=0;a={};ask()};box.append(b)};
 ask()};
