import Typography from "@mui/material/Typography";
import CardImage from "./Utils/cardImage";
const CardDetails = (props) => {
    return (
        <>
            <CardImage title={props.title} index={props.index} />
            <Typography sx={{ p: 3 }} variant="h5" component="div">
                {props.title}
            </Typography>
        </>
    );
};

export default CardDetails;
