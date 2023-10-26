// import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import TodoItemInputField from "./components/TodoItemInputField";
import TodoItemList from "./components/TodoItemList";
import Container from "@mui/material/Container";
import {
    syncTodoItemListStateWithFireStore,
    newSubmit,
    onTodoItemClick,
    onRemoveClick,
} from "./utils/firestore";
import { auth, onAuthStateChanged } from "./utils/auth";

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
        <>
            <div className="App">
                <Header currentUser={currentUser} />

                <Container>
                    <TodoItemInputField onSubmit={newSubmit} />
                    <TodoItemList
                        todoItemList={todoItemList}
                        onTodoItemClick={onTodoItemClick}
                        onRemoveClick={onRemoveClick}
                    />
                </Container>
            </div>
            <div className="text-3xl font-bold text-blue-600">asdd</div>
        </>
    );
}

export default App;
