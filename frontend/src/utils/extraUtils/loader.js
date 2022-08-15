import { CardContent, CircularProgress } from "@mui/material";
const Loader = (props) => {
    return (
        <>
            <CardContent
                sx={{
                    aspectRatio: "1/1",
                    justifyContent: "center",
                    alignItems: "center",
                    ...props.extraStyles,
                }}
                style={props.style}
            >
                <CircularProgress color={props.color} sx={{ p: 2 }} />
            </CardContent>
        </>
    );
};
export default Loader;
