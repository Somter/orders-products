'use client';

import { useTranslation } from '@/context/LanguageContext';
import { DeleteProductModalProps } from '@/types';

export default function DeleteProductModal({ product, onClose, onConfirm }: DeleteProductModalProps) {
    const { t } = useTranslation();

    if (!product) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-danger">{t('modalDeleteProduct.title')}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{t('modalDeleteProduct.question')} <strong>«{product.title}»</strong>?</p>
                        <p className="text-muted small mb-0">{t('modalDeleteProduct.warning')}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            {t('modalDeleteProduct.cancel')}
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            {t('modalDeleteProduct.confirm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}