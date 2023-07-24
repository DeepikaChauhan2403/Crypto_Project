import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./styles.css"

export default function TogglePriceType({priceType, handlePriceTypeChange}) {

    return (
        <div className='toggle-prices'>
        <ToggleButtonGroup
            value={priceType}
            exclusive
            onChange={handlePriceTypeChange}
            sx={{
                "& .Mui-selected": {
                    color: "var(--blue) !important",
                },
                borderColor: "var(--blue)",
                border: "unset !important",
                "& .MuiToggleButtonGroup-grouped": {
                    border: "1px solid !important",
                    borderColor: "unset",
                    color: "var(--blue)",
                },
                "& .MuiToggleButton-standard": {
                    color: "var(--blue)",
                },
            }}
        >
            <ToggleButton value="prices" className='toggle-btn' aria-label="left aligned">
                Price
            </ToggleButton>
            <ToggleButton value="market_caps"  className='toggle-btn' aria-label="centered">
                Market Cap
            </ToggleButton>
            <ToggleButton value="total_volumes"  className='toggle-btn' aria-label="right aligned">
                Total Volume
            </ToggleButton>
        </ToggleButtonGroup>
        </div>
    );
}