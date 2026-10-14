'use client';

import { useTranslation } from '@/context/LanguageContext';
import Image from 'next/image';
import { Product, ProductTableProps } from '@/types';

export default function ProductTable({ items, formatGuaranteeDate, onDeleteClick }: ProductTableProps) {
    const { t } = useTranslation();

    if (items.length === 0) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5 text-muted">
                    {t('productTable.empty')}
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 animate__animated animate__fadeInUp animate__faster">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="py-3 ps-4">{t('productTable.title')}</th>
                                <th className="py-3">{t('productTable.type')}</th>
                                <th className="py-3">{t('productTable.guaranteeLong')}</th>
                                <th className="py-3">{t('productTable.guaranteeShort')}</th>
                                <th className="py-3">{t('productTable.prices')}</th>
                                <th className="py-3">{t('productTable.order')}</th>
                                <th className="py-3 text-end pe-4">{t('productTable.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((product: Product) => {
                                const startDates = formatGuaranteeDate(product.guaranteeStart);
                                const endDates = formatGuaranteeDate(product.guaranteeEnd);

                                return (
                                    <tr key={product.id}>
                                        <td className="ps-4">
                                            <span className="fw-semibold text-dark">{product.title}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark border">
                                                {product.type}
                                            </span>
                                        </td>
                                        <td className="text-muted small">
                                            <div>{t('productTable.from')} {startDates.long}</div>
                                            <div>{t('productTable.to')} {endDates.long}</div>
                                        </td>
                                        <td className="text-muted small">
                                            <div>{startDates.short}</div>
                                            <div>{endDates.short}</div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-wrap gap-1">
                                                {product.prices && product.prices.length > 0 ? (
                                                    product.prices.map((p, pIdx) => (
                                                        <span key={pIdx} className="badge bg-success-subtle text-success border border-success-subtle">
                                                            {p.value} {p.symbol}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-muted small">{t('productTable.noPrices')}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-primary fw-medium small">
                                                {product.order?.title || `Order #${product.orderId || '—'}`}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button
                                                className="btn btn-outline-danger btn-sm border-0"
                                                onClick={() => onDeleteClick(product)}
                                                title={t('productTable.deleteTooltip')}
                                            >
                                                <Image src="./delete-icon.svg" alt="Delete" width={16} height={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}