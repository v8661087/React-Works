import React, { useState, useEffect } from "react";
import Header from "./Header";
import List from "./List";
function ToDoList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState("");
  // 生命週期 componentDidMount
  useEffect(() => {
    if (localStorage.getItem("items-list")) {
      const list = JSON.parse(localStorage.getItem("items-list"));
      setItems(list);
    } else {
      localStorage.setItem("items-list", JSON.stringify(items));
    }
  }, []);
  // 生命週期 componentDidUpdate
  useEffect(() => {
    localStorage.setItem("items-list", JSON.stringify(items));
  }, [items, handleAdd]);
  // Header
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
  function handleKeyUp(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleAdd();
    }
  }
  // List
  function itemCheck(item) {
    item.done = !item.done;
    setItems(items.map(item => item));
  }
  function itemModify(item) {
    item.modify = true;
    setItemInput(item.title);
  }
  function itemModifyDone(item) {
    if (itemInput !== "") {
      item.modify = false;
      item.title = itemInput;
    } else {
      item.modify = false;
    }
    setItems(items.map(item => item));
    setItemInput("");
  }
  function itemChange(e) {
    setItemInput(e.target.value);
  }
  function itemDelete(item) {
    setItems(items.filter(i => i !== item));
  }
  function itemKeyUp(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      let index = items.findIndex(item => item.modify === true);
      items[index].modify = false;
      setItems(items.map(item => item));
      setItemInput("");
    }
  }
  return (
    <>
      <Header
        onAdd={handleAdd}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        input={input}
      />
      <List
        onCheck={itemCheck}
        onModify={itemModify}
        onModifyDone={itemModifyDone}
        onDelete={itemDelete}
        items={items}
        itemInput={itemInput}
        onItemChange={itemChange}
        onItemKeyUp={itemKeyUp}
      />
    </>
  );
}

export default ToDoList;
