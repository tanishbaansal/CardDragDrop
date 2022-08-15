import { useState } from "react";
import Loader from "../extraUtils/loader";

const CardImage = (props) => {
    // Using states to check whether the image is still loading or not
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Loader style={{ display: loading ? "flex" : "none" }} />

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
