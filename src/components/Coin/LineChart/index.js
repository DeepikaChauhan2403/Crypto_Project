import React from "react";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertNumbers } from "../../../functions/convertNumbers";

function LineChart({ chartData, priceType, multiAxis }) {
    console.log(priceType);

    const options = {
        plugins: {
            legend: {
                position: 'top',
                display: multiAxis ? true : false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            crypto1: {
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                    callback: function(value,index,ticks){
                       if(priceType == "prices") return "$" + value.toLocaleString();
                       else{
                        return "$" + convertNumbers(value);
                       }
                    }
                }
            },
            crypto2: {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    callback: function(value,index,ticks){
                       if(priceType == "prices") return "$" + value.toLocaleString();
                       else{
                        return "$" + convertNumbers(value);
                       }
                    }
                }
            }
        }
    };

    return <Line data={chartData} options={options} />

}

export default LineChart;