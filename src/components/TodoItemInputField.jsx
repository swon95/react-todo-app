import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const TodoItemInputField = (props) => {
    const [input, setInput] = useState("");
    // console.log(input);

    const onSubmit = () => {
        // TodoItemInputField 컴포넌트에서 사용하는 input 을 props
        props.onSubmit(input);
        setInput("");
    };
    return (
        <Box sx={{ margin: "auto" }}>
            <Stack direction="row" spacing={2} justifyContent="center">
                <TextField
                    id="todo-item-input"
                    label="Todo Item"
                    variant="outlined"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <Button variant="outlined" onClick={onSubmit}>
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default TodoItemInputField;
