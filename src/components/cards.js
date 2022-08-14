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

    console.log(JSON.stringify(rowSplittedData, null, "\t"));

    // Created a variable to loop over the splitted chunk of data
    // and adding the data item to the grid
    // So this will allow us to split the data into groups of 3 and
    // distributing the size of box based on that like for 2, 50-50%
    // width will be automatically given cause of flex properties

    let content = rowSplittedData.map((row, idx) => (
        <Droppable key={idx} droppableId={`${idx}`} direction="horizontal">
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
                                        element={element}
                                        imgUrl={props.images[element.type]}
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
        console.log(
            `SourceRowIndex - ${sourceRowIndex} , ${rowSplittedData[sourceRowIndex].length}`
        );
        let sourcePosition =
            sourceRowIndex *
                rowSplittedData[
                    sourceRowIndex > 0 ? sourceRowIndex - 1 : sourceRowIndex
                ].length +
            sourceIndex;
        let destinationPosition =
            destinationRowIndex *
                rowSplittedData[
                    destinationRowIndex > 0
                        ? destinationRowIndex - 1
                        : destinationRowIndex
                ].length +
            destinationIndex;
        console.log(
            `sourcePosition ${sourcePosition} , destinationPosition - ${destinationPosition}`
        );
        newState.forEach((element) => {
            if (element["position"] === sourcePosition) {
                element["position"] = destinationPosition;
            }
            // the case where the element is between source and destination so it
            // needs to be positioned one step back
            // Or if the element is at the destination so it needs to
            // be pushed back too
            else if (
                sourcePosition < destinationPosition &&
                ((element["position"] < destinationPosition &&
                    element["position"] > sourcePosition) ||
                    element["position"] === destinationPosition)
            ) {
                element["position"] -= 1;
            }
            // There's a case when the destination is less than sourcePosition
            // i.e we are moving the element from right to left so in that case
            // we have to increase the position of the right item
            else if (
                sourcePosition > destinationPosition &&
                ((element["position"] > destinationPosition &&
                    element["position"] < sourcePosition) ||
                    element["position"] === destinationPosition)
            ) {
                element["position"] += 1;
            }
            // else {
            //     element["position"] += 1;
            // }
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
