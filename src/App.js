import Cards from "./components/cards";
import FetchData from "./components/helpers/fetchData";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
const App = () => {
    const [data, setData] = useState(undefined);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/data");
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (data === undefined) {
        return (
            <>
                <CircularProgress />
                Fetching Data From Api
            </>
        );
    }

    console.log(`Data is - ${JSON.stringify(data)}`);

    return <Cards data={data} />;
};

export default App;
