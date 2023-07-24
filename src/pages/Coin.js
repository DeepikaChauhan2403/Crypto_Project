import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Common/Loader";
import Header from "../components/Common/Header";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getCoinData } from "../functions/getCoinData";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../functions/converDate";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/Coin/PriceType";


function CoinPage() {
    const { id } = useParams();
    const [isLoader, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});
    const [priceType, setPriceType] = useState('prices');

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days,priceType);
            if (prices.length > 0) {
                console.log("WOHOOOO");
                 
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async(event) => {
        setIsLoading(true);
      setDays(event.target.value);

      const prices = await getCoinPrices(id, event.target.value,priceType);
            if (prices.length > 0) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
    };

    const handlePriceTypeChange = async(event, newType) => {
        setIsLoading(true);
        if(newType==null){
            const prices = await getCoinPrices(id, days,priceType);
            if (prices.length > 0) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
        else{
        setPriceType(newType);
        // console.log("new", newType);
        const prices = await getCoinPrices(id, days,newType);
            if (prices.length > 0) {
                settingChartData(setChartData, prices);
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {/* <Header /> */}
            {
                isLoader ? (
                    <Loader />
                ) : (
                    <>
                        <div className="grey-wrapper">
                            <List coin={coinData} />
                        </div>
                        <div className="grey-wrapper">
                            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
                            <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                            <LineChart chartData={chartData} priceType={priceType} />
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </>
                )
            }
        </div>
    )

}

export default CoinPage;