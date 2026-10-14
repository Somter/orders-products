'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAuthPage = pathname === '/login' || pathname === '/register';

        if (!token && !isAuthPage) {
            router.push('/login');
        } else if (token && isAuthPage) {
            router.push('/orders');
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, router]);

    const isAuthPage = pathname === '/login' || pathname === '/register';

    if (!isAuthorized && !isAuthPage) {
        return <div className="d-flex justify-content-center align-items-center vh-100">Загрузка...</div>;
    }

    return <>{children}</>;
}