LZ.pages.home=()=>{
 const ids=['masala-chai','sencha-morning','ceremonial-matcha','chamomile-honey'];
 LZ.renderGrid(LZ.$('#featured'),ids.map(LZ.products.get).filter(Boolean));
 /* Hero depth on scroll: image drifts slower, copy eases up and fades. One rAF per frame; skipped for reduced motion. */
 const m=LZ.$('.hero-media'),c=LZ.$('.hero-copy');
 if(m&&!matchMedia('(prefers-reduced-motion:reduce)').matches){let busy=false;
  const tick=()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches){busy=false;return}const y=Math.min(scrollY,innerHeight),p=y/innerHeight;m.style.transform=`translate3d(0,${y*.12}px,0)`;if(c){c.style.opacity=Math.max(0,1-p*1.25).toFixed(3);c.style.transform=`translate3d(0,${-p*36}px,0)`}busy=false};
  addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(tick)}},{passive:true})}};
