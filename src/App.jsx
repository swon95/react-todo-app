import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function App() {
    const TodoItemInputField = (props) => {
        return (
            <div>
                <TextField />
            </div>
        );
    };

    return (
        <div className="App">
            <TodoItemInputField />
        </div>
    );
}

export default App;
