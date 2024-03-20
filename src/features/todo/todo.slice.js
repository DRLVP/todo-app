import { createSlice, nanoid } from "@reduxjs/toolkit";

const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
};

const getFromLocalStorage = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return undefined;
    }
};


const initialState = {
    todos: getFromLocalStorage("todos") || []
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            const todo = {
                id : nanoid(),
                text:action.payload,
                isCompleted:false
            }
            state.todos.push(todo)
            saveToLocalStorage("todos", state.todos)
        },
        toggleComplete:(state, action)=>{
            state.todos.map(todo=> todo.id === action.payload?(todo.isCompleted = !todo.isCompleted):todo)
            saveToLocalStorage("todos", state.todos)
        },
        deleteTodo:(state, action)=>{
             state.todos=state.todos.filter(todo => todo.id !== action.payload)
             saveToLocalStorage("todos", state.todos)
        },
        editTodo:(state, action)=> {
            const {id, newText} = action.payload
            state.todos = state.todos.map(todo=> todo.id === id?{...todo, text: newText}:todo)
            saveToLocalStorage("todos", state.todos)
        }
    }
})

// Action Creators
export const {addTodo,deleteTodo,toggleComplete, editTodo}=todoSlice.actions;

// export all reducers
export default todoSlice.reducer;