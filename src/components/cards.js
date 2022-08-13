import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from "@mui/material/Container";
import React, { useState } from "react";
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

    //Sorting the data based on the position of the item in the list
    const sortData = props.data.sort((a, b) => a.position - b.position);

    // chunk the data into the array of rows
    const rowSplittedData = rows.map((row, idx) =>
        sortData.slice(idx * 3, idx * 3 + 3)
    );

    // when we move our items, they move using beautiful dnd but
    // after we drop them they go to original state so for that we use
    // react state to make them state at updated place.
    const [items, updateItems] = useState(rowSplittedData);

    // Created a variable to loop over the splitted chunk of data
    // and adding the data item to the grid
    // So this will allow us to split the data into groups of 3 and
    // distributing the size of box based on that like for 2, 50-50%
    // width will be automatically given cause of flex properties

    let content = items.map((row, idx) => (
        <Droppable key={idx} droppableId={`${idx}`}>
            {(provided) => (
                <Grid
                    key={idx}
                    container
                    spacing={2}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {row.map((element, index) => (
                        <Draggable
                            key={element.type}
                            draggableId={element.type}
                            index={index}
                        >
                            {(provided) => (
                                <Grid
                                    xs
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Item sx={{ p: 0 }} key={element.type}>
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
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Grid>
            )}
        </Droppable>
    ));

    //Function to handle what happens after we dragged and dropped the list items

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const itemToBeUpdated = items[result.source.index];
        console.log(result.destination.index);
        console.log(result.source.index);
        console.log(itemToBeUpdated);
        updateItems(rowSplittedData);
    };
    return (
        // Creating a Container or box For the Data
        <Container maxWidth="xl">
            {/* Adding A grid to the box to add the cards(content) to it*/}
            {/* Looping over the data we got and creating boxes from that data */}
            {/* and also adding the drag and drop functionality with a */}
            {/* onDragEnd event listener to run a function to save state  */}
            {/* whenever we drag and drop the element somewhere */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {content}
            </DragDropContext>
        </Container>
    );
};

export default Cards;
