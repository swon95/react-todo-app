import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
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

    const TodoItemList = (props) => {
        const todoList = props.todoItemList.map((todoItem, index) => {
            return <li key={index}>{todoItem.todoItemContent}</li>;
        });
        return (
            <>
                <ul>{todoList}</ul>
            </>
        );
    };

    return (
        <div className="App">
            <TodoItemInputField
                onSubmit={(input) => {
                    console.log(input);
                }}
            />
            <TodoItemList
                todoItemList={[
                    {
                        todoItemContent: "오늘 할일",
                    },
                ]}
            />
        </div>
    );
}

export default App;
