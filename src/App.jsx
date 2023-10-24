import "./App.css";
import { useState, useEffect } from "react";
import TodoItemInputField from "./components/TodoItemInputField";
import TodoItemList from "./components/TodoItemList";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AppBar, Toolbar, Typography } from "@mui/material";
import {
    provider,
    auth,
    signInWithRedirect,
    onAuthStateChanged,
    signOut,
} from "./utils/auth";
import {
    syncTodoItemListStateWithFireStore,
    newSubmit,
    onTodoItemClick,
    onRemoveClick,
} from "./utils/firestore";

// ui
const TodoListAppBar = (props) => {
    const loginWithGoogleButton = (
        <Button
            color="inherit"
            onClick={() => {
                signInWithRedirect(auth, provider);
            }}
        >
            Login with Google
        </Button>
    );
    const logoutButton = (
        <Button
            color="inherit"
            onClick={() => {
                signOut(auth);
            }}
        >
            Log out
        </Button>
    );

    const button =
        props.currentUser === null ? loginWithGoogleButton : logoutButton;

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: "100%", maxWidth: 720, margin: "auto" }}>
                <Typography variant="h6" component="div">
                    Todo List App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {button}
            </Toolbar>
        </AppBar>
    );
};

function App() {
    const [todoItemList, setTodoItemList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // State 가 바뀔 때 함수 호출
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user.uid);
        } else {
            setCurrentUser(null);
        }
    });

    useEffect(() => {
        if (currentUser) {
            syncTodoItemListStateWithFireStore(currentUser, setTodoItemList);
        }
    }, [currentUser]);

    return (
        <div className="App">
            <TodoListAppBar currentUser={currentUser} />

            <Container>
                <TodoItemInputField onSubmit={newSubmit} />
                <TodoItemList
                    todoItemList={todoItemList}
                    onTodoItemClick={onTodoItemClick}
                    onRemoveClick={onRemoveClick}
                />
            </Container>
        </div>
    );
}

export default App;
