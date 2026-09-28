import { getLocales } from 'expo-localization';
import { createContext, createElement, ReactNode, useContext } from 'react';

export type Language = 'tr' | 'en';
export type LanguagePreference = 'auto' | Language;

const translations = {
  tr: {
    settings: 'Ayarlar',
    close: 'Kapat',
    openSettings: 'Ayarları aç',
    singleDie: 'Tek zar',
    doubleDice: 'Çift zar',
    ready: 'Zar atmaya hazır',
    rolling: 'Zarlar dönüyor…',
    result: 'Sonuç',
    total: 'Toplam',
    rollingLabel: 'Atış sürüyor',
    readyLabel: 'Hazır',
    roll: 'Zar At',
    rollingButton: 'Atılıyor…',
    subtitle: 'Tek veya çift zar seç.',
    pairHelper: 'İki zarın toplamı burada gösterilir',
    recentRolls: 'Son atışlar',
    noHistory: 'Henüz kayıt yok',
    rolls: 'atış',
    average: 'Ort.',
    openHistory: 'Tümünü aç',
    history: 'Atış geçmişi',
    historyClose: 'Geçmişi kapat',
    last20: 'Son 20 atış cihazında saklanır.',
    last5: 'Ücretsiz sürümde son 5 atış.',
    clearHistory: 'Geçmişi temizle',
    noRolls: 'Henüz atış yok.',
    count: 'Atış',
    avg: 'Ortalama',
    criticalStatus: 'Çift altı! Şans senden yana.',
    criticalTitle: '✦ ÇİFT ALTI ✦',
    criticalSubtitle: 'Şans senden yana',
    sound: 'Ses',
    soundHint: 'Atış ve iniş seslerini açıp kapatır.',
    haptics: 'Haptik',
    hapticsHint: 'Atış sırasında titreşimli geri bildirimi açıp kapatır.',
    shake: 'Telefonu sallayarak at',
    shakeHint: 'Telefonu salladığında otomatik olarak zar atar.',
    reducedMotion: 'Azaltılmış hareket',
    reducedMotionHint:
      'Hareket hassasiyeti için animasyonu kısaltır; sonuç yine aynı şekilde hesaplanır.',
    language: 'Dil',
    languageHint: 'Uygulamanın dilini otomatik veya elle seçer.',
    auto: 'Otomatik',
    turkish: 'Türkçe',
    english: 'English',
    theme: 'Tema',
    classic: 'Klasik',
    neon: 'Neon',
    sunset: 'Gün Batımı',
    midnight: 'Gece',
    workshop: 'Zar atölyesi',
    workshopHint: 'Zarlarının rengini, yüzeyini ve malzemesini kişiselleştirir.',
    workshopSubtitle: 'Kendi zarını oluştur, görünüm cihazında saklansın.',
    die1: 'Zar 1',
    die2: 'Zar 2',
    bodyColor: 'Gövde rengi',
    pipColor: 'Pip rengi',
    finish: 'Yüzey',
    material: 'Malzeme',
    ivory: 'Fildişi',
    white: 'Beyaz',
    night: 'Gece',
    mint: 'Mint',
    gold: 'Altın',
    coral: 'Mercan',
    ice: 'Buz',
    matte: 'Mat',
    glossy: 'Parlak',
    neonGlow: 'Neon glow',
    solid: 'Düz',
    wood: 'Ahşap',
    marble: 'Mermer',
    glass: 'Cam',
    feedback: 'Ses ve his profili',
    feedbackHint: 'Atışın ses karakterini ve titreşim gücünü seçer.',
    soundCharacter: 'Ses karakteri',
    cinematic: 'Sinematik',
    minimal: 'Minimal',
    hapticStrength: 'Haptik gücü',
    soft: 'Yumuşak',
    standard: 'Standart',
    strong: 'Güçlü',
    premiumOpen: 'Premium açık',
    premium: 'Zar Premium',
    premiumOpenHint: 'Tüm temalar ve gelişmiş efektler kullanılabilir.',
    premiumHint: 'Neon, gün batımı ve gece temalarının kilidini aç.',
    checking: 'Premium durumu kontrol ediliyor…',
    buyPremium: 'Premium’u Satın Al',
    checkingShort: 'Kontrol ediliyor…',
    restore: 'Satın alımları geri yükle',
    legal:
      'Zar, kumar veya bahis uygulaması değildir; gerçek parayla oynanan bir oyun içermez. Kişisel veri toplamaz.',
    privacyPolicy: 'Gizlilik politikası',
    announcementPair: 'Çift zar sonucu: {a} artı {b}, toplam {total}.',
    announcementSingle: 'Zar sonucu: {total}.',
    premiumLocked: 'premium',
  },
  en: {
    settings: 'Settings',
    close: 'Close',
    openSettings: 'Open settings',
    singleDie: 'Single die',
    doubleDice: 'Two dice',
    ready: 'Ready to roll',
    rolling: 'Dice are rolling…',
    result: 'Result',
    total: 'Total',
    rollingLabel: 'Rolling',
    readyLabel: 'Ready',
    roll: 'Roll Dice',
    rollingButton: 'Rolling…',
    subtitle: 'Choose one or two dice.',
    pairHelper: 'The total of both dice appears here',
    recentRolls: 'Recent rolls',
    noHistory: 'No rolls yet',
    rolls: 'rolls',
    average: 'Avg.',
    openHistory: 'View all',
    history: 'Roll history',
    historyClose: 'Close roll history',
    last20: 'Your last 20 rolls are stored on this device.',
    last5: 'The free version shows your last 5 rolls.',
    clearHistory: 'Clear history',
    noRolls: 'No rolls yet.',
    count: 'Rolls',
    avg: 'Average',
    criticalStatus: 'Double six! Luck is on your side.',
    criticalTitle: '✦ DOUBLE SIX ✦',
    criticalSubtitle: 'Luck is on your side',
    sound: 'Sound',
    soundHint: 'Turns roll and landing sounds on or off.',
    haptics: 'Haptics',
    hapticsHint: 'Turns vibration feedback on or off while rolling.',
    shake: 'Shake to roll',
    shakeHint: 'Automatically rolls the dice when you shake your phone.',
    reducedMotion: 'Reduced motion',
    reducedMotionHint:
      'Shortens animation for motion sensitivity; the result is calculated the same way.',
    language: 'Language',
    languageHint: 'Choose the app language automatically or manually.',
    auto: 'Automatic',
    turkish: 'Türkçe',
    english: 'English',
    theme: 'Theme',
    classic: 'Classic',
    neon: 'Neon',
    sunset: 'Sunset',
    midnight: 'Midnight',
    workshop: 'Dice workshop',
    workshopHint: 'Personalize your dice colors, finish, and material.',
    workshopSubtitle: 'Create your own dice; your look stays on this device.',
    die1: 'Die 1',
    die2: 'Die 2',
    bodyColor: 'Body color',
    pipColor: 'Pip color',
    finish: 'Finish',
    material: 'Material',
    ivory: 'Ivory',
    white: 'White',
    night: 'Night',
    mint: 'Mint',
    gold: 'Gold',
    coral: 'Coral',
    ice: 'Ice',
    matte: 'Matte',
    glossy: 'Glossy',
    neonGlow: 'Neon glow',
    solid: 'Solid',
    wood: 'Wood',
    marble: 'Marble',
    glass: 'Glass',
    feedback: 'Sound and feel',
    feedbackHint: 'Choose the sound character and vibration strength of each roll.',
    soundCharacter: 'Sound character',
    cinematic: 'Cinematic',
    minimal: 'Minimal',
    hapticStrength: 'Haptic strength',
    soft: 'Soft',
    standard: 'Standard',
    strong: 'Strong',
    premiumOpen: 'Premium active',
    premium: 'Dice Premium',
    premiumOpenHint: 'All themes and advanced effects are available.',
    premiumHint: 'Unlock neon, sunset, and midnight themes.',
    checking: 'Checking Premium status…',
    buyPremium: 'Buy Premium',
    checkingShort: 'Checking…',
    restore: 'Restore purchases',
    legal:
      'Dice At is not a gambling or betting app; it contains no real-money play. No personal data is collected.',
    privacyPolicy: 'Privacy policy',
    announcementPair: 'Two dice result: {a} plus {b}, total {total}.',
    announcementSingle: 'Dice result: {total}.',
    premiumLocked: 'premium',
  },
} as const;

export type TranslationKey = keyof typeof translations.tr;
export type Translations = Record<TranslationKey, string>;

export function resolveLanguage(preference: LanguagePreference): Language {
  if (preference !== 'auto') return preference;
  return getLocales()[0]?.languageCode?.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

export function getTranslations(language: Language): Translations {
  return translations[language];
}

interface I18nContextValue {
  language: Language;
  preference: LanguagePreference;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
}
const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  preference,
  children,
}: {
  preference: LanguagePreference;
  children: ReactNode;
}) {
  const language = resolveLanguage(preference);
  const dictionary = getTranslations(language);
  const t = (key: TranslationKey, values?: Record<string, string | number>) => {
    let value = dictionary[key];
    Object.entries(values ?? {}).forEach(([name, replacement]) => {
      value = value.replace(`{${name}}`, String(replacement));
    });
    return value;
  };
  return createElement(I18nContext.Provider, { value: { language, preference, t } }, children);
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
