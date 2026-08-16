const jwt=require('jsonwebtoken');

module.exports=async(req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'Method desteklenmiyor.'});

  try{
    const {password}=req.body||{};
    const configured=process.env.ADMIN_PASSWORD;

    if(!configured){
      return res.status(500).json({error:'Sunucuda ADMIN_PASSWORD tanımlı değil.'});
    }
    if(String(password||'')!==String(configured)){
      return res.status(401).json({error:'Şifre hatalı.'});
    }

    // JWT secret is derived from a server-only secret when a separate one is not configured.
    const secret=process.env.ADMIN_JWT_SECRET || ('admin-session:'+configured);
    const token=jwt.sign({role:'admin'},secret,{expiresIn:'8h'});
    return res.status(200).json({token});
  }catch(e){
    return res.status(500).json({error:'Sunucu bağlantı hatası.'});
  }
};