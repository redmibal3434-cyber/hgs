const logoFile=document.querySelector('#logoFile');
const logoUrl=document.querySelector('#logoUrl');
const logoPreview=document.querySelector('#logoPreview');
const noLogo=document.querySelector('#noLogo');
const msg=document.querySelector('#logoMessage');
let pendingData=null;

function preview(src){
  if(!src){logoPreview.classList.add('hidden');noLogo.classList.remove('hidden');logoPreview.removeAttribute('src');return;}
  logoPreview.src=src;logoPreview.classList.remove('hidden');noLogo.classList.add('hidden');
}
const current=localStorage.getItem('hgsSiteLogo');
if(current){preview(current); if(/^https?:\/\//i.test(current)) logoUrl.value=current;}

logoFile.addEventListener('change',()=>{
  const f=logoFile.files[0]; if(!f)return;
  if(f.size>1024*1024){alert('Demo için logo en fazla 1 MB olsun.');logoFile.value='';return;}
  const reader=new FileReader();
  reader.onload=()=>{pendingData=reader.result;logoUrl.value='';preview(pendingData);};
  reader.readAsDataURL(f);
});
logoUrl.addEventListener('input',()=>{pendingData=null;if(logoUrl.value.trim())preview(logoUrl.value.trim());});

document.querySelector('#saveLogo').onclick=()=>{
  const value=pendingData || logoUrl.value.trim();
  if(!value)return alert('Bir logo dosyası seçin veya görsel bağlantısı girin.');
  localStorage.setItem('hgsSiteLogo',value);preview(value);
  msg.textContent='Logo ayarı kaydedildi.';msg.classList.remove('hidden');setTimeout(()=>msg.classList.add('hidden'),2500);
};
document.querySelector('#removeLogo').onclick=()=>{
  localStorage.removeItem('hgsSiteLogo');pendingData=null;logoUrl.value='';logoFile.value='';preview('');
  msg.textContent='Logo kaldırıldı.';msg.classList.remove('hidden');setTimeout(()=>msg.classList.add('hidden'),2500);
};