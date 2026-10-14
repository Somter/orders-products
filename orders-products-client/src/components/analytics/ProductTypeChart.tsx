'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ProductTypeChartProps } from '@/types';

const COLORS = ['#198754', '#ffc107', '#0dcaf0', '#dc3545', '#6c757d', '#6610f2'];

export default function ProductTypeChart({ data }: ProductTypeChartProps) {
    if (data.length === 0) {
        return <p className="text-muted text-center my-auto">Нет данных для построения графика</p>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}