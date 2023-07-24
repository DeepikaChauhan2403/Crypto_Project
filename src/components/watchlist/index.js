import React from "react";
import Button from "../Common/Button";
import{Link} from "react-router-dom";
import "./styles.css"


function WatchlistEmptyPage(){

     return(
        <div className="watchlistEmptyPage">
            <h1>No Items in the Watchlist</h1>
            <Link to="/dashboard"><Button text={"Dashboard"} outlined={false}/></Link>
        </div>
     )

}

export default WatchlistEmptyPage;