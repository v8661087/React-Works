import React from "react";
import "./css/app.scss";
import { HashRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
console.log("191227 1607")

function App() {
    return (
        <HashRouter>
            <NavBar />
        </HashRouter>
    );
}

export default App;
