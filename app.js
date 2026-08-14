let amount=null;const q=s=>document.querySelector(s);
document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-a]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');amount=b.dataset.a});
q('#next').onclick=()=>{if(!q('#plate').value.trim())return alert('Plaka girin.');if(!amount)return alert('Tutar seçin.');show(2)};
q('#back').onclick=()=>show(1);
q('#ref').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,18);
q('#code').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,3);
q('#valid').oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);e.target.value=v};
q('#submit').onclick=()=>{let plate=q('#plate').value.trim().toUpperCase(),ref=q('#ref').value,valid=q('#valid').value,code=q('#code').value;
if(!/^\d{18}$/.test(ref))return alert('Referans numarası 18 haneli olmalı.');
if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(valid))return alert('Geçerlilik AA/YY formatında olmalı.');
if(!/^\d{3}$/.test(code))return alert('İşlem kodu 3 haneli olmalı.');
let rows=JSON.parse(localStorage.getItem('hgsDemoRows')||'[]');
rows.unshift({id:'DM-'+Date.now().toString().slice(-8),plate,amount:Number(amount),ref,valid,code,date:new Date().toLocaleString('tr-TR'),status:'Demo / Ödeme alınmadı'});
localStorage.setItem('hgsDemoRows',JSON.stringify(rows));show(3)};
function show(n){[1,2,3].forEach(i=>q('#step'+i).classList.toggle('hidden',i!==n));window.scrollTo({top:0,behavior:'smooth'})}