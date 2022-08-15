import axios from "axios";

// Function to get the latest data from the DB
export const fetchData = async () => {
    const response = await fetch("http://localhost:8080/data");
    const data = await response.json();
    return data;
};

// Function to get the last save Date when the update function saved data to DB
export const fetchLastSaveData = async () => {
    const response = await fetch("http://localhost:8080/getlastsavedata");
    const data = await response.json();
    return data;
};

// Function to update the data when an element is moved and its position is updated
export const updateData = async (element) => {
    const data = {
        type: element.type,
        position: element.position,
    };

    axios
        .put("http://localhost:8080/updatedata", data)
        .then((res) => {
            console.log(`Status: ${res.status}`);
        })
        .catch((err) => {
            console.error(err);
        });
};
