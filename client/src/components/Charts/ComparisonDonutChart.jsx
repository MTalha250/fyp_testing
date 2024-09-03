import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ComparisonDonutChart = () => {
    const completedOrders = 6; // Number of completed orders
    const uncompletedOrders = 4; // Number of uncompleted orders
    const totalOrders = completedOrders + uncompletedOrders; // Total orders

    const series = [completedOrders, uncompletedOrders]; // Data for the donut chart

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
                            formatter: () => totalOrders, // Display the total number in the center
                        }
                    }
                }
            }
        },
        labels: ['Completed Orders', 'Uncompleted Orders'], // Labels for each section
        colors: ['#001529', '#305171'], // Dark green and light green colors
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

export default ComparisonDonutChart;
