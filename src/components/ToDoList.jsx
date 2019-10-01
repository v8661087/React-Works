import React, { useState, useEffect } from "react";
import Header from "./Header";
import List from "./List";
function ToDoList() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);
    const [itemInput, setItemInput] = useState("");
    useEffect(() => {
        if (localStorage.getItem("items-list")) {
            const list = JSON.parse(localStorage.getItem("items-list"));
            setItems(list);
        } else {
            localStorage.setItem("items-list", JSON.stringify(items));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("items-list", JSON.stringify(items));
    }, [items, handleAdd]);
    function handleChange(e) {
        setInput(e.target.value);
    }
    function handleAdd(e) {
        if (input !== "") {
            let item = { title: input, done: false, modify: false };
            items.push(item);
            setItems(items);
            setInput("");
        } else {
            e.target.previousSibling.focus();
        }
    }
    function handleCheck(item) {
        item.done = !item.done;
        setItems(items.map(item => item));
    }
    function handleModify(item) {
        if (item.modify === false) {
            item.modify = true;
            setItemInput(item.title);
            setItems(items.map(item => item));
        }
    }
    function handleModifyDone(item) {
        if (itemInput !== "") {
            if (item.modify === true) {
                item.modify = false;
                item.title = itemInput;
                setItems(items.map(item => item));
                setItemInput("");
            }
        } else {
            item.modify = false;
            setItems(items.map(item => item));
            setItemInput("");
        }
    }
    function handleItemChange(e) {
        setItemInput(e.target.value);
    }
    function handleDelete(item) {
        setItems(items.filter(i => i !== item));
    }
    function handleKeyUp(e) {
        if (e.keyCode === 13 && e.target.value) {
            handleAdd();
        }
    }
    function handleItemKeyUp(e) {
        if (e.keyCode === 13) {
            e.target.nextSibling.click();
        }
    }

    return (
        <React.Fragment>
            <Header
                onAdd={handleAdd}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                input={input}
            />
            <List
                onCheck={handleCheck}
                onModify={handleModify}
                onModifyDone={handleModifyDone}
                onDelete={handleDelete}
                items={items}
                itemInput={itemInput}
                onChangeItem={handleItemChange}
                onItemKeyUp={handleItemKeyUp}
            />
        </React.Fragment>
    );
}

export default ToDoList;
