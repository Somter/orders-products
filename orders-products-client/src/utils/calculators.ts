export interface Price {
    value: number;
    symbol: string;
}

export interface Product {
    prices?: Price[];
    [key: string]: any;
}


export function calculateTotals(products?: Product[]): { usd: number; uah: number } {
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
}