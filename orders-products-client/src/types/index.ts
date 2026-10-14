export interface Price {
    id?: number | string;
    value: number;
    symbol: string;
    isDefault?: number;
}
export interface Product {
    id: number | string;
    serialNumber?: number;
    isNew?: number;
    photo?: string;
    title: string;
    type?: string;
    specification?: string;
    guaranteeStart?: string;
    guaranteeEnd?: string;
    date?: string;
    orderId?: number | string;
    prices?: Price[];
    order?: Order;
    [key: string]: any;
}

export interface ProductTableProps {
    items: Product[];
    formatGuaranteeDate: (dateString?: string) => { long: string; short: string };
    onDeleteClick: (product: Product) => void;
}

export interface Order {
    id: number | string;
    title: string;
    date: string;
    description?: string;
    products?: Product[];
}

export interface ChartItem {
    name: string;
    value: number;
}

export interface ProductStat {
    type?: string;
}

export interface DeleteOrderModalProps {
    order: Order | null;
    onClose: () => void;
    onConfirm: () => void;
}

export interface OrderTableProps {
    items: Order[];
    selectedOrderId: number | string | null;
    onSelectOrder: (order: Order) => void;
    onDeleteClick: (order: Order, e: React.MouseEvent) => void;
    calculateTotals: (products?: Product[]) => { usd: number; uah: number };
}

export interface DeleteProductModalProps {
    product: Product | null;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ChartItem {
    name: string;
    value: number;
}

export interface ProductTypeChartProps {
    data: ChartItem[];
}