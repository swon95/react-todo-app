import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

let todoItemId = 0;

const TodoItemInputField = (props) => {
    const [input, setInput] = useState("");
    // console.log(input);

    const onSubmit = () => {
        // TodoItemInputField 컴포넌트에서 사용하는 input 을 props
        props.onSubmit(input);
        setInput("");
    };
    return (
        <>
            <TextField
                id="todo-item-input"
                label="Todo Item"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="outlined" onClick={onSubmit}>
                Submit
            </Button>
        </>
    );
};

const TodoItem = (props) => {
    const check = props.todoItem.isFinished
        ? { textDecoration: "line-through" }
        : {};
    return (
        <li>
            <span
                style={check}
                onClick={() => {
                    props.onTodoItemClick(props.todoItem);
                }}
            >
                {props.todoItem.todoItemContent}
            </span>
            <Button
                variant="outlined"
                onClick={() => props.onRemoveClick(props.todoItem)}
            >
                Remove
            </Button>
        </li>
    );
};

const TodoItemList = (props) => {
    const todoList = props.todoItemList.map((todoItem, index) => {
        return (
            <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                onTodoItemClick={props.onTodoItemClick}
                onRemoveClick={props.onRemoveClick}
            />
        );
    });
    return (
        <>
            <ul>{todoList}</ul>
        </>
    );
};

function App() {
    const [todoItemList, setTodoItemList] = useState([]);

    const newSubmit = (newTodoItem) => {
        setTodoItemList([
            ...todoItemList,
            {
                id: todoItemId++,
                todoItemContent: newTodoItem,
                // 할일이 끝나쓰
                isFinished: false,
            },
        ]);
    };

    const onTodoItemClick = (clickedTodoItem) => {
        setTodoItemList(
            todoItemList.map((todoItem) => {
                if (clickedTodoItem.id === todoItem.id) {
                    return {
                        id: clickedTodoItem.id,
                        todoItemContent: clickedTodoItem.todoItemContent,
                        isFinished: !clickedTodoItem.isFinished,
                    };
                } else {
                    return todoItem;
                }
            })
        );
    };

    const onRemoveClick = (removedTodoItem) => {
        setTodoItemList(
            todoItemList.filter((todoItem) => {
                return todoItem.id !== removedTodoItem.id;
            })
        );
    };

    return (
        <div className="App">
            <TodoItemInputField onSubmit={newSubmit} />
            <TodoItemList
                todoItemList={todoItemList}
                onTodoItemClick={onTodoItemClick}
                onRemoveClick={onRemoveClick}
            />
        </div>
    );
}

export default App;
