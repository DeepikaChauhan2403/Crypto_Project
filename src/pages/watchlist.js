import React, { useEffect, useState } from "react";
import Loader from "../components/Common/Loader";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import WatchlistEmptyPage from "../components/watchlist";
import Header from "../components/Common/Header";
import BackToTop from "../components/Common/BackToTop";

function WatchlistPage() {
    const coins = JSON.parse(localStorage.getItem("watchlist")) || [];
    const [myWatchlist, setMyWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const allCoins = await get100Coins();
            // console.log(allCoins)
            if (coins) {
                setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
            }
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <BackToTop />

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        {myWatchlist.length === 0 || !coins ? (
                            <div>
                                <WatchlistEmptyPage />
                            </div>
                        ) : (
                            <div className="watchlist-cointainer">
                                <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
                            </div>
                        )}

                    </div>
                )
            }
        </div>
    );

}

export default WatchlistPage;



