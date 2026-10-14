'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError, removeProduct } from '@/store/slices/productsSlice';
import { RootState, AppDispatch } from '@/store/index';
import api from '@/services/api';
import { format, parseISO } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslation } from '@/context/LanguageContext';

import ProductTable from './ProductTable';
import DeleteProductModal from './DeleteProductModal';
import { Product } from '@/types';

export default function ProductsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: rawItems, isLoading, error } = useSelector((state: RootState) => state.products);
    // Приводим к глобальному типу из src/types/index.ts
    const items = rawItems as Product[];

    const { locale, t } = useTranslation();
    const dateLocale = locale === 'en' ? enUS : ru;

    const [selectedType, setSelectedType] = useState<string>('');
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const fetchProducts = async (typeFilter?: string) => {
        dispatch(setLoading(true));
        try {
            const url = typeFilter ? `/products?type=${encodeURIComponent(typeFilter)}` : '/products';
            const response = await api.get(url);
            dispatch(setProducts(response.data));
        } catch (err: any) {
            dispatch(setError(err.response?.data?.error || err.message || 'Ошибка загрузки продуктов'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchProducts(selectedType);
    }, [selectedType, dispatch]);

    const uniqueTypes = Array.from(new Set(items.map((p) => p.type))).filter(Boolean);

    const formatGuaranteeDate = (dateString?: string) => {
        if (!dateString) return { long: 'N/A', short: 'N/A' };
        try {
            const parsed = parseISO(dateString);
            return {
                long: format(parsed, 'dd MMMM yyyy', { locale: dateLocale }),
                short: format(parsed, 'dd.MM.yyyy', { locale: dateLocale }),
            };
        } catch (e) {
            return { long: dateString, short: dateString };
        }
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await api.delete(`/products/${productToDelete.id}`);
            dispatch(removeProduct(Number(productToDelete.id)));
            setProductToDelete(null);
        } catch (err: any) {
            alert(err.response?.data?.error || t('productsPage.deleteError'));
        }
    };

    return (
        <div className="container-fluid px-0 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h1 className="h3 fw-bold text-dark mb-1">{t('productsPage.title')}</h1>
                    <p className="text-muted small mb-0">{t('productsPage.subtitle')}</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="input-group" style={{ width: '280px' }}>
                        <label className="input-group-text bg-white text-muted small">{t('productsPage.filterType')}</label>
                        <select
                            className="form-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">{t('productsPage.allTypes')}</option>
                            {uniqueTypes.map((type, idx) => (
                                <option key={idx} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="badge bg-success fs-6 px-3 py-2">
                        {t('productsPage.found')} {items.length}
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">{t('productsPage.loading')}</span>
                    </div>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {!isLoading && !error && (
                <ProductTable
                    items={items}
                    formatGuaranteeDate={formatGuaranteeDate}
                    onDeleteClick={(product) => setProductToDelete(product)}
                />
            )}

            <DeleteProductModal
                product={productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={confirmDeleteProduct}
            />
        </div>
    );
}