'use client';

import { format, parseISO } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslation } from '@/context/LanguageContext';
import Image from 'next/image';
import { Order, Product, OrderTableProps } from '@/types';

export default function OrderTable({
    items,
    selectedOrderId,
    onSelectOrder,
    onDeleteClick,
    calculateTotals,
}: OrderTableProps) {
    const { locale, t } = useTranslation();
    const dateLocale = locale === 'en' ? enUS : ru;

    if (items.length === 0) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5 text-muted">
                    {t('orderTable.empty')}
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="py-3 ps-4">{t('orderTable.headers.title')}</th>
                                <th className="py-3">{t('orderTable.headers.productsCount')}</th>
                                <th className="py-3">{t('orderTable.headers.dateLong')}</th>
                                <th className="py-3">{t('orderTable.headers.dateShort')}</th>
                                <th className="py-3">{t('orderTable.headers.total')}</th>
                                <th className="py-3 text-end pe-4">{t('orderTable.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((order) => {
                                const isSelected = selectedOrderId === order.id;
                                let dateLong = order.date;
                                let dateShort = order.date;

                                try {
                                    const parsed = parseISO(order.date);
                                    dateLong = format(parsed, 'dd MMM yyyy, HH:mm', { locale: dateLocale });
                                    dateShort = format(parsed, 'dd.MM.yyyy', { locale: dateLocale });
                                } catch (e) { }

                                const totals = calculateTotals(order.products);

                                return (
                                    <tr
                                        key={order.id}
                                        onClick={() => onSelectOrder(order)}
                                        style={{ cursor: 'pointer' }}
                                        className={isSelected ? 'table-active' : ''}
                                    >
                                        <td className="ps-4">
                                            <span className="fw-semibold text-dark">{order.title}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark border">
                                                {order.products?.length || 0} {t('orderTable.pieces')}
                                            </span>
                                        </td>
                                        <td className="text-muted small">{dateLong}</td>
                                        <td className="text-muted small">{dateShort}</td>
                                        <td>
                                            <div className="fw-medium text-success">${totals.usd.toFixed(2)}</div>
                                            <div className="text-muted small">{totals.uah.toFixed(2)} грн</div>
                                        </td>
                                        <td className="text-end pe-4" onClick={(e) => onDeleteClick(order, e)}>
                                            <button className="btn btn-outline-danger btn-sm border-0" title={t('orderTable.deleteTooltip')}>
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