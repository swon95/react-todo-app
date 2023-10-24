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
    where,
} from "firebase/firestore";
import app from "./firebaseApp";

const db = getFirestore(app);

// 함수 호출 시  => firestore 에 들어있는 정보를 가져와 state 를 init 해주는 함수
export const syncTodoItemListStateWithFireStore = (
    currentUser,
    setTodoItemList
) => {
    const sortingData = query(
        collection(db, "todoItem"),
        where("userId", "==", currentUser),
        orderBy("createdTime", "desc")
    ); // 역순정렬
    getDocs(sortingData).then((querySnapshot) => {
        const firestoreTodoItemList = [];
        querySnapshot.forEach((doc) => {
            firestoreTodoItemList.push({
                id: doc.id,
                todoItemContent: doc.data().todoItemContent,
                isFinished: doc.data().isFinished,
                createdTime: doc.data().createdTime ?? 0,
                userId: doc.data().userId,
            });
        });
        setTodoItemList(firestoreTodoItemList);
    });
};

// firebase connect & write
export const newSubmit = async (newTodoItem, currentUser) => {
    // create Field
    await addDoc(collection(db, "todoItem"), {
        todoItemContent: newTodoItem,
        isFinished: false,
        createdTime: Math.floor(Date.now() / 1000), // 초 단위
        userId: currentUser,
    });
    // update State
    syncTodoItemListStateWithFireStore(currentUser);
};

export const onTodoItemClick = async (clickedTodoItem) => {
    // finished todoItem update
    const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
    await setDoc(
        todoItemRef,
        { isFinished: !clickedTodoItem.isFinished },
        { merge: true }
    );

    syncTodoItemListStateWithFireStore();
};

export const onRemoveClick = async (removedTodoItem) => {
    // Remove todoItem update
    const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
    await deleteDoc(todoItemRef);

    syncTodoItemListStateWithFireStore();
};
