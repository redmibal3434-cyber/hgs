# Online Adminli Demo

Bu sürüm localStorage kullanmaz. Kayıtlar ve logo URL'leri Supabase'de tutulduğu için aynı domain farklı cihazlardan açıldığında aynı veriler görünür.

## Kurulum
1. Supabase'de yeni proje açın ve `supabase.sql` içeriğini SQL Editor'de çalıştırın.
2. Vercel Project Settings > Environment Variables bölümüne şunları ekleyin:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - ADMIN_JWT_SECRET
   - ADMIN_PASSWORD_HASH
3. ADMIN_PASSWORD_HASH üretmek için bilgisayarınızda:
   `node -e "console.log(require('bcryptjs').hashSync('BURAYA_GUCLU_SIFRENIZ',12))"`
4. Projeyi Vercel'e deploy edin.
5. Müşteri sayfası: `/`
6. Admin paneli: `/admin`

## Özellikler
- HGS Bakiye Yükleme ve KM/Hasar Sorgu akışları
- Referans sonrası kırmızı X / olumsuz sonuç ekranı
- Şifreli admin paneli; şifre hash olarak environment variable'da tutulur
- İşlemler Supabase veritabanında tutulur ve farklı cihazlardan admin panelinde görünür
- Üstte 3 logo URL'si
- Footer'da 3 logo URL'si
- Logo ayarları merkezi veritabanında tutulur, tüm cihazlarda aynı görünür

Not: Bu prototip gerçek ödeme, HGS yükleme, KM veya hasar sorgusu yapmaz.
