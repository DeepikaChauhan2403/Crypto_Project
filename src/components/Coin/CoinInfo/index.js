import React, { useState } from "react";
import "./styles.css";

function CoinInfo({ heading, desc }) {
    const shortDesc = desc.slice(0, 400) + "<p style='color:var(--blue)'> Read More...</p>"
    const longDesc = desc + "<p style='color:var(--blue)'> Read Less...</p>"

    const [flag, setFlag] = useState(true);

    return (
        <div className="grey-wrapper">
            <h2 className="coin-info-heading">{heading}</h2>
            {
                desc.length > 400 ? (
                    <p
                        onClick={() => setFlag(!flag)}
                        className="coin-info-desc"
                        dangerouslySetInnerHTML={{ __html: flag ? shortDesc : longDesc }}>
                    </p>
                ) : (
                    <p className="coin-info-desc"
                    dangerouslySetInnerHTML={{ __html: desc }}></p>
                )
            }

        </div>
    )

}

export default CoinInfo;
