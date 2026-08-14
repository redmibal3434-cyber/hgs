let amount=null;
const qs=s=>document.querySelector(s);
document.querySelectorAll('[data-amount]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-amount]').forEach(x=>x.classList.remove('selected'));
    btn.classList.add('selected'); amount=btn.dataset.amount;
  });
});
qs('#toPayment').addEventListener('click',()=>{
  const plate=qs('#plate').value.trim().toUpperCase();
  if(!plate){alert('Demo için bir plaka girin.');return}
  if(!amount){alert('Bir yükleme tutarı seçin.');return}
  qs('#summaryPlate').textContent=plate;
  qs('#summaryAmount').textContent=Number(amount).toLocaleString('tr-TR')+' TL';
  show(2);
});
qs('#back').addEventListener('click',()=>show(1));
qs('#pay').addEventListener('click',()=>show(3));
function show(n){
  [1,2,3].forEach(i=>{
    qs('#page'+i).classList.toggle('hidden',i!==n);
    qs('#s'+i).classList.toggle('active',i<=n);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
