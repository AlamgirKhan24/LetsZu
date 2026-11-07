LZ.quickView=id=>{
 const p=LZ.products.get(id);if(!p)return;
 let m=LZ.$('#qvModal');if(m)m.remove();
 m=document.createElement('div');m.id='qvModal';m.className='modal fade';m.tabIndex=-1;m.setAttribute('aria-labelledby','qvTitle');m.setAttribute('aria-modal','true');
 const sizes=LZ.products.sizes(p),cat=LZ.products.cat(p.cat).name;
 m.innerHTML=`<div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content glass"><div class="modal-body p-0"><div class="row g-0">
 <div class="col-md-5"><img ${LZ.imgAttr(p)} class="w-100 h-100" style="object-fit:cover;min-height:260px" alt="${p.name}, ${cat.toLowerCase()}"></div>
 <div class="col-md-7 p-4"><button class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close quick view"></button>
 <span class="eyebrow">${cat} · ${p.origin}</span><h2 class="h3" id="qvTitle">${p.name}</h2>
 <p class="mt-2">${p.desc}</p><div>${p.notes.map(n=>`<span class="note">${n}</span>`).join('')}</div>
 <div class="my-3 d-flex flex-wrap gap-2" id="qvSizes" role="group" aria-label="Size">${sizes.map((s,i)=>`<button class="size-btn ${i===Math.min(1,sizes.length-1)?'active':''}" data-g="${s.g}" aria-pressed="${i===Math.min(1,sizes.length-1)}">${s.label}</button>`).join('')}</div>
 <div class="d-flex align-items-center gap-3 flex-wrap"><span class="price fs-4" id="qvPrice"></span><div class="qty"><button data-d="-1" aria-label="Decrease quantity">−</button><input id="qvQty" value="1" aria-label="Quantity" readonly><button data-d="1" aria-label="Increase quantity">+</button></div></div>
 <div class="d-flex gap-2 mt-3"><button class="btn btn-forest flex-grow-1" id="qvAdd">Add to cart</button><a class="btn btn-ghost" href="${LZ.url('pages/product-details.html')}?id=${p.id}">Details</a></div></div></div></div></div></div>`;
 document.body.append(m);
 let g=LZ.defaultSize(p);const price=()=>LZ.$('#qvPrice',m).textContent=LZ.money(LZ.products.price(p,g));price();
 LZ.$('#qvSizes',m).onclick=e=>{const b=e.target.closest('[data-g]');if(!b)return;g=+b.dataset.g;LZ.$$('#qvSizes .size-btn',m).forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});price()};
 const modal=new bootstrap.Modal(m);
 LZ.$('#qvAdd',m).onclick=()=>{modal.hide();m.addEventListener('hidden.bs.modal',()=>LZ.addToCart(p.id,g,+LZ.$('#qvQty',m)?.value||1),{once:true})};
 m.addEventListener('hidden.bs.modal',()=>m.remove());modal.show()};
