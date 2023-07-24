import React, { useState } from "react";

import "./styles.css";
import ZoomInTwoToneIcon from '@mui/icons-material/ZoomInTwoTone';

function Search({ search, onSearchChange }){
    

    return(
        <div className="search-flex">
            
            <ZoomInTwoToneIcon />
            <input placeholder="Search by Name/Symbol" 
            type="text" 
            value={search} 
            onChange={(e)=>onSearchChange(e)}/>
        </div>
    )

}

export default Search;