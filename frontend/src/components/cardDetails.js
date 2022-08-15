import Typography from "@mui/material/Typography";
import CardImage from "./cardUtils/cardImage";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import Fade from "@mui/material/Fade";

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
            <Modal open={open} onClose={handleClose} closeAfterTransition>
                <Fade in={open}>
                    <Grid
                        container
                        sx={{
                            justifyContent: "center",
                            alignContent: "center",
                            height: "100vh",
                        }}
                    >
                        <CardImage
                            type={props.element.type}
                            imgUrl={props.element.imgurl}
                        />
                    </Grid>
                </Fade>
            </Modal>
            <Item sx={{ p: 0 }} key={props.element.type} onClick={handleOpen}>
                <CardImage
                    type={props.element.type}
                    imgUrl={props.element.imgurl}
                />
                <Typography sx={{ p: 3 }} variant="h5" component="div">
                    {props.element.title}
                </Typography>
            </Item>
        </>
    );
};

export default CardDetails;
