import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Price {
    id?: number;
    value: number;
    symbol: string;
    isDefault?: number;
}

export interface Product {
    id: number | string;
    title: string;
    type: string;
    guaranteeStart?: string;
    guaranteeEnd?: string;
    orderId?: number;
    order?: {
        id: number;
        title: string;
    };
    prices?: Price[];
}

interface ProductsState {
    items: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => Number(item.id) !== action.payload);
        },
    },
});

export const { setProducts, setLoading, setError, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;