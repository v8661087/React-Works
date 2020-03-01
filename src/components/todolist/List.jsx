import React from "react";

function List(props) {
  return (
    <div className="list">
      <ul>
        {props.items.map((item, index) => (
          <li
            className={
              item.done ? "list-item checked" : "list-item" //是否完成
            }
            key={index}
          >
            <span
              className="list-item__done"
              onClick={() => props.onCheck(item)}
            ></span>
            {item.modify ? (
              <input
                type="text"
                className="list-item__input"
                autoFocus
                value={props.itemInput}
                onChange={props.onItemChange}
                onKeyUp={props.onItemKeyUp}
                onBlur={() => props.onModifyDone(item)}
              />
            ) : item.done ? (
              <span className="list-item-title check">
                {index + 1}. {item.title}
              </span>
            ) : (
              <span
                className="list-item-title"
                onClick={() => props.onModify(item)}
              >
                {index + 1}. {item.title}
              </span>
            )}
            <span
              className="list-item__delete"
              onClick={() => props.onDelete(item)}
            >
              x
            </span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
