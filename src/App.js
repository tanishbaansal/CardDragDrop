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

    return <Cards data={data} />;
}

export default App;
