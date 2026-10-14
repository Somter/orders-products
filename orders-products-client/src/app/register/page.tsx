'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';
import { useTranslation } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { t } = useTranslation();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            await api.post('/auth/register', { email, password });

            setSuccess(t('registerPage.success'));

            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.error || t('registerPage.errorErrorDefault') || t('registerPage.errorDefault'));
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
                <h5 className="text-center mb-4 text-muted">{t('registerPage.title')}</h5>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">{t('registerPage.emailLabel')}</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('registerPage.passwordLabel')}</label>
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
                        {isLoading ? t('registerPage.loading') : t('registerPage.submit')}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        {t('registerPage.hasAccount')} <Link href="/login" className="text-success">{t('registerPage.login')}</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}