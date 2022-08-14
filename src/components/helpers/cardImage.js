import React from "react";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import cardImageUrls from "./cardImageUrls";

const CardImage = (props) => {
    // Using states to check whether the image is still loading or not
    const [loading, setLoading] = useState(true);

    return (
        <>
            <CardContent
                sx={{
                    aspectRatio: "1/1",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                style={{ display: loading ? "flex" : "none" }}
            >
                <CircularProgress />
            </CardContent>

            {/* // using a function onLoad to check whether image is loaded or not after
            its loaded we set loading as false */}

            <img
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "50vw",
                    display: loading ? "none" : "flex",
                }}
                key={props.type}
                src={props.imgUrl}
                onLoad={() => setLoading(false)}
                alt={props.type}
            />
        </>
    );
};

export default CardImage;
