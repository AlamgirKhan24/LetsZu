/* Product gallery without a library: main image + thumbnail buttons */
LZ.gallery=(el,p)=>{
 const own=((LZ.images||{}).products||{})[p.id]||[],n=own.length||3,srcs=[...Array(n).keys()].map(v=>LZ.imgAttr(p,v));
 el.innerHTML=`<div class="gallery-main">${srcs.map((s,i)=>`<img ${s} class="${i?'':'on'}" ${i?'loading="lazy"':''} alt="${p.name}, photo ${i+1} of ${n}">`).join('')}</div>
 ${n>1?`<div class="thumbs" role="group" aria-label="Product photos">${srcs.map((s,i)=>`<button type="button" class="${i?'':'on'}" data-i="${i}" aria-label="Show photo ${i+1}" aria-pressed="${!i}"><img ${s} alt="" loading="lazy"></button>`).join('')}</div>`:''}`;
 const imgs=LZ.$$('.gallery-main img',el),th=LZ.$$('.thumbs button',el);
 th.forEach(t=>t.onclick=()=>{const i=+t.dataset.i;imgs.forEach((m,k)=>m.classList.toggle('on',k===i));th.forEach((b,k)=>{b.classList.toggle('on',k===i);b.setAttribute('aria-pressed',k===i)})})};
