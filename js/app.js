LZ.catBg=c=>{const u=((LZ.images||{}).categories||{})[c.id];return u?`linear-gradient(180deg,rgba(0,0,0,.05),rgba(14,42,33,.88)),url('${u}') center/cover`:`linear-gradient(150deg,${c.color},#173F32)`};
/* Photo blocks: preload, then fade in via CSS (see photos.css). Failed images simply keep the colour placeholder. */
LZ.photos=()=>LZ.$$('[data-photo]').forEach(el=>{
 const u=((LZ.images||{}).lifestyle||{})[el.dataset.photo];if(!u)return;
 const im=new Image();im.onload=()=>{el.style.setProperty('--photo',`url('${u}')`);
  if(el.dataset.photoMode==='overlay')el.style.setProperty('--photo-ov','linear-gradient(100deg,rgba(11,36,25,.9),rgba(11,36,25,.5))');
  el.classList.add('photo-ready')};im.src=u});
LZ.catReady=()=>LZ.$$('.cat-bg').forEach(el=>{const u=el.dataset.img,done=()=>el.classList.add('ready');if(!u)return done();const im=new Image();im.onload=im.onerror=done;im.src=u});
LZ.init=()=>{
 LZ.header();LZ.footer();LZ.toastRegion();LZ.cartDrawer.init();LZ.searchModal.init();
 document.dispatchEvent(new Event('wish:change'));
 const CH=LZ.page==='home'?'h3':'h2';   /* keeps heading order valid on both pages */
 LZ.$$('[data-render=categories]').forEach(el=>el.innerHTML=LZ.categories.map((c,i)=>`<div class="col-6 col-lg-4 reveal" style="--d:${i%3}"><a class="cat-card" href="${LZ.url('pages/shop.html')}?cat=${c.id}"><span class="cat-bg" data-img="${(LZ.images.categories||{})[c.id]||''}" style="background:${LZ.catBg(c)}"></span><${CH}>${c.name}</${CH}><p>${c.blurb}</p><span class="cat-go">Explore <i data-lucide="arrow-right" width="16"></i></span></a></div>`).join(''));
 LZ.$$('[data-render=faqs]').forEach(el=>{el.innerHTML=LZ.data.faqs.map((f,i)=>`<div class="accordion-item"><h2 class="accordion-header h6"><button class="accordion-button ${i?'collapsed':''}" data-bs-toggle="collapse" data-bs-target="#faq${i}" aria-expanded="${i?'false':'true'}" aria-controls="faq${i}">${f.q}</button></h2><div id="faq${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#faqList"><div class="accordion-body">${f.a}</div></div></div>`).join('')});
 if(LZ.pages[LZ.page])LZ.pages[LZ.page]();
 LZ.photos();LZ.catReady();LZ.icons();LZ.reveal();
};
LZ.init();
