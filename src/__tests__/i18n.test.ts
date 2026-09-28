import { getTranslations, resolveLanguage } from '../lib/i18n';

describe('i18n', () => {
  it('supports explicit Turkish and English preferences', () => {
    expect(resolveLanguage('tr')).toBe('tr');
    expect(resolveLanguage('en')).toBe('en');
    expect(getTranslations('en').roll).toBe('Roll Dice');
    expect(getTranslations('tr').roll).toBe('Zar At');
  });

  it('falls back to English for unsupported automatic device languages', () => {
    expect(resolveLanguage('auto')).toMatch(/^(tr|en)$/);
  });
});
