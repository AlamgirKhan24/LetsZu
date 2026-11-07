LZ.products={
 all(){return LZ.data.products},
 get(id){return LZ.data.products.find(p=>p.id===id)},
 cat(id){return LZ.categories.find(c=>c.id===id)},
 sizes(p){return p.tea===false?[{g:0,m:1,label:'Standard'}]:LZ.config.sizes.map(s=>({...s,label:s.g+' g'}))},
 price(p,g){const l=this.sizes(p);const s=l.find(x=>x.g==g)||l[Math.min(1,l.length-1)];return +(p.price*s.m).toFixed(2)},
 sizeLabel(p,g){return p.tea===false?'Standard':g+' g'},
 related(p,n=4){const o=this.all().filter(x=>x.id!==p.id);return o.filter(x=>x.cat===p.cat).concat(o.filter(x=>x.cat!==p.cat)).slice(0,n)},
 svg(p,v=0){
  const c=this.cat(p.cat).color;
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c}'/><stop offset='1' stop-color='#173F32'/></linearGradient></defs><rect width='400' height='400' fill='url(#g)'/><circle cx='${70+v*130}' cy='${80+v*50}' r='80' fill='#fff' opacity='.08'/><g transform='translate(200 220) rotate(${(v-1)*5})'><ellipse cy='64' rx='100' ry='14' fill='#000' opacity='.2'/><path d='M-80 -20h160v50a80 70 0 0 1 -160 0z' fill='#F7F2E8'/><path d='M80 -5h22a28 28 0 0 1 0 56h-26' fill='none' stroke='#F7F2E8' stroke-width='10'/><ellipse cy='-20' rx='80' ry='14' fill='${c}'/><path d='M-20 -58q-14 -22 0 -40M18 -58q-14 -22 0 -40' stroke='#fff' stroke-opacity='.6' stroke-width='5' fill='none' stroke-linecap='round'/></g></svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg)},
 img(p,v=0){const l=((LZ.images||{}).products||{})[p.id]||[];return l[v]||l[0]||this.svg(p,v)}
};
LZ.defaultSize=p=>{const s=LZ.products.sizes(p);return s[Math.min(1,s.length-1)].g};
LZ.imgAttr=(p,v=0)=>`src="${LZ.products.img(p,v)}" data-fb="${LZ.products.svg(p,v)}"`;
