import Cards from "./components/cards";
import * as React from "react";

function App() {
    const data = [
        { type: "bank-draft", title: "1", position: 0 },
        { type: "bill-of-lading", title: "2", position: 1 },
        { type: "invoice", title: "3", position: 2 },
        { type: "bank-draft-2", title: "4", position: 3 },
        { type: "bill-of-lading-2", title: "5", position: 4 },
    ];
    const imgUrls = [
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
        "https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=1800&q=60",
        "https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=1800&q=60",
        "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=1800&q=60",
    ];
    const mappedImages = {};
    data.forEach((element, index) => {
        mappedImages[element.type] = imgUrls[index];
    });

    return <Cards data={data} images={mappedImages} />;
}

export default App;
