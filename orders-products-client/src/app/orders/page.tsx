'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setLoading, setError, removeOrder } from '@/store/slices/ordersSlice';
import { RootState, AppDispatch } from '@/store/index';
import api from '@/services/api';
import { useTranslation } from '@/context/LanguageContext';

import OrderTable from '@/app/orders/OrderTable';
import OrderDetails from '@/app/orders/OrderDetails';
import DeleteOrderModal from '@/app/orders/DeleteOrderModal';
import { Order, Product, Price } from '@/types';

export default function OrdersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, isLoading, error } = useSelector((state: RootState) => state.orders);
    const { t } = useTranslation();

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch(setLoading(true));
            try {
                const response = await api.get('/orders');
                dispatch(setOrders(response.data));
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки';
                dispatch(setError(errorMessage));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchOrders();
    }, [dispatch]);

    const calculateTotals = (products?: Product[]): { usd: number; uah: number } => {
        if (!products || products.length === 0) return { usd: 0, uah: 0 };

        let usd = 0;
        let uah = 0;

        products.forEach(product => {
            product.prices?.forEach((price: Price) => {
                if (price.symbol === 'USD' || price.symbol === '$') {
                    usd += price.value;
                } else if (price.symbol === 'UAH' || price.symbol === 'грн') {
                    uah += price.value;
                }
            });
        });

        return { usd, uah };
    };

    const confirmDelete = async () => {
        if (!orderToDelete) return;

        try {
            await api.delete(`/orders/${orderToDelete.id}`);
            dispatch(removeOrder(Number(orderToDelete.id)));

            if (selectedOrder?.id === orderToDelete.id) {
                setSelectedOrder(null);
            }
            setOrderToDelete(null);
        } catch (err: any) {
            alert(err.response?.data?.error || t('ordersPage.deleteError'));
        }
    };

    return (
        <div className="container-fluid px-0 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 fw-bold text-dark mb-0">{t('ordersPage.title')}</h1>
                <div className="badge bg-success fs-6 px-3 py-2">
                    {t('ordersPage.totalOrders')} {items.length}
                </div>
            </div>

            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">{t('ordersPage.loading')}</span>
                    </div>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {!isLoading && !error && (
                <div className="row g-4 animate__animated animate__fadeInUp animate__faster">
                    <div className={selectedOrder ? "col-lg-5 col-xl-5" : "col-12"}>
                        <OrderTable
                            items={items}
                            selectedOrderId={selectedOrder?.id || null}
                            onSelectOrder={(order: Order) => setSelectedOrder(order)}
                            onDeleteClick={(order: Order, e: React.MouseEvent) => {
                                e.stopPropagation();
                                setOrderToDelete(order);
                            }}
                            calculateTotals={calculateTotals}
                        />
                    </div>

                    {selectedOrder && (
                        <div className="col-lg-7 col-xl-7">
                            <OrderDetails
                                order={selectedOrder}
                                onClose={() => setSelectedOrder(null)}
                            />
                        </div>
                    )}
                </div>
            )}
            <DeleteOrderModal
                order={orderToDelete}
                onClose={() => setOrderToDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}