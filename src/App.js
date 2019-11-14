import React from "react";
import "./todolist.scss";
import "./commentApp.scss";
import { HashRouter} from "react-router-dom";
import NavBar from "./components/NavBar";

console.log("191114 1517")

function App() {
    return (
        <HashRouter>
            <NavBar />
        </HashRouter>
    );
}

export default App;
