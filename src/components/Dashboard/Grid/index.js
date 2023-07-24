import React, { useEffect, useState } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
import Star from "../star";
import { isAdded } from "../../../functions/isAdded";
import AddedStar from "../AddedStar";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";

import "./styles.css";

function Grid({ coin }) {
    const [added, setAdded] = useState(false);

    useEffect(()=>{
        setAdded(isAdded(coin.id))
    },[coin]);
    // console.log("added", added);

    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"
                    }`}
            >
                <div className="cointainer-flex">
                    <div className="info-flex">
                        <img src={coin.image} className="coin-logo" />
                        <div className="name-col">
                            <p className="coin-symbol">{coin.symbol}</p>
                            <p className="coin-name">{coin.name}</p>
                        </div>
                    </div>
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            if (added) {
                                removeFromWatchlist(coin.id);
                                setAdded(false);

                            } else {
                                addToWatchlist(coin.id);
                                setAdded(true);

                            }
                        }}
                    >
                        {
                            added ? (
                                <AddedStar color={coin.price_change_percentage_24h < 0 ? "red" : "green"} />
                            ) : (
                                <Star color={coin.price_change_percentage_24h < 0 ? "red" : "green"} />
                            )
                        }
                    </IconButton>

                </div>

                {
                    coin.price_change_percentage_24h > 0 ? (
                        <div className="chip-flex">
                            <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                            <div className="icon-chip"><TrendingUpRoundedIcon /></div>
                        </div>
                    ) : (
                        <div className="chip-flex">
                            <div className="price-chip chip-red">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                            <div className="icon-chip chip-red"><TrendingDownRoundedIcon /></div>
                        </div>
                    )
                }

                <div className="info-container">
                    <h3 className="coin-price"
                        style={{
                            color:
                                coin.price_change_percentage_24h < 0 ?
                                    "var(--red)" :
                                    "var(--green)",
                        }}
                    >
                        ${coin.current_price.toLocaleString()}
                    </h3>

                    <p className="total_volume">Total Volume : {coin.total_volume.toLocaleString()}</p>
                    <p className="total_volume">Market Cap : {coin.market_cap.toLocaleString()}</p>
                </div>

            </motion.div>
        </Link>
    )

}

export default Grid;
