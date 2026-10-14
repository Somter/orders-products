'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslation } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function TopMenu() {
    const [time, setTime] = useState<Date | null>(null);
    const [activeSessions, setActiveSessions] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    const { locale, t } = useTranslation();

    useEffect(() => {
        setIsMounted(true);
        setTime(new Date());

        const timer = setInterval(() => setTime(new Date()), 1000);
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');

        socket.on('activeSessions', (count) => {
            setActiveSessions(count);
        });

        return () => {
            clearInterval(timer);
            socket.disconnect();
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Поиск отправлен");
    };

    const dateLocale = locale === 'en' ? enUS : ru;

    return (
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3 flex-wrap gap-3">

            <div className="d-flex align-items-center gap-5 w-50">
                <div className="d-flex align-items-center">
                    <div className="me-3 text-success">
                        <Image src="/logo.svg" alt="Inventory Logo" width={40} height={40} />
                    </div>
                    <span className="fs-4 fw-bold text-success">INVENTORY</span>
                </div>

                <search className="flex-grow-1">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control bg-light border-0 px-3"
                            placeholder={t('header.searchPlaceholder')}
                        />
                    </form>
                </search>
            </div>

            <div className="d-flex align-items-center gap-4">

                {isMounted && time ? (
                    <div className="d-flex flex-column align-items-start">
                        <span className="top-menu__day text-capitalize text-muted small">
                            {format(time, 'EEEE', { locale: dateLocale })}
                        </span>
                        <div className="d-flex align-items-center gap-3">
                            <span className="fw-medium">
                                {format(time, 'dd MMM yyyy', { locale: dateLocale })}
                            </span>
                            <div className="d-flex align-items-center gap-1">
                                <Image src="/watch.svg" alt="Clock" width={18} height={18} />
                                <span className="fw-bold">
                                    {format(time, 'HH:mm')}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '130px', height: '35px' }}></div>
                )}

                <div className="d-flex flex-column align-items-center bg-light p-2 rounded">
                    <span className="text-muted small" style={{ fontSize: '10px' }}>{t('header.tabs')}</span>
                    <span className="fw-bold text-success">{activeSessions}</span>
                </div>

                <LanguageSwitcher />

            </div>
        </header>
    );
}