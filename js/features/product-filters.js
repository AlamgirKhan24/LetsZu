LZ.filters={apply(list,s){return list.filter(p=>(s.cat==='all'||p.cat===s.cat)&&LZ.search.match(p,s.q)&&LZ.products.price(p,LZ.defaultSize(p))<=s.maxPrice&&(s.caf==='any'||p.caf===s.caf))}};
