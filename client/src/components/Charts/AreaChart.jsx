import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = () => {
    const monthDataSeries1 = {
        prices: [
            8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
            8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25, 8600.65,
            8881.1, 9340.85
        ],
        dates: [
            "2024-07-01", "2024-07-02", "2024-07-03", "2024-07-04", "2024-07-05", 
            "2024-07-08", "2024-07-09", "2024-07-10", "2024-07-11", "2024-07-12",
            "2024-07-15", "2024-07-16", "2024-07-17", "2024-07-18", "2024-07-19",
            "2024-07-22", "2024-07-23", "2024-07-24", "2024-07-25", "2024-07-26"
        ]
    };
    
    const series = [{
        name: "Price",
        data: monthDataSeries1?.prices // Replace `series.monthDataSeries1` with your actual data
    }];

    const options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Sample Order Sales History By Date',
            align: 'left'
        },
        subtitle: {
            text: 'Price Movements',
            align: 'left'
        },
        labels: monthDataSeries1?.dates, // Replace `series.monthDataSeries1` with your actual data
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default AreaChart;
