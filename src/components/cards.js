import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Cards = (props) => {
    // First to distribute the content over different rows we
    // calculate the total number of rows we need and split the data
    // accordingly
    const rows = [...Array(Math.ceil(props.data.length / 3))];
    // chunk the data into the array of rows
    const rowSplittedData = rows.map((row, idx) =>
        props.data.slice(idx * 3, idx * 3 + 3)
    );

    // Created a variable to loop over the splitted chunk of data
    // and adding the data item to the grid
    // So this will allow us to split the data into groups of 3 and
    // distributing the size of box based on that like for 2, 50-50%
    // width will be automatically given cause of flex properties

    let content = rowSplittedData.map((row, idx) => (
        <Grid container spacing={2}>
            {row.map((element) => (
                <Grid key={idx} xs>
                    <Item sx={{ p: 0 }}>
                        <CardMedia
                            component="img"
                            maxheight="300"
                            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                            alt={element.title}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {element.title}
                            </Typography>
                        </CardContent>
                    </Item>
                </Grid>
            ))}
        </Grid>
    ));
    console.log(content);
    return (
        // Creating a Container or box For the Data
        <Container maxWidth="xl">
            {/* Adding A grid to the box to add the cards(content) to it*/}
            {/* Looping over the data we got and creating boxes from that data */}
            {content}
        </Container>
    );
};

export default Cards;