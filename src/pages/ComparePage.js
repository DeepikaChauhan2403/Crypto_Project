import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/PriceType";

function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("tron");
    const [cryptoData, setCryptoData] = useState();
    const [crypto2Data, setCrypto2Data] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [priceType, setPriceType] = useState("prices");
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({});


    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
        settingChartData(setChartData, prices1, prices2, cryptoData.name, crypto2Data.name);
        setIsLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        if (newType == null) {
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2, cryptoData.name, crypto2Data.name);
            setIsLoading(false);
        }
        else {
            setPriceType(newType);
            const prices1 = await getCoinPrices(crypto1, days, newType);
            const prices2 = await getCoinPrices(crypto2, days, newType);
            settingChartData(setChartData, prices1, prices2, cryptoData.name, crypto2Data.name);
            setIsLoading(false);
        }
    }


useEffect(() => {
    getData();
}, []);

async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
        coinObject(setCryptoData, data1);
    }
    if (data2) {
        coinObject(setCrypto2Data, data2);
    }
    if (data1 && data2) {
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        if (prices1.length > 0 && prices2.length > 0) {
            settingChartData(setChartData, prices1, prices2, data1.name, data2.name);
            // console.log("BOTH", prices1, prices2);
            setIsLoading(false);
        }
    }
}

const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
        setCrypto2(event.target.value);
        const data = await getCoinData(event.target.value);
        if (data) {
            coinObject(setCrypto2Data, data);
        }
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2, cryptoData.name, data.name)
    }
    else {
        setCrypto1(event.target.value);
        const data = await getCoinData(event.target.value);
        if (data) {
            coinObject(setCryptoData, data);
        }
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2, data.name, crypto2Data.name)
    }
    setIsLoading(false);
};


return (
    <div>
        {/* <Header /> */}
        {
            isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="coins-days-flex">
                        <SelectCoins
                            crypto1={crypto1}
                            crypto2={crypto2}
                            handleCoinChange={handleCoinChange}
                        />

                        <SelectDays
                            days={days}
                            handleDaysChange={handleDaysChange}
                        />
                    </div>

                    <div className="grey-wrapper">
                        <List coin={cryptoData} />
                    </div>
                    <div className="grey-wrapper">
                        <List coin={crypto2Data} />
                    </div>

                    <div className="grey-wrapper">
                        <div className="TogglePriceType-padding"><TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} /></div>
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>

                    <CoinInfo heading={cryptoData.name} desc={cryptoData.desc} />
                    <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
                </>
            )
        }
    </div>
);
    }



export default ComparePage;