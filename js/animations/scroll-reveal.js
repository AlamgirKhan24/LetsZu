/* Scroll reveal with IntersectionObserver (no library).
   LZ.reveal(root)            reveal new .reveal elements: in-view ones now, the rest as they scroll in
   LZ.reveal(root,{enter:1})  also animate in-view elements (use for freshly rendered content)
   LZ.reveal(root,{instant:1}) show without animation (re-rendered content, e.g. after filtering)
   Content is never hidden unless this script runs (it adds html.reveal-ready). */
LZ.reveal=(root=document,opts={})=>{
 LZ.$$('main .section-head',root).forEach(e=>e.classList.add('reveal'));
 const els=LZ.$$('.reveal:not([data-r])',root);if(!els.length)return;els.forEach(e=>e.dataset.r=1);
 const show=(e,instant)=>{e.classList.add('in');if(instant)e.dataset.instant=''};
 if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window)){els.forEach(e=>show(e,true));return}
 const seen=new Map();   /* stagger siblings that reveal together, capped at 4 steps */
 els.forEach(e=>{if(e.style.getPropertyValue('--d')!=='')return;const p=e.parentElement,n=seen.get(p)||0;e.style.setProperty('--d',Math.min(n,4));seen.set(p,n+1)});
 document.documentElement.classList.add('reveal-ready');
 if(opts.instant){els.forEach(e=>show(e,true));return}
 LZ.io=LZ.io||new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');LZ.io.unobserve(x.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 els.forEach(e=>{const r=e.getBoundingClientRect();(r.top<innerHeight&&r.bottom>0)?show(e,!opts.enter):LZ.io.observe(e)})};
