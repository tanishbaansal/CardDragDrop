import Grid from "@mui/material/Unstable_Grid2";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import CardDetails from "./cardDetails";
const Cards = (props) => {
    // when we move our items, they move using beautiful dnd but
    // after we drop them they go to original state so for that we use
    // react state to make them state at updated place.
    const [items, updateItems] = useState(props.data);

    // First to distribute the content over different rows we
    // calculate the total number of rows we need and split the data
    // accordingly
    const rows = [...Array(Math.ceil(items.length / 3))];

    //Sorting the data based on the position of the item in the list
    const sortData = items.sort((a, b) => a.position - b.position);

    // chunk the data into the array of rows
    const rowSplittedData = rows.map((row, idx) =>
        sortData.slice(idx * 3, idx * 3 + 3)
    );

    console.log(rowSplittedData);
    // Created a variable to loop over the splitted chunk of data
    // and adding the data item to the grid
    // So this will allow us to split the data into groups of 3 and
    // distributing the size of box based on that like for 2, 50-50%
    // width will be automatically given cause of flex properties

    let content = rowSplittedData.map((row, idx) => (
        <Droppable key={idx} droppableId={`${idx}`}>
            {(provided) => (
                <Grid
                    key={idx}
                    container
                    spacing={2}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ m: 2 }}
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
                                    {/* Adding a image modal on Box Click */}
                                    {/* Made A component for getting the card details */}
                                    {/* and also showing loading animation till image loads */}
                                    <CardDetails
                                        title={element.title}
                                        index={idx * 3 + index}
                                    />
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
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceRowIndex = +source.droppableId;
        const destinationRowIndex = +destination.droppableId;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const newState = [...items];
        console.log(
            `Index Row - source ${sourceRowIndex} , destination - ${destinationRowIndex}`
        );
        console.log(
            `Index Column - source ${sourceIndex} , destination - ${destinationIndex}`
        );
        let sourcePosition = sourceIndex * 3 + sourceRowIndex;
        let destinationPosition = destinationRowIndex * 3 + destinationIndex;
        newState.forEach((element) => {
            if (element["position"] === sourcePosition) {
                element["position"] = destinationPosition;
            } else if (element["position"] > destinationPosition) {
                element["position"] += 1;
            } else {
                element["position"] -= 1;
            }
        });
        updateItems(newState);
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
