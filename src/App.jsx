import "./App.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    deleteDoc,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN8D6VszDUlCYfG9rObCyGAJX8lYfWYwg",
    authDomain: "react-todo-app-4c719.firebaseapp.com",
    projectId: "react-todo-app-4c719",
    storageBucket: "react-todo-app-4c719.appspot.com",
    messagingSenderId: "117732183503",
    appId: "1:117732183503:web:e41723cc77365ac6ee56ba",
    measurementId: "G-7XK39XPERP",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

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

    // 함수 호출 시  => firestore 에 들어있는 정보를 가져와 state 를 init 해주는 함수
    const syncTodoItemListStateWithFireStore = () => {
        const sortingData = query(
            collection(db, "todoItem"),
            orderBy("createdAt", "asc") // 역순정렬
        );
        getDocs(sortingData).then((querySnapshot) => {
            const firestoreTodoItemList = [];
            querySnapshot.forEach((doc) => {
                firestoreTodoItemList.push({
                    id: doc.id,
                    todoItemContent: doc.data().todoItemContent,
                    isFinished: doc.data().isFinished,
                    createdAt: doc.data().createdAt ?? 0,
                });
            });
            setTodoItemList(firestoreTodoItemList);
        });
    };

    useEffect(() => {
        syncTodoItemListStateWithFireStore();
    }, []);

    // firebase connect & write
    const newSubmit = async (newTodoItem) => {
        // create Field
        await addDoc(collection(db, "todoItem"), {
            todoItemContent: newTodoItem,
            isFinished: false,
            createdAt: Math.floor(Date.now() / 1000), // 초 단위
        });
        // update State
        syncTodoItemListStateWithFireStore();
    };

    const onTodoItemClick = async (clickedTodoItem) => {
        // finished todoItem update
        const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
        await setDoc(
            todoItemRef,
            { isFinished: !clickedTodoItem.isFinished },
            { merge: true }
        );

        syncTodoItemListStateWithFireStore();
    };

    const onRemoveClick = async (removedTodoItem) => {
        // Remove todoItem update
        const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
        await deleteDoc(todoItemRef);

        syncTodoItemListStateWithFireStore();
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
