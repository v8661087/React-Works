import React from "react";
import { Link, Route } from "react-router-dom";
import ToDoList from "./todolist/ToDoList";
import CommentApp from "./commentapp/CommentApp";
import WeatherApp from "./weather/WeatherApp";
const NavBar = () => {
    return (
        <>
            <div className="NavBar">
                <li>
                    <Link to="To-Do-List">To-Do-List</Link>
                </li>
                <li>
                    <Link to="CommentApp">CommentApp</Link>
                </li>
                <li>
                    <Link to="WeatherApp">WeatherApp</Link>
                </li>
            </div>
            <Route path="/To-Do-List" component={ToDoList} />
            <Route path="/CommentApp" component={CommentApp} />
            <Route path="/WeatherApp" component={WeatherApp} />
        </>
    );
};
export default NavBar;
