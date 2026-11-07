window.LZ=window.LZ||{};
LZ.config={brand:'LetsZu',currency:'$',freeShipping:40,shipping:4.5,taxRate:0.05,
  sizes:[{g:50,m:.55},{g:100,m:1},{g:250,m:2.2}],
  social:{},   // add real links, e.g. {Instagram:'https://…'}; the footer only shows links you set
  maxQty:20,
  keys:{cart:'lz_cart',wish:'lz_wish'}};
LZ.root=document.body.dataset.root||'';
LZ.page=document.body.dataset.page||'';
LZ.url=p=>LZ.root+p;
LZ.$=(s,r=document)=>r.querySelector(s);
LZ.$$=(s,r=document)=>[...r.querySelectorAll(s)];
LZ.money=n=>LZ.config.currency+Number(n).toFixed(2);
LZ.pages={};
