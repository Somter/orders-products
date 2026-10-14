'use client';

import { useTranslation } from '@/context/LanguageContext';
import { DeleteOrderModalProps } from '@/types';

export default function DeleteOrderModal({ order, onClose, onConfirm }: DeleteOrderModalProps) {
    const { t } = useTranslation();

    if (!order) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-danger">
                            {t('modalDeleteOrder.title')}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            {t('modalDeleteOrder.question')} <strong>«{order.title}»</strong>?
                        </p>
                        <p className="text-muted small mb-0">
                            {t('modalDeleteOrder.warning')}
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            {t('modalDeleteOrder.cancel')}
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            {t('modalDeleteOrder.confirm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}