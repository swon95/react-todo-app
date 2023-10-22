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
            <div>
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
            </div>
        );
    };

    return (
        <div className="App">
            <TodoItemInputField
                onSubmit={(input) => {
                    console.log(input);
                }}
            />
        </div>
    );
}

export default App;
