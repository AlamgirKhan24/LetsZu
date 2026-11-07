document.addEventListener('click',e=>{const b=e.target.closest('.qty [data-d]');if(!b)return;
 const i=b.closest('.qty').querySelector('input');if(!i)return;i.value=Math.min(20,Math.max(1,(+i.value||1)+(+b.dataset.d)));i.dispatchEvent(new Event('change',{bubbles:true}))});
