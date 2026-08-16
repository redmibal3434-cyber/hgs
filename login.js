const bcrypt=require('bcryptjs');const jwt=require('jsonwebtoken');const {json}=require('./_lib');
module.exports=async(req,res)=>{if(req.method!=='POST')return json(res,405,{error:'method'});const {password}=req.body||{};
const ok=await bcrypt.compare(String(password||''),process.env.ADMIN_PASSWORD_HASH||'');if(!ok)return json(res,401,{error:'Şifre hatalı'});
const token=jwt.sign({role:'admin'},process.env.ADMIN_JWT_SECRET,{expiresIn:'8h'});json(res,200,{token})};