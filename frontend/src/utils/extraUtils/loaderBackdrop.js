import { Fade, Backdrop } from "@mui/material";
import React from "react";
import Loader from "./loader";

const LoaderBackdrop = (props) => {
    return (
        <Fade in={true} style={{ transition: "all 1s ease-in-out" }}>
            <Backdrop
                open={true}
                sx={{
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
                style={{
                    ...props.style,
                    flexDirection: "column",
                }}
            >
                <Loader color="inherit" sx={{ p: 2 }} />
                Last Saved At - {props.lastSaveDate}
            </Backdrop>
        </Fade>
    );
};

export default LoaderBackdrop;
