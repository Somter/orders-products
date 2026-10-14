'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const dictionaries: Record<string, any> = { ru, en };

interface LanguageContextType {
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'ru',
    setLocale: () => { },
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<string>('ru');

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && dictionaries[savedLocale]) {
            setLocaleState(savedLocale);
        }
    }, []);

    const setLocale = (newLocale: string) => {
        if (dictionaries[newLocale]) {
            setLocaleState(newLocale);
            localStorage.setItem('locale', newLocale);
        }
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value = dictionaries[locale];

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => useContext(LanguageContext);