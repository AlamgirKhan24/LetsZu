LZ.wishlist={
 ids(){return LZ.storage.get(LZ.config.keys.wish,[])},
 has(id){return this.ids().includes(id)},
 toggle(id){let l=this.ids();const on=!l.includes(id);l=on?[...l,id]:l.filter(x=>x!==id);LZ.storage.set(LZ.config.keys.wish,l);document.dispatchEvent(new CustomEvent('wish:change'));return on}};
