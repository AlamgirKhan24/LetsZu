/* Forms: native validation with Bootstrap styling, plus accessible error handling.
   Demo only: nothing is sent anywhere and nothing is stored. */
const lzFieldState=f=>f.querySelectorAll('input,select,textarea').forEach(i=>{if(i.willValidate)i.setAttribute('aria-invalid',i.checkValidity()?'false':'true')});
document.addEventListener('submit',e=>{const f=e.target.closest('form.needs-validation');if(!f)return;e.preventDefault();
 const pw=f.querySelector('[name=password]'),cf=f.querySelector('[name=confirm]');
 if(pw&&cf)cf.setCustomValidity(pw.value===cf.value?'':'Passwords do not match');
 f.classList.add('was-validated');lzFieldState(f);
 if(!f.checkValidity()){const bad=f.querySelector(':invalid');if(bad)bad.focus();return}
 f.dispatchEvent(new CustomEvent('form:valid',{bubbles:true}))});
/* Re-check a field as the user fixes it */
document.addEventListener('input',e=>{const f=e.target.closest('form.was-validated');if(!f)return;
 const pw=f.querySelector('[name=password]'),cf=f.querySelector('[name=confirm]');if(pw&&cf)cf.setCustomValidity(pw.value===cf.value?'':'Passwords do not match');lzFieldState(f)});
document.addEventListener('form:valid',e=>{const f=e.target;if(!f.dataset.success)return;
 LZ.toast(f.dataset.success);f.reset();f.classList.remove('was-validated');f.querySelectorAll('[aria-invalid]').forEach(i=>i.removeAttribute('aria-invalid'));
 if(f.dataset.redirect)setTimeout(()=>location.href=LZ.url(f.dataset.redirect),900)});
/* Newsletter: validates the address, then says plainly that this is a demo. */
document.addEventListener('submit',e=>{const f=e.target.closest('[data-newsletter]');if(!f)return;e.preventDefault();
 const i=f.querySelector('input');if(!i.value||!i.checkValidity()){i.classList.add('is-invalid');i.setAttribute('aria-invalid','true');i.focus();LZ.toast('Enter a valid email address');return}
 i.classList.remove('is-invalid');i.removeAttribute('aria-invalid');f.reset();LZ.toast('Thanks! This is a demo: your email was not saved or sent.')});
