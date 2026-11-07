/* Checks that every photo in js/data/images.js loads. Run: node tests/check-images.js (needs Node 18+ and internet) */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={LZ:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/data/images.js'),'utf8'),ctx);
const out=[];(function walk(o){for(const v of Object.values(o))typeof v==='string'?out.push(v):v&&typeof v==='object'&&walk(v)})(ctx.LZ.images);
const urls=[...new Set(out)];let bad=0;
(async()=>{for(const u of urls){try{const r=await fetch(u.replace(/w=\d+&h=\d+/,'w=64&h=64'),{method:'GET'});const ok=r.ok&&(r.headers.get('content-type')||'').startsWith('image/');if(!ok)bad++;console.log((ok?'ok  ':'FAIL ')+r.status+' '+u.slice(33,70))}catch(e){bad++;console.log('FAIL '+e.message+' '+u.slice(33,70))}}
console.log(`\n${urls.length-bad}/${urls.length} photos load`);process.exitCode=bad?1:0})();
