'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/context/LanguageContext';

import styles from './NavigationMenu.module.css';

export default function NavigationMenu() {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();

    const menuItems = [
        { path: '/orders', labelKey: 'nav.orders' },
        { path: '/groups', labelKey: 'nav.groups' },
        { path: '/products', labelKey: 'nav.products' },
        { path: '/users', labelKey: 'nav.users' },
        { path: '/settings', labelKey: 'nav.settings' },
        { path: '/analytics', labelKey: 'nav.analytics' },
    ];

    const handleLogout = (): void => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <aside className={`${styles['navigation-menu']} d-flex flex-column align-items-center bg-white shadow-sm vh-100 pt-5`}>
            <nav className="w-100 mt-3 flex-grow-1">
                <ul className={styles['navigation-menu__list']}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;

                        const linkClass = isActive
                            ? `${styles['navigation-menu__link']} ${styles['navigation-menu__link--active']}`
                            : styles['navigation-menu__link'];

                        return (
                            <li key={item.path} className={styles['navigation-menu__item']}>
                                <Link href={item.path} className={linkClass}>
                                    {t(item.labelKey)}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="w-100 px-3 pb-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100 text-uppercase fw-semibold"
                    style={{ fontSize: '14px', letterSpacing: '0.5px' }}
                >
                    {t('logout') || 'Выход'}
                </button>
            </div>
        </aside>
    );
}