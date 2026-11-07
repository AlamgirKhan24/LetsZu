/* Cart state lives in localStorage as [{id,size,qty}]. Prices are never stored: they are recomputed from product data.
   Demo persistence only: never store payment or personal data here. */
LZ.cart={
 same(a,b){return a.id===b.id&&Number(a.size)===Number(b.size)},
 /* Turns anything into a clean array of valid lines (unknown products dropped, sizes and quantities fixed, duplicates merged). */
 sanitize(raw){
  if(!Array.isArray(raw))return[];
  return raw.reduce((out,i)=>{
   const p=i&&typeof i.id==='string'&&LZ.products.get(i.id);if(!p)return out;
   const size=LZ.products.sizes(p).some(s=>s.g==i.size)?Number(i.size):LZ.defaultSize(p);
   const qty=Math.min(LZ.config.maxQty,Math.max(1,parseInt(i.qty,10)||1));
   const dup=out.find(x=>x.id===p.id&&x.size===size);
   dup?dup.qty=Math.min(LZ.config.maxQty,dup.qty+qty):out.push({id:p.id,size,qty});return out},[])},
 /* Always returns a clean array; repairs bad stored data in place without firing change events. */
 items(){
  const k=LZ.config.keys.cart,raw=LZ.storage.get(k,[]),clean=this.sanitize(raw);
  if(JSON.stringify(raw)!==JSON.stringify(clean))LZ.storage.set(k,clean);
  return clean},
 save(items){LZ.storage.set(LZ.config.keys.cart,items);document.dispatchEvent(new CustomEvent('cart:change'))},
 /* Returns true when the full quantity was added, false when the per-item limit capped it. */
 add(id,size,qty=1){
  const p=LZ.products.get(id);if(!p)return false;
  const s=LZ.products.sizes(p).some(x=>x.g==size)?Number(size):LZ.defaultSize(p),n=Math.max(1,parseInt(qty,10)||1);
  const items=this.items(),f=items.find(x=>x.id===id&&x.size===s),have=f?f.qty:0,next=Math.min(LZ.config.maxQty,have+n);
  f?f.qty=next:items.push({id,size:s,qty:next});this.save(items);return have+n<=LZ.config.maxQty},
 setQty(id,size,q){
  let items=this.items();const t={id,size:Number(size)},f=items.find(x=>this.same(x,t));if(!f)return;
  q=Math.floor(Number(q));if(!(q>=1))items=items.filter(x=>x!==f);else f.qty=Math.min(LZ.config.maxQty,q);this.save(items)},
 remove(id,size){const t={id,size:Number(size)};this.save(this.items().filter(x=>!this.same(x,t)))},
 clear(){this.save([])},
 restore(items){this.save(this.sanitize(items))},      /* used by Undo */
 detailed(){return this.items().map(i=>{const p=LZ.products.get(i.id);return{...i,p,unit:LZ.products.price(p,i.size)}})},
 count(){return this.items().reduce((a,b)=>a+b.qty,0)},
 /* Money is summed in whole cents to avoid floating-point drift. Tax is an estimate for the demo. */
 totals(){
  const c=LZ.config,sub=this.detailed().reduce((a,l)=>a+Math.round(l.unit*100)*l.qty,0),
   ship=sub===0||sub>=Math.round(c.freeShipping*100)?0:Math.round(c.shipping*100),tax=Math.round(sub*c.taxRate);
  return{sub:sub/100,ship:ship/100,tax:tax/100,total:(sub+ship+tax)/100}}};
/* Keep several open tabs in sync */
addEventListener('storage',e=>{if(e.key===LZ.config.keys.cart||e.key===null)document.dispatchEvent(new CustomEvent('cart:change'))});
