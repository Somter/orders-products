import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/types';

interface OrdersState {
    items: Order[];
    isLoading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    items: [],
    isLoading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.items = action.payload;
        },
        removeOrder: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(order => order.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

export const { setOrders, removeOrder, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;