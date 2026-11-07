LZ.sorting={apply(list,k){const l=[...list];const f={low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,name:(a,b)=>a.name.localeCompare(b.name)}[k];return f?l.sort(f):l}};
