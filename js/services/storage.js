/* localStorage with an in-memory fallback (private mode, blocked or full storage).
   LZ.storage.persistent tells the UI whether data will survive a reload. */
LZ.storage=(()=>{
 const mem={};let ok=false;
 try{localStorage.setItem('__lz_probe','1');localStorage.removeItem('__lz_probe');ok=true}catch(e){}
 return{
  get persistent(){return ok},
  get(k,d){
   if(ok){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){/* corrupt JSON: fall through */}}
   return k in mem?mem[k]:d},
  set(k,v){mem[k]=v;if(ok){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){ok=false}}},
  remove(k){delete mem[k];try{localStorage.removeItem(k)}catch(e){}}}})();
