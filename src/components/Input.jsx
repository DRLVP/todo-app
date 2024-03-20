import React from "react"
import {addTodo} from "../features/todo/todo.slice"
import { useDispatch } from "react-redux"
export default function Input() {
    const dispatch = useDispatch()
    const [todo, setTodo] = React.useState("")

    const addTodoHandler = (e)=>{
      e.preventDefault()
      if (todo.trim().length > 0) {
        dispatch(addTodo(todo.trim()))
        setTodo("")
      }
    }
  return (
    <div className="w-full border-blue-600 shadow-xl flex justify-between items-center">
        <input 
        type="text"
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
        className="w-3/4 h-10 rounded-sm shadow-lg outline-none px-2 py-1 font-semibold text-[1.2rem]"
        />
        <button
        type="submit"
        onClick={addTodoHandler}
        className="px-4 bg-purple-700 text-white py-2 rounded-sm shadow-lg hover:bg-blue-600 text-[1.2rem] font-semibold"
        >add</button>
    </div>
  )
}

