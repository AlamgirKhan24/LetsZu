LZ.search={match(p,q){q=(q||'').trim().toLowerCase();return!q||[p.name,p.cat,p.origin,p.notes.join(' '),p.ingredients,p.desc].join(' ').toLowerCase().includes(q)}};
