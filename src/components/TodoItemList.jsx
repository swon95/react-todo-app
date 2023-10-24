import React from "react";
import TodoItem from "./TodoItem";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

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
        <Box>
            <List sx={{ margin: "auto", maxWidth: 720 }}>{todoList}</List>
        </Box>
    );
};

export default TodoItemList;
