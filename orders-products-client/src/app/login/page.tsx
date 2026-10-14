'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { locale, setLocale, t } = useTranslation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            router.push('/orders');
        } catch (err: any) {
            setError(err.response?.data?.error || t('loginPage.errorDefault'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="position-absolute top-0 end-0 p-4">
                <LanguageSwitcher />
            </div>

            <div className="card shadow-sm p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4 text-success fw-bold">INVENTORY</h2>
                <h5 className="text-center mb-4 text-muted">{t('loginPage.title')}</h5>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">{t('loginPage.emailLabel')}</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('loginPage.passwordLabel')}</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100 py-2 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? t('loginPage.loading') : t('loginPage.submit')}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        {t('loginPage.noAccount')} <Link href="/register" className="text-success">{t('loginPage.register')}</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}