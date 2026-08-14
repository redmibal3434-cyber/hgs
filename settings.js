const pending={1:null,2:null,3:null};
const msg=document.querySelector('#logoMessage');

function preview(n,src){
  const img=document.querySelector('#logoPreview'+n);
  const none=document.querySelector('#noLogo'+n);
  if(!src){img.classList.add('hidden');img.removeAttribute('src');none.classList.remove('hidden');return;}
  img.src=src;img.classList.remove('hidden');none.classList.add('hidden');
}
['1','2','3'].forEach(n=>{
  const current=localStorage.getItem('hgsSiteLogo'+n);
  if(current){
    preview(n,current);
    if(/^https?:\/\//i.test(current)) document.querySelector('#logoUrl'+n).value=current;
  }
  document.querySelector('#logoFile'+n).addEventListener('change',e=>{
    const f=e.target.files[0]; if(!f)return;
    if(f.size>1024*1024){alert('Demo için her logo en fazla 1 MB olsun.');e.target.value='';return;}
    const r=new FileReader();
    r.onload=()=>{pending[n]=r.result;document.querySelector('#logoUrl'+n).value='';preview(n,pending[n]);};
    r.readAsDataURL(f);
  });
  document.querySelector('#logoUrl'+n).addEventListener('input',e=>{
    pending[n]=null;
    if(e.target.value.trim()) preview(n,e.target.value.trim());
  });
});

document.querySelectorAll('[data-save-logo]').forEach(btn=>btn.onclick=()=>{
  const n=btn.dataset.saveLogo;
  const value=pending[n] || document.querySelector('#logoUrl'+n).value.trim();
  if(!value)return alert('Logo '+n+' için dosya seçin veya görsel bağlantısı girin.');
  localStorage.setItem('hgsSiteLogo'+n,value);preview(n,value);
  msg.textContent='Logo '+n+' kaydedildi.';msg.classList.remove('hidden');setTimeout(()=>msg.classList.add('hidden'),2200);
});
document.querySelectorAll('[data-remove-logo]').forEach(btn=>btn.onclick=()=>{
  const n=btn.dataset.removeLogo;
  localStorage.removeItem('hgsSiteLogo'+n);pending[n]=null;
  document.querySelector('#logoUrl'+n).value='';document.querySelector('#logoFile'+n).value='';preview(n,'');
  msg.textContent='Logo '+n+' kaldırıldı.';msg.classList.remove('hidden');setTimeout(()=>msg.classList.add('hidden'),2200);
});