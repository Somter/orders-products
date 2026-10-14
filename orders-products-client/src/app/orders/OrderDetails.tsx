'use client';

import { useTranslation } from '@/context/LanguageContext';

interface OrderDetailsProps {
    order: any;
    onClose: () => void;
}

export default function OrderDetails({ order, onClose }: OrderDetailsProps) {
    const { t } = useTranslation();

    if (!order) return null;

    return (
        <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold text-success">{t('orderDetails.title')}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="card-body">
                <h4 className="fw-bold mb-2">{order.title}</h4>
                <p className="text-muted small mb-3">{t('orderDetails.orderId')} #{order.id}</p>

                <hr />

                <h6 className="fw-bold mb-3">{t('orderDetails.productsTitle')}</h6>

                {(!order.products || order.products.length === 0) ? (
                    <p className="text-muted small">{t('orderDetails.noProducts')}</p>
                ) : (
                    <div className="d-flex flex-column gap-2" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        {order.products.map((prod: any, idx: number) => (
                            <div key={prod.id || idx} className="p-3 bg-light rounded border">
                                <div className="fw-semibold text-dark">{prod.title}</div>
                                <div className="text-muted small mb-2">{t('orderDetails.type')} {prod.type}</div>
                                <div className="d-flex gap-2">
                                    {prod.prices?.map((p: any, pIdx: number) => (
                                        <span key={pIdx} className="badge bg-white text-dark border">
                                            {p.value} {p.symbol}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}