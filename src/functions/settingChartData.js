import { convertDate } from "./converDate"

export const settingChartData = (setChartData, prices1, prices2, crypto1, crypto2)=> {

    if(prices2){
        setChartData({
            labels: prices1.map((price)=> convertDate(price[0])),
            datasets: [
                {
                    label: crypto1,
                    data: prices1.map((price)=> price[1]),
                    borderColor: "#61c96f",
                    borderWidth: 2,
                    backgroundColor: "rgba(58, 128, 233, 0.1)",
                    fill: false,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverBackgroundColor: "#61c96f",
                    pointHoverRadius: 5,
                    yAxisID: "crypto1",
                },
                {
                    label: crypto2,
                    data: prices2.map((price)=> price[1]),
                    borderColor: "#f94141",
                    borderWidth: 2,
                    backgroundColor: "rgba(58, 128, 233, 0.1)",
                    fill: false,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverBackgroundColor: "#f94141",
                    pointHoverRadius: 5,
                    yAxisID: "crypto2",
                },
            ],
        })
    }
    else{
        setChartData({
            labels: prices1.map((price)=> convertDate(price[0])),
            datasets: [
                {
                    // label: 'Dataset 1',
                    data: prices1.map((price)=> price[1]),
                    borderColor: "#3a80e9",
                    borderWidth: 2,
                    backgroundColor: "rgba(58, 128, 233, 0.1)",
                    fill: true,
                    tension: 0.25,
                    pointRadius: 2,
                    pointHoverBackgroundColor: "#042b65",
                    pointHoverRadius: 5,
                    yAxisID: "crypto1",
                },
            ],
        })
    }
}