const {createClient}=require('@supabase/supabase-js');
const jwt=require('jsonwebtoken');
function db(){return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}})}
function auth(req){try{const h=req.headers.authorization||'';const secret=process.env.ADMIN_JWT_SECRET || ('admin-session:'+process.env.ADMIN_PASSWORD);return jwt.verify(h.replace(/^Bearer /,''),secret)}catch(e){return null}}
function json(res,code,data){res.status(code).json(data)}
module.exports={db,auth,json};