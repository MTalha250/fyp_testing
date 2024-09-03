import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
    const series = [{
        name:"Orders",
        data: [10, 20, 15, 30, 25, 40, 35, 50, 45, 60] // Sample data representing single orders
    }];

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: false, // Set to false for vertical bar chart
            }
        },
        colors:["#224A72"],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [
                '2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05',
                '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09', '2024-09-10'
            ], // Dates corresponding to each order
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default BarChart;
