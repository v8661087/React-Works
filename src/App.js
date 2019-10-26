import React from "react";
import "./todolist.scss";
import ToDoList from "./components/todolist/ToDoList";
import CommentApp from "./components/commentapp/CommentApp";
import "./commentApp.scss";
import { HashRouter,Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
    return (
        <HashRouter>
            <NavBar />
            <Route path="/To-Do-List" component={ToDoList} />
            <Route path="/CommentApp" component={CommentApp} />
        </HashRouter>
    );
}

export default App;
