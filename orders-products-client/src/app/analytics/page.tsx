'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import api from '@/services/api';
import dynamic from 'next/dynamic';
import { ChartItem, ProductStat } from '@/types';

const ProductTypeChart = dynamic(
    () => import('@/components/analytics/ProductTypeChart'),
    {
        ssr: false,
        loading: () => (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
                Загрузка графика...
            </div>
        )
    }
);

const WarehouseMap = dynamic(
    () => import('@/components/analytics/WarehouseMap'),
    {
        ssr: false,
        loading: () => (
            <div className="bg-light rounded d-flex justify-content-center align-items-center text-muted" style={{ height: '350px' }}>
                <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
                Загрузка карты...
            </div>
        )
    }
);

export default function AnalyticsPage() {
    const { t } = useTranslation();
    const [chartData, setChartData] = useState<ChartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductStats = async () => {
            try {
                const response = await api.get<ProductStat[]>('/products');
                const products = response.data;

                const typeCounts: Record<string, number> = {};
                products.forEach((p: ProductStat) => {
                    const typeName = p.type || 'Без типа';
                    typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
                });

                const formattedData: ChartItem[] = Object.keys(typeCounts).map((key) => ({
                    name: key,
                    value: typeCounts[key],
                }));

                setChartData(formattedData);
            } catch (err) {
                console.error('Ошибка загрузки статистики продуктов', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductStats();
    }, []);

    return (
        <div className="container-fluid px-0 animate__animated animate__fadeIn">
            <div className="mb-4">
                <h1 className="h3 fw-bold text-dark mb-1">{t('analyticsPage.title')}</h1>
                <p className="text-muted small mb-0">{t('analyticsPage.subtitle')}</p>
            </div>

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">{t('analyticsPage.loading')}</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-white py-3">
                                <h5 className="mb-0 fw-bold text-success">{t('analyticsPage.chartTitle')}</h5>
                            </div>
                            <div className="card-body" style={{ height: '350px' }}>
                                <ProductTypeChart data={chartData} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-white py-3">
                                <h5 className="mb-0 fw-bold text-success">{t('analyticsPage.mapTitle')}</h5>
                            </div>
                            <div className="card-body">
                                <WarehouseMap />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}