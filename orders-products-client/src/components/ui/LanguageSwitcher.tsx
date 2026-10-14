'use client';

import { useTranslation } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();

    return (
        <div className="btn-group btn-group-sm" role="group">
            <button
                type="button"
                className={`btn ${locale === 'ru' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setLocale('ru')}
            >
                RU
            </button>
            <button
                type="button"
                className={`btn ${locale === 'en' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setLocale('en')}
            >
                EN
            </button>
        </div>
    );
}