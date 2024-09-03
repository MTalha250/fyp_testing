import { color } from 'framer-motion';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = () => {
    const series = [10]; // Single value representing total orders

    const options = {
        chart: {
            type: 'donut',
            width: 200, // Set the width for a smaller chart
            height: 200, // Set the height for a smaller chart
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Orders',
                            formatter: () => series[0], // Display the total number in the center
                        }
                    }
                }
            }
        },
        labels: ['Total Orders'],
        
        colors:['#001529'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 150,
                    height: 150,
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="donut" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default DonutChart;
