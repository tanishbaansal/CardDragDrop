import Grid from "@mui/material/Unstable_Grid2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import CardDetails from "./cardDetails";
import CardSave from "./cardUtils/cardSave";
import dataDiffChecker from "./extraUtils/dataDiffChecker";
import { fetchLastSaveData } from "./extraUtils/fetchData";
import LoaderBackdrop from "./extraUtils/loaderBackdrop";

const Cards = (props) => {
    // when we move our items, they move using beautiful dnd but
    // after we drop them they go to original state so for that we use
    // react state to make them state at updated place.
    const [items, updateItems] = useState(props.data);
    const [saving, setSaving] = useState(false);
    const [lastSaveDate, setLastSaveDate] = useState(null);
    // console.log(`Prop item - ${JSON.stringify(items)}`);
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

    const intervalTime = 5000; // Card Update Save every 5 seconds

    // Effect hook to check after set intervalTime whether the data is changed or not
    useEffect(() => {
        const interval = setInterval(async () => {
            // function call to check whether the items are updated or not
            let changedData = await dataDiffChecker(items);

            // if items are updated so we will get back changedData as an array of items that are changed
            if (changedData.length > 0) {
                // Starting the saving process to the DB so setting saving variable as true so we can show a backdrop & loader
                setSaving(true);

                //function to get the last save date
                let lastSaveDate = await fetchLastSaveData();
                setLastSaveDate(lastSaveDate["time"]);

                // function to save the card details to db
                let updateData = await CardSave(changedData);
                if (updateData) {
                    //setting saving as false after the data has been successfully updated in the DB
                    setSaving(false);
                }
            }
        }, intervalTime);

        return () => clearInterval(interval); // This is the unmount feature which is used to clear the interval to prevent memory leaks.
    }, [items]);

    // Mapping images to card Types (NOT USING RIGHT NOW - using the images for the database functionality)
    // const mappedImages = cardImageUrls(props.data);

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
                                        // imgUrl={mappedImages[element.type]}
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

        // Source Position is calculated based on the position of the source item which we are moving
        // so for calculating its position we need the row length of the previous array
        // we need the previous row length so that we can multiply it with the items RowIndex and adding the index of that element
        // we will get the source position for ex. if we are moving first element from second row so its row index will be 1
        // and column index will be 0 but in the array of data its position will be 4 and index 3 as first row will contain 3 items
        // so we will need the previous row length to calculate this so we can get
        // 3(previous row items length) + 1(current element comes first in second row)
        let sourcePreviousRowLength =
            rowSplittedData[
                sourceRowIndex > 0 ? sourceRowIndex - 1 : sourceRowIndex
            ].length;
        let destinationPreviousRowLength =
            rowSplittedData[
                destinationRowIndex > 0
                    ? destinationRowIndex - 1
                    : destinationRowIndex
            ].length;
        let sourcePosition =
            sourceRowIndex * sourcePreviousRowLength + sourceIndex;
        let destinationPosition =
            destinationRowIndex * destinationPreviousRowLength +
            destinationIndex;
        console.log(`Source Item (${sourceIndex},${sourceRowIndex})`);
        console.log(
            `Destination Item (${destinationIndex},${destinationRowIndex})`
        );
        console.log(
            `sourcePosition ${sourcePosition} , destinationPosition - ${destinationPosition}`
        );

        //There's an edge case where if we drag an element to the edge of the other row where
        // there are only 2 element then the destination position will get an extra 1 index
        // so to fix that we need this below if condition
        if (destinationPosition >= props.data.length) {
            destinationPosition -= 1;
        }
        // Calculating the newstate and updating the position of every element in datalist
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
        });
        updateItems(newState);
    };

    return (
        // Creating a Container For the Data
        <Container maxWidth="md">
            {/* A backdrop with loader to be shown only when saving is on */}
            <LoaderBackdrop
                style={{ display: saving ? "flex" : "none" }}
                lastSaveDate={lastSaveDate}
            />
            {/* adding the drag and drop functionality with a */}
            {/* onDragEnd event listener to run a function to save state  */}
            {/* whenever we drag and drop the element somewhere */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {content}
            </DragDropContext>
        </Container>
    );
};

export default Cards;
