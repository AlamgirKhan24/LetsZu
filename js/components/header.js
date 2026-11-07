LZ.header=()=>{
 const r=LZ.root,pg=LZ.page;
 const links=[['Shop','pages/shop.html',['shop','product-details']],['Collections','pages/categories.html',['categories']],['Tea Finder','pages/tea-finder.html',['tea-finder']],['Brewing Guide','pages/brewing-guide.html',['brewing-guide']],['Our Story','pages/our-story.html',['our-story']],['Contact','pages/contact.html',['contact']]];
 const nav=links.map(l=>{const on=l[2].includes(pg);return `<li class="nav-item"><a class="nav-link ${on?'active':''}" href="${r+l[1]}" ${on?'aria-current="page"':''}>${l[0]}</a></li>`}).join('');
 const bn=[['Home','home','index.html','home'],['Shop','shop','pages/shop.html','grid'],['Finder','tea-finder','pages/tea-finder.html','compass'],['Saved','wishlist','pages/wishlist.html','heart']].map(b=>`<a href="${r+b[2]}" class="${pg===b[1]?'active':''}" ${pg===b[1]?'aria-current="page"':''}><i data-lucide="${b[3]}" width="20"></i>${b[0]}</a>`).join('');
 LZ.$('#site-header').innerHTML=`<a class="skip-link" href="#main">Skip to content</a>
 <header class="site-header"><nav class="navbar navbar-expand-lg" aria-label="Main"><div class="container">
  <a class="navbar-brand" href="${r}index.html" aria-label="LetsZu home">LetsZu</a>
  <div class="d-flex align-items-center gap-1 order-lg-3">
   <button class="icon-btn" data-search-open aria-label="Search"><i data-lucide="search"></i></button>
   <a class="icon-btn d-none d-sm-inline-grid" href="${r}pages/wishlist.html" aria-label="Wishlist"><i data-lucide="heart"></i><span class="badge-dot" data-wish-count hidden>0</span></a>
   <button class="icon-btn" data-cart-open aria-label="Open cart"><i data-lucide="shopping-bag"></i><span class="badge-dot" data-cart-count hidden aria-live="polite">0</span></button>
   <a class="icon-btn d-none d-sm-inline-grid" href="${r}pages/login.html" aria-label="Account"><i data-lucide="user"></i></a>
   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle menu"><i data-lucide="menu"></i></button></div>
  <div class="collapse navbar-collapse order-lg-2" id="mainNav"><ul class="navbar-nav me-auto">${nav}</ul></div></div></nav></header>
 <nav class="bottom-nav" aria-label="Quick links">${bn}<button type="button" data-cart-open aria-label="Open cart"><i data-lucide="shopping-bag" width="20"></i>Cart<span class="badge-dot icon-btn" style="position:absolute;top:-2px;right:6px;width:auto;height:auto;min-width:18px;background:var(--gold);color:var(--forest-dark);font-size:.68rem" data-cart-count hidden>0</span></button></nav>`;
 const h=LZ.$('.site-header'),mc=LZ.$('#mainNav'),tg=LZ.$('.navbar-toggler');
 const sync=()=>h.classList.toggle('scrolled',scrollY>24);sync();addEventListener('scroll',sync,{passive:true});
 mc.addEventListener('show.bs.collapse',()=>h.classList.add('menu-open'));mc.addEventListener('hidden.bs.collapse',()=>h.classList.remove('menu-open'));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mc.classList.contains('show')){bootstrap.Collapse.getOrCreateInstance(mc).hide();tg.focus()}})};
