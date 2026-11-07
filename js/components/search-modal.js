LZ.searchModal={
 init(){
  const o=this.el=document.createElement('div');o.className='search-overlay';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','Search teas');o.inert=true;
  o.innerHTML=`<div class="search-box glass"><div class="d-flex gap-2"><input id="sInput" class="form-control form-control-lg" type="search" placeholder="Search teas, origins, flavours" aria-label="Search teas" autocomplete="off"><button class="icon-btn" data-search-close aria-label="Close search"><i data-lucide="x"></i></button></div><div id="sRes" class="mt-3" aria-live="polite"></div></div>`;
  document.body.append(o);
  o.addEventListener('click',e=>{if(e.target===o||e.target.closest('[data-search-close]'))this.close()});
  o.addEventListener('keydown',e=>LZ.trapFocus(o,e));
  document.addEventListener('click',e=>{if(e.target.closest('[data-search-open]'))this.open()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&this.isOpen())this.close();if(e.key==='/'&&!this.isOpen()&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();this.open()}});
  LZ.$('#sInput').addEventListener('input',e=>this.run(e.target.value))},
 isOpen(){return this.el.classList.contains('open')},
 open(){this.opener=document.activeElement;this.el.inert=false;this.el.classList.add('open');setTimeout(()=>LZ.$('#sInput').focus(),60);this.run(LZ.$('#sInput').value);LZ.icons(this.el)},
 close(){this.el.classList.remove('open');this.el.inert=true;if(this.opener&&this.opener.focus)this.opener.focus()},
 run(q){const l=LZ.products.all().filter(p=>LZ.search.match(p,q)).slice(0,6);
  LZ.$('#sRes').innerHTML=l.length?l.map(p=>`<a class="d-flex align-items-center gap-3 p-2 rounded" href="${LZ.url('pages/product-details.html')}?id=${p.id}"><img ${LZ.imgAttr(p)} width="48" height="60" class="rounded" style="object-fit:cover" alt=""><span><strong>${p.name}</strong><br><small class="text-muted">${LZ.products.cat(p.cat).name} · ${LZ.money(LZ.products.price(p,LZ.defaultSize(p)))}</small></span></a>`).join(''):'<p class="text-muted m-0">No teas match. Try "chai" or "mint".</p>'}};
