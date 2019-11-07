import React from "react";
import "./todolist.scss";
import "./commentApp.scss";
import { HashRouter} from "react-router-dom";
import NavBar from "./components/NavBar";

console.log("更新日期 191107 20:52")

function App() {
    return (
        <HashRouter>
            <NavBar />
        </HashRouter>
    );
}

export default App;
