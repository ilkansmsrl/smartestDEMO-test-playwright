# Test Kurulum ve Yapılandırma Rehberi

Bu rehber, smartestDEMO-test-playwright projesindeki test senaryolarını çalıştırmak için gerekli adımları açıklar.

## 📋 İçindekiler

- [GitHub Secrets Yapılandırması](#github-secrets-yapılandırması)
- [Lokal Test Kurulumu](#lokal-test-kurulumu)
- [Test Senaryoları](#test-senaryoları)
- [CI/CD ile Test Çalıştırma](#cicd-ile-test-çalıştırma)

## 🔐 GitHub Secrets Yapılandırması

Test senaryoları, kimlik bilgilerini GitHub Secrets'tan alır. Bu güvenli bir yöntemdir ve kimlik bilgilerinin kod deposunda saklanmasını önler.

### Gerekli GitHub Secrets

Aşağıdaki secrets'ları GitHub repository'nizde oluşturmanız gerekir:

1. **TEST_EMAIL** veya **TEST_USERNAME**: Login için kullanılacak email veya kullanıcı adı
2. **TEST_PASSWORD**: Login için kullanılacak şifre
3. **BASE_URL** (opsiyonel): Test edilecek sitenin ana URL'i (örn: https://yoursite.com)
4. **LOGIN_URL** (opsiyonel): Login sayfasının URL'i (örn: /login veya tam URL)
5. **DASHBOARD_URL** (opsiyonel): Dashboard sayfasının URL'i (örn: /dashboard veya tam URL)

### GitHub Secrets Nasıl Eklenir?

1. GitHub repository'nizde **Settings** sekmesine gidin
2. Sol menüden **Secrets and variables** > **Actions** seçin
3. **New repository secret** butonuna tıklayın
4. Her bir secret için:
   - **Name**: Secret adını girin (örn: TEST_EMAIL)
   - **Value**: Secret değerini girin (örn: user@example.com)
   - **Add secret** butonuna tıklayın

#### Örnek Secret Yapılandırması:

```
Name: TEST_EMAIL
Value: testuser@yoursite.com

Name: TEST_PASSWORD
Value: YourSecurePassword123!

Name: BASE_URL
Value: https://yoursite.com

Name: LOGIN_URL
Value: https://yoursite.com/login

Name: DASHBOARD_URL
Value: https://yoursite.com/dashboard
```

### Alternatif: TEST_USERNAME Kullanımı

Eğer siteniz email yerine kullanıcı adı kullanıyorsa, `TEST_EMAIL` yerine `TEST_USERNAME` secret'ını kullanabilirsiniz:

```
Name: TEST_USERNAME
Value: testuser
```

## 💻 Lokal Test Kurulumu

### 1. .env Dosyası Oluşturma

Lokal olarak test çalıştırmak için `.env` dosyası oluşturun:

```bash
cp .env.example .env
```

### 2. .env Dosyasını Düzenleme

`.env` dosyasını açın ve kendi test bilgilerinizi girin:

```env
# Base URL for tests
BASE_URL=https://yoursite.com

# Test user credentials
TEST_EMAIL=your-test-user@yoursite.com
TEST_PASSWORD=YourTestPassword123!

# Dashboard specific settings
DASHBOARD_URL=https://yoursite.com/dashboard
LOGIN_URL=https://yoursite.com/login
```

**ÖNEMLİ:** `.env` dosyası `.gitignore`'da olduğu için GitHub'a commit edilmez. Gerçek kimlik bilgilerinizi bu dosyada güvenle saklayabilirsiniz.

### 3. Bağımlılıkları Yükleme

```bash
npm install
```

### 4. Playwright Browser'ları Yükleme

```bash
npx playwright install
```

### 5. Testleri Çalıştırma

```bash
# Tüm testleri çalıştır
npm test

# Sadece auth-flow testlerini çalıştır
npx playwright test tests/auth-flow.spec.ts

# Headed mode (tarayıcı görünür)
npm run test:headed

# UI mode (interaktif)
npm run test:ui

# Belirli bir browser ile
npm run test:chromium
```

## 🧪 Test Senaryoları

### Login Testleri (tests/auth-flow.spec.ts)

1. **should have all login page elements visible**
   - Email input (#email) kontrolü
   - Password input (#password) kontrolü
   - Login butonu (#login-btn) kontrolü

2. **should successfully login with valid credentials from GitHub Secrets**
   - GitHub Secrets'tan kimlik bilgilerini alır
   - Login işlemini gerçekleştirir
   - Dashboard'a yönlendirildiğini doğrular

3. **Element ID Kontrol Testleri**
   - Email input'un doğru id'ye sahip olduğunu kontrol eder
   - Password input'un doğru id'ye sahip olduğunu kontrol eder
   - Login button'un doğru id'ye sahip olduğunu kontrol eder

4. **Form İnteraksiyon Testleri**
   - Email input'a veri girişi testi
   - Password input'a veri girişi testi
   - Login button'a tıklama testi

### Dashboard Navigation Testleri

1. **should display welcome message on dashboard**
   - Welcome message (.welcome-text) görünürlük kontrolü
   - Welcome message içerik kontrolü

2. **should display statistics cards on dashboard**
   - İstatistik kartlarının (.stat-card) varlığı kontrolü
   - En az bir kart olduğunu doğrular

3. **should display sidebar menu on dashboard**
   - Sidebar menünün (#sidebar-menu) görünürlüğü kontrolü
   - Doğru id'ye sahip olduğunu kontrol eder

4. **should display logout button on dashboard**
   - Logout button'un (#logout-btn) görünürlüğü kontrolü
   - Doğru id'ye sahip olduğunu kontrol eder

5. **should have all required dashboard elements visible**
   - Tüm gerekli dashboard elementlerinin birlikte kontrolü

### Logout Testleri

1. **should be able to click logout button**
   - Logout button'a tıklama fonksiyonelliği testi

2. **should redirect to login page after logout**
   - Logout sonrası login sayfasına yönlendirme kontrolü

3. **should clear session after logout**
   - Logout sonrası session'ın temizlendiğini kontrol eder
   - Dashboard'a erişimin engellendiğini doğrular

### Complete Authentication Flow

**should complete full authentication workflow: login -> dashboard -> logout**
   - Tüm authentication akışını test eder:
     1. Login sayfasına git
     2. Kimlik bilgileri ile giriş yap
     3. Dashboard'a yönlendirildiğini doğrula
     4. Dashboard elementlerini kontrol et
     5. Logout yap
     6. Login sayfasına yönlendirildiğini doğrula

## 🚀 CI/CD ile Test Çalıştırma

### GitHub Actions Workflow

Test senaryoları otomatik olarak çalışır:

**Tetikleyiciler:**
- `push` - main, master, develop branch'lerine push
- `pull_request` - main, master, develop branch'lerine PR
- `workflow_dispatch` - Manuel tetikleme (Actions sekmesinden)

### Manuel Test Tetikleme

1. GitHub repository'nizde **Actions** sekmesine gidin
2. Sol menüden **Playwright Tests** workflow'unu seçin
3. **Run workflow** butonuna tıklayın
4. Branch'i seçin ve **Run workflow** ile başlatın

### Test Sonuçlarını Görüntüleme

1. **Actions** sekmesinde workflow run'ınıza tıklayın
2. Her browser için ayrı job göreceksiniz (Chromium, Firefox, WebKit)
3. Job'a tıklayarak detaylı logları görebilirsiniz
4. **Artifacts** bölümünden test raporlarını indirebilirsiniz:
   - `playwright-report-{browser}` - HTML test raporu
   - `test-results-{browser}` - Test sonuçları ve screenshot'lar

## 📊 Test Raporları

### HTML Report Görüntüleme

Lokal olarak test çalıştırdıktan sonra:

```bash
npm run report
```

Bu komut HTML raporunu tarayıcıda açar ve şunları gösterir:
- Test sonuçları (başarılı/başarısız)
- Çalışma süreleri
- Screenshot'lar (hata durumlarında)
- Video kayıtları (hata durumlarında)
- Detaylı hata mesajları

## 🔧 Troubleshooting

### Problem: Testler "element bulunamadı" hatası veriyor

**Çözüm:**
- BASE_URL'in doğru olduğundan emin olun
- Sitenizin erişilebilir olduğunu kontrol edin
- Element selector'larının doğru olduğunu doğrulayın

### Problem: Login başarısız oluyor

**Çözüm:**
- TEST_EMAIL/TEST_USERNAME ve TEST_PASSWORD değerlerinin doğru olduğundan emin olun
- Kimlik bilgilerinin geçerli olduğunu kontrol edin
- Login URL'inin doğru olduğunu doğrulayın

### Problem: GitHub Actions'ta testler çalışmıyor

**Çözüm:**
- GitHub Secrets'ın doğru şekilde eklendiğinden emin olun
- Secret adlarının workflow dosyasındaki ile eşleştiğinden emin olun
- Workflow logs'larını kontrol ederek detaylı hata mesajlarını görün

## 📝 Element Selectors

Test senaryolarında kullanılan element selector'lar:

### Login Sayfası (/login)
- **Email Input**: `#email`
- **Password Input**: `#password`
- **Login Button**: `#login-btn`

### Dashboard (/dashboard)
- **Welcome Message**: `.welcome-text`
- **Statistics Cards**: `.stat-card`
- **Sidebar Menu**: `#sidebar-menu`
- **Logout Button**: `#logout-btn`

## 🔒 Güvenlik Notları

1. **Asla** gerçek kimlik bilgilerini kod deposuna commit etmeyin
2. `.env` dosyasının `.gitignore`'da olduğundan emin olun
3. GitHub Secrets kullanarak CI/CD'de güvenli test çalıştırın
4. Test hesapları için güçlü şifreler kullanın
5. Test hesaplarının production verilerine erişimi olmamasını sağlayın

## 📞 Destek

Sorun yaşarsanız veya sorularınız varsa:
1. GitHub repository'de issue açın
2. Test loglarını ve hata mesajlarını paylaşın
3. Environment değişkenlerinizi (kimlik bilgileri hariç) belirtin

## 🔗 İlgili Dokümantasyon

- [Playwright Dokümantasyonu](https://playwright.dev/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Page Object Model](https://playwright.dev/docs/pom)
