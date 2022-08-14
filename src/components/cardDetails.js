import { CircularProgress } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
const CardDetails = (props) => {
    // Using states to check whether the image is still loading or not
    const [loading, setLoading] = useState(true);
    console.log(`Loading for ${props.index} - ${loading}`);
    // Image urls to show random image on the card details
    const imgUrls = [
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2800&q=60",
        "https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2800&q=60",
        "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2800&q=60",
        "https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2800&q=60",
        "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2800&q=60",
    ];

    return (
        <>
            <CardContent
                sx={{
                    height: 300,
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
                style={{ maxWidth: "100%", display: loading ? "none" : "flex" }}
                key={imgUrls[props.index]}
                src={imgUrls[props.index]}
                onLoad={() => setLoading(false)}
                alt={props.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
            </CardContent>
        </>
    );
};

export default CardDetails;
