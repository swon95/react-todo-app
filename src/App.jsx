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
    return (
        <li>
            <span>{props.todoItem.todoItemContent}</span>
        </li>
    );
};

const TodoItemList = (props) => {
    const todoList = props.todoItemList.map((todoItem, index) => {
        return <TodoItem key={todoItem.id} todoItem={todoItem} />;
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
                isFinished: false,
            },
        ]);
    };
    return (
        <div className="App">
            <TodoItemInputField onSubmit={newSubmit} />
            <TodoItemList todoItemList={todoItemList} />
        </div>
    );
}

export default App;
