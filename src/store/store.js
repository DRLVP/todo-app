import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todo.slice";

const store = configureStore({
    reducer:todoSlice
    
})

export default store;