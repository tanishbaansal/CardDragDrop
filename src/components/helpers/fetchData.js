import { useState, useEffect } from "react";

const FetchData = async () => {
    let [data, setData] = useState(null);

    // 3. Create out useEffect function
    useEffect(() => {
        fetch("http://localhost:8080/data").then((response) => {
            console.log(`Response is ${response.json()}`);
            setData(response.json());
        });
    }, []);
    console.log(`Data is - ${data}`);
    return data;
};

export default FetchData;
