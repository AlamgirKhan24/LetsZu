LZ.toastRegion=()=>{let w=LZ.$('.toast-wrap');if(!w){w=document.createElement('div');w.className='toast-wrap';w.setAttribute('role','status');w.setAttribute('aria-live','polite');document.body.append(w)}return w};
/* LZ.toast('Saved') or LZ.toast('Item removed',{action:'Undo',onAction:fn}). Toasts with an action stay longer. */
LZ.toast=(m,o={})=>{const w=LZ.toastRegion(),t=document.createElement('div');t.className='lz-toast';
 const s=document.createElement('span');s.textContent=m;t.append(s);
 const close=()=>{t.classList.add('out');setTimeout(()=>t.remove(),240)};
 if(o.action){const b=document.createElement('button');b.type='button';b.className='toast-action';b.textContent=o.action;b.onclick=()=>{o.onAction&&o.onAction();close()};t.append(b)}
 w.append(t);setTimeout(close,o.action?6000:2600)};
/* Keep Tab focus inside an open dialog */
LZ.trapFocus=(el,e)=>{if(e.key!=='Tab')return;const f=LZ.$$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',el).filter(x=>x.offsetParent!==null);
 if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}};
