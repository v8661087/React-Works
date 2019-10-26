import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div>
            <nav>
                <li>
                    <Link to="To-Do-List">To-Do-List</Link>
                </li>
                <li>
                    <Link to="CommentApp">CommentApp</Link>
                </li>
            </nav>
        </div>
    );
};
export default NavBar;
