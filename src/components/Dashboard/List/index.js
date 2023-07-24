import React, { useState , useEffect} from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { convertNumbers } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import AddedStar from "../AddedStar";
import Star from "../star";
import { isAdded } from "../../../functions/isAdded";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";


import "./styles.css";
import { Tooltip } from "@mui/material";


function List({ coin }) {
    const [added, setAdded] = useState(false);

    useEffect(()=>{
        setAdded(isAdded(coin.id))
    },[coin]);

    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.tr
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="list-row">
                <Tooltip title="Coin Logo" placement="bottom-start">
                    <td className="td-image">
                        <img src={coin.image} className="coin-logo coin-logo-resp" />
                    </td>
                </Tooltip>

                <Tooltip title="Coin Info" placement="bottom-start">
                    <td>
                        <div className="name-col ">
                            <p className="coin-symbol coin-symbol-resp">{coin.symbol}</p>
                            <p className="coin-name coin-name-resp">{coin.name}</p>
                        </div>
                    </td>
                </Tooltip>

                <Tooltip title="Price change in 24 hrs" placement="bottom-start">
                    {
                        coin.price_change_percentage_24h > 0 ? (
                            <td className="chip-flex ">
                                <div className="price-chip price-chip-resp">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className="icon-chip td-icon"><TrendingUpRoundedIcon /></div>
                            </td>
                        ) : (
                            <td className="chip-flex">
                                <div className="price-chip price-chip-resp chip-red">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className="icon-chip chip-red td-icon"><TrendingDownRoundedIcon /></div>
                            </td>
                        )
                    }
                </Tooltip>

                <Tooltip title="Current Price" placement="bottom-start">
                    <td>
                        <h3 className="coin-price current-price"
                            style={{
                                color:
                                    coin.price_change_percentage_24h < 0 ?
                                        "var(--red)" :
                                        "var(--green)",
                            }}
                        >
                            ${coin.current_price.toLocaleString()}
                        </h3>
                    </td>
                </Tooltip>

                <Tooltip title="Total Volume" placement="bottom-start">
                    <td><p className="total_volume td-total-volume">{coin.total_volume.toLocaleString()}</p></td>
                </Tooltip>

                <Tooltip title="Market Cap" placement="bottom-start">
                    <td className="desktop-td-mkt">
                        <p className="total_volume">${coin.market_cap.toLocaleString()}</p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" placement="bottom-start">
                    <td className="mobile-td-mkt">
                        <p className="total_volume">${convertNumbers(coin.market_cap)}</p>
                    </td>
                </Tooltip>

                <div>
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
                                <div><AddedStar color={coin.price_change_percentage_24h < 0 ? "red" : "green"} /> </div>
                            ) : (
                                <div><Star color={coin.price_change_percentage_24h < 0 ? "red" : "green"} /> </div>
                            )
                        }
                    </IconButton>
                </div>

            </motion.tr>

        </Link>
    )

}

export default List;