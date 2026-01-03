# smartestDEMO-test-playwright

Smartest test ortamının test edilmesi için Playwright tabanlı end-to-end (e2e) test projesidir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Proje Yapısı](#proje-yapısı)
- [Test Çalıştırma](#test-çalıştırma)
- [Konfigürasyon](#konfigürasyon)
- [Page Object Model](#page-object-model)
- [CI/CD](#cicd)
- [Raporlama](#raporlama)
- [En İyi Pratikler](#en-iyi-pratikler)

## ✨ Özellikler

- ✅ **Playwright** - Modern web uygulamaları için güçlü test framework'ü
- ✅ **TypeScript** - Tip güvenli kod yazımı
- ✅ **Page Object Model (POM)** - Sürdürülebilir test mimarisi
- ✅ **Cross-browser Testing** - Chromium, Firefox ve WebKit desteği
- ✅ **CI/CD Integration** - GitHub Actions ile otomatik test çalıştırma
- ✅ **HTML Reporting** - Detaylı test raporları
- ✅ **Retry Mechanism** - Başarısız testler için otomatik tekrar deneme
- ✅ **Screenshot & Video** - Hata durumlarında otomatik kayıt

## 🔧 Gereksinimler

- **Node.js** 18.x veya üzeri
- **npm** 9.x veya üzeri

## 📦 Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/ilkansmsrl/smartestDEMO-test-playwright.git
cd smartestDEMO-test-playwright
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Playwright browserları yükleyin

```bash
npx playwright install
```

veya bağımlılıklarla birlikte:

```bash
npx playwright install --with-deps
```

### 4. Environment variables'ları ayarlayın (opsiyonel)

```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

## 📁 Proje Yapısı

```
smartestDEMO-test-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── tests/
│   ├── example.spec.ts             # Örnek test senaryoları
│   └── login.spec.ts               # Login test senaryoları
├── pages/
│   ├── basePage.ts                 # Base page class (ortak metodlar)
│   └── loginPage.ts                # Login page object
├── fixtures/
│   └── testFixtures.ts             # Test fixtures
├── utils/
│   └── helpers.ts                  # Yardımcı fonksiyonlar
├── playwright.config.ts            # Playwright konfigürasyonu
├── tsconfig.json                   # TypeScript konfigürasyonu
├── package.json                    # Node.js dependencies
├── .gitignore                      # Git ignore kuralları
├── .env.example                    # Örnek environment variables
└── README.md                       # Proje dokümantasyonu
```

### Klasör Açıklamaları

- **tests/**: Test dosyalarının bulunduğu klasör. Her test dosyası `.spec.ts` uzantısıyla biter.
- **pages/**: Page Object Model pattern'ine göre sayfa sınıflarının bulunduğu klasör.
- **fixtures/**: Test fixture'larının tanımlandığı klasör. Tekrar kullanılabilir test setup'ları içerir.
- **utils/**: Yardımcı fonksiyonlar ve utility metodları.

## 🚀 Test Çalıştırma

### Tüm testleri çalıştırma

```bash
npm test
```

### Headed mode (tarayıcı görünür)

```bash
npm run test:headed
```

### UI mode (interaktif test çalıştırma)

```bash
npm run test:ui
```

### Debug mode

```bash
npm run test:debug
```

### Belirli bir browser'da çalıştırma

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Belirli bir test dosyasını çalıştırma

```bash
npx playwright test tests/example.spec.ts
```

### Belirli bir testi çalıştırma

```bash
npx playwright test -g "should have correct title"
```

## ⚙️ Konfigürasyon

### playwright.config.ts

Ana konfigürasyon dosyası. Aşağıdaki ayarları içerir:

- **testDir**: Test dosyalarının bulunduğu klasör
- **fullyParallel**: Testlerin paralel çalışması
- **retries**: CI'da başarısız testlerin tekrar deneme sayısı
- **workers**: Paralel çalışacak worker sayısı
- **reporter**: Test raporlama formatı (HTML, list, JSON)
- **use**: Ortak test ayarları (baseURL, timeout, screenshot, video)
- **projects**: Browser konfigürasyonları (Chromium, Firefox, WebKit)

### Environment Variables

`.env.example` dosyasını `.env` olarak kopyalayıp aşağıdaki değişkenleri ayarlayabilirsiniz:

```env
BASE_URL=https://example.com
TEST_USERNAME=testuser
TEST_PASSWORD=testpassword
TEST_ENV=staging
ACTION_TIMEOUT=10000
NAVIGATION_TIMEOUT=30000
```

## 🎭 Page Object Model

### BasePage

Tüm page object'lerin miras aldığı temel sınıf. Ortak metodları içerir:

- `goto()` - Sayfaya git
- `getTitle()` - Sayfa başlığını al
- `click()` - Elemente tıkla
- `fill()` - Input alanını doldur
- `isVisible()` - Element görünür mü kontrol et
- `waitForElement()` - Element görünene kadar bekle

### Örnek Kullanım

```typescript
import { LoginPage } from '../pages/loginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('username', 'password');
});
```

## 🔄 CI/CD

### GitHub Actions

Proje, GitHub Actions ile otomatik test çalıştırma özelliğine sahiptir.

**Tetikleyiciler:**
- `push` - main, master, develop branch'lerine push
- `pull_request` - main, master, develop branch'lerine PR
- `workflow_dispatch` - Manuel tetikleme

**İşlemler:**
1. Repository checkout
2. Node.js kurulumu
3. Bağımlılıkların yüklenmesi
4. Playwright browser'ların yüklenmesi
5. Testlerin çalıştırılması (her browser için ayrı)
6. Test raporlarının artifact olarak yüklenmesi

**Matris Stratejisi:**
- Node.js 18.x
- Browsers: Chromium, Firefox, WebKit
- Her browser için ayrı job çalışır

### Test Raporları

Test sonuçları GitHub Actions artifact'leri olarak saklanır:
- `playwright-report-{browser}` - Her browser için HTML rapor
- `test-results-{browser}` - Her browser için test sonuçları
- 30 gün boyunca saklanır

## 📊 Raporlama

### HTML Report

Testler çalıştıktan sonra HTML raporu görüntülemek için:

```bash
npm run report
```

Bu komut otomatik olarak tarayıcıda HTML raporunu açar.

### Report İçeriği

- ✅ Test sonuçları (başarılı/başarısız)
- ⏱️ Çalışma süreleri
- 📸 Screenshot'lar (hata durumlarında)
- 🎥 Video kayıtları (hata durumlarında)
- 📝 Detaylı hata mesajları
- 🔍 Test adımları

## 📚 En İyi Pratikler

### 1. Test Organizasyonu

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Her testten önce çalışacak setup
  });

  test('should do something', async ({ page }) => {
    // Test kodu
  });
});
```

### 2. Page Object Pattern

```typescript
// pages/myPage.ts
export class MyPage extends BasePage {
  private readonly selector = '#my-element';
  
  async clickElement() {
    await this.click(this.selector);
  }
}
```

### 3. Assertion'lar

```typescript
// Playwright'ın güçlü assertion'larını kullanın
await expect(page).toHaveTitle(/Expected Title/);
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Expected Text');
```

### 4. Selector'lar

```typescript
// User-facing selector'ları tercih edin
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Username')
page.getByPlaceholder('Enter text')
page.getByText('Welcome')
```

### 5. Test Fixture'ları

```typescript
// Tekrar kullanılabilir setup için fixture'lar oluşturun
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

## 🛠️ Geliştirme

### Test Yazma

1. `tests/` klasöründe yeni bir `.spec.ts` dosyası oluşturun
2. Page object pattern kullanarak sayfa sınıfları oluşturun
3. Test senaryolarını yazın
4. Testleri çalıştırın ve doğrulayın

### Debug

```bash
# Debug mode ile çalıştırma
npm run test:debug

# Playwright Inspector açılır ve adım adım debug yapabilirsiniz
```

### Code Generation

Playwright'ın codegen özelliği ile otomatik test kodu üretebilirsiniz:

```bash
npm run codegen
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje ISC lisansı altındadır.

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

## 🔗 Yararlı Linkler

- [Playwright Dokümantasyonu](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/)
- [GitHub Actions Dokümantasyonu](https://docs.github.com/en/actions)
