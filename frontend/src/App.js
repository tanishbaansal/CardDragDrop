import Cards from "./components/cards";
import { useState, useEffect } from "react";
import { fetchData } from "./utils/extraUtils/fetchData";
import Loader from "./utils/extraUtils/loader";

const App = () => {
    const [data, setData] = useState(undefined);
    const callFetchData = async () => {
        setData(await fetchData());
    };

    //Fetching data from DB once the page renders
    useEffect(() => {
        callFetchData();
    }, []);

    // Function to check if the data is fetched from the API endpoint or not
    // and if not then show a loading animation
    if (data === undefined) {
        return (
            <Loader
                extraStyles={{
                    display: "flex",
                    width: "100vw",
                    height: "80vh",
                    flexFlow: "column",
                }}
            />
        );
    }

    return <Cards data={data} />;
};

export default App;
