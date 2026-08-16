const q=s=>document.querySelector(s);let token=sessionStorage.getItem('adminToken')||'';const keys=['top1','top2','top3','foot1','foot2','foot3','reference_notice','home_title','hgs_title','hgs_desc','km_title','km_desc','ref_title','ref_label','code_label','error_title','error_desc'];
function editors(){q('#topEditors').innerHTML=[1,2,3].map(n=>box('top'+n,'Üst Logo '+n)).join('');q('#footEditors').innerHTML=[1,2,3].map(n=>box('foot'+n,'Footer Logo '+n)).join('')}
function box(k,t){return `<div class="logoedit"><b>${t}</b><img id="p-${k}"><label>Görsel URL</label><input id="${k}" placeholder="https://..."></div>`}
async function login(){
 const btn=q('#loginBtn'); btn.disabled=true; btn.textContent='Kontrol ediliyor...';
 try{
  const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:q('#password').value})});
  let x={}; try{x=await r.json()}catch(_){}
  if(!r.ok){alert(x.error||('Giriş başarısız. HTTP '+r.status));return}
  token=x.token;sessionStorage.setItem('adminToken',token);await open();
 }catch(e){alert('Sunucu bağlantı hatası. Deployment ve Environment Variables ayarlarını kontrol edin.')}
 finally{btn.disabled=false;btn.textContent='Giriş Yap'}
}
async function open(){if(!token)return;editors();q('#login').classList.add('hide');q('#dash').classList.remove('hide');let s=await (await fetch('/api/settings')).json();keys.forEach(k=>{const el=q('#'+k);if(el)el.value=s[k]||'';const preview=q('#p-'+k);if(preview)preview.src=s[k]||''});let r=await fetch('/api/transactions',{headers:{authorization:'Bearer '+token}});if(r.status===401)return logout();let a=await r.json();q('#tbody').innerHTML=a.map(x=>`<tr><td>${new Date(x.created_at).toLocaleString('tr-TR')}</td><td>${x.service}</td><td>${x.plate}</td><td>${x.amount?Number(x.amount).toLocaleString('tr-TR')+' TL':'—'}</td><td>${x.reference}</td><td>${x.validity}</td><td>${x.code}</td><td>${x.status}</td></tr>`).join('')}
async function save(){let body={};keys.forEach(k=>body[k]=q('#'+k).value.trim());let r=await fetch('/api/settings',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify(body)});if(!r.ok)return alert('Kaydedilemedi');alert('Logo ayarları kaydedildi.')}
function logout(){sessionStorage.removeItem('adminToken');location.reload()}q('#loginBtn').onclick=login;q('#logout').onclick=logout;q('#saveSettings').onclick=save;if(token)open();