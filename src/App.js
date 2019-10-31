import React from "react";
import "./todolist.scss";
import "./commentApp.scss";
import { HashRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
    return (
        <HashRouter>
            <NavBar />
        </HashRouter>
    );
}

export default App;
