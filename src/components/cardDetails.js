import Typography from "@mui/material/Typography";
import CardImage from "./Utils/cardImage";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const CardDetails = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        alignContent: "center",
                        height: "100vh",
                    }}
                >
                    <CardImage title={props.title} index={props.index} />
                </Grid>
            </Modal>
            <Item sx={{ p: 0 }} key={props.title} onClick={handleOpen}>
                <CardImage title={props.title} index={props.index} />
                <Typography sx={{ p: 3 }} variant="h5" component="div">
                    {props.title}
                </Typography>
            </Item>
        </>
    );
};

export default CardDetails;
