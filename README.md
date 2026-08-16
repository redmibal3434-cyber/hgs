# Basit Admin Şifreli Sürüm

Vercel Environment Variables:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD

ADMIN_PASSWORD değerine admin panelinde kullanacağınız şifreyi yazın.

ADMIN_JWT_SECRET isteğe bağlıdır. Tanımlamazsanız sistem ADMIN_PASSWORD üzerinden sunucu tarafında oturum anahtarı oluşturur.

ÖNEMLİ:
Environment Variable ekledikten/değiştirdikten sonra yeni deployment gerekir.
Admin adresi: /admin
