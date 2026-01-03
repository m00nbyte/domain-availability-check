// src/components/stats/ChartJSLineChart.tsx

'use client';

import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartJSLineChartProps {
    data: { date: string; count: number }[];
}

export default function ChartJSLineChart({ data }: ChartJSLineChartProps) {
    const formattedLabels = data.map((d) => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                label: 'Permalinks Created',
                data: data.map((d) => d.count),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#1e40af',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(28, 25, 23, 0.95)',
                titleColor: '#fff',
                bodyColor: '#d1d5db',
                borderColor: '#57534e',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    title: (tooltipItems: TooltipItem<'line'>[]) => {
                        const index = tooltipItems[0].dataIndex;
                        const dateStr = data[index].date;
                        const date = new Date(dateStr);
                        return date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    },
                    label: (context: TooltipItem<'line'>) => {
                        return `Checks: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(55, 65, 81, 0.3)',
                    drawBorder: false
                },
                ticks: {
                    color: '#9ca3af',
                    maxRotation: 0,
                    callback: function (value: string | number, index: number) {
                        return index % 5 === 0 ? formattedLabels[index] : '';
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(55, 65, 81, 0.3)',
                    drawBorder: false
                },
                ticks: {
                    color: '#9ca3af',
                    precision: 0,
                    callback: function (value: string | number) {
                        const numValue = Number(value);
                        return Number.isInteger(numValue) ? numValue : '';
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index' as const
        },
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    return <Line data={chartData} options={options} />;
}
