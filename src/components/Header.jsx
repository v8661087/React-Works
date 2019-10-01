import React from "react";

function Header(props) {
    return (
        <div className="header">
            <h1>To-Do List</h1>
            <input
                className="header__input"
                type="text"
                onKeyUp={props.onKeyUp}
                onChange={props.onChange}
                value={props.input}
                placeholder="type something..."
            />
            <input
                className="header__submit"
                type="submit"
                value="ADD"
                onClick={props.onAdd}
            />
        </div>
    );
}

export default Header;
