import React from "react";
import { Link, Route } from "react-router-dom";
import Home from './Home'
import ToDoList from "./todolist/ToDoList";
import CommentApp from "./commentapp/CommentApp";
import WeatherApp from "./weather/WeatherApp";
import Login from "./commentapp/Login";
import SignUp from "./commentapp/SignUp";
import { AuthProvider } from "./commentapp/Auth";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/To-Do-List">To-Do-List</Link>
        </li>
        <li>
          <Link to="/CommentApp">CommentApp</Link>
        </li>
        <li>
          <Link to="/WeatherApp">WeatherApp</Link>
        </li></ul>
      </div>
      <div className="container">
        <Route exact path="/" component={Home} />
      <Route path="/To-Do-List" component={ToDoList} />
      <AuthProvider>
        <Route exact path="/CommentApp" component={CommentApp} />
        <Route path="/CommentApp/Login" component={Login} />
        <Route path="/CommentApp/SignUp" component={SignUp} />
      </AuthProvider>
      <Route path="/WeatherApp" component={WeatherApp} />
      </div>
      
    </>
  );
};
export default NavBar;
