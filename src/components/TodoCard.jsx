import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {deleteTodo, editTodo, toggleComplete} from "../features/todo/todo.slice"
import { XCircle, PencilFill, Floppy } from 'react-bootstrap-icons'

const TodoCard = () => {
    const [isEditTodo, setIsEditTodo] = useState(false)
    const [newText, setNewText] = useState("")
    const [editTodoId, setEditTodoId] = useState(null)

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    const deleteTodoHandler = (id)=>{
        dispatch(deleteTodo(id))
    }

    const toggleCompleteHandler = (id)=>{
        dispatch(toggleComplete(id))
    }

    const updateTodoHandler = (id, newTodo) =>{
        setIsEditTodo(false);
        setEditTodoId(null)
        dispatch(editTodo({id, newText:newTodo}))
        
    }

    const startTodoEditing = (todo)=>{
        setIsEditTodo(true);
        setNewText(todo.text);
        setEditTodoId(todo.id);
    }


  return (
    <div className="w-full flex flex-col justify-center gap-4">
        {
            todos.map((todo)=>(
                <div className="h-12 bg-slate-300 flex justify-between items-center px-4 rounded-sm shadow-xl" key={todo.id}>
                    <input 
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={()=> toggleCompleteHandler(todo.id)}
                    className="cursor-pointer text-2xl bg-purple-600"
                    />
                   {
                        isEditTodo && editTodoId === todo.id ?(
                        <input
                        type="text"
                        value={newText}
                        onChange={(e)=> setNewText(e.target.value)}
                        className="outline-none h-full bg-transparent text-2xl font-bold"
                        />
                    ):(
                        <span
                        className={todo.isCompleted?"line-through text-2xl font-bold":"text-2xl font-bold"}
                        >{todo.text}</span>
                    )
                   }
                   <div className="flex gap-4">
                   {
                       isEditTodo && editTodoId === todo.id?(
                        <button 
                        onClick={()=> updateTodoHandler(todo.id, newText)}

                        >
                            <Floppy className='font-bold'/>
                        </button>
                       ):(
                        <button onClick={()=> startTodoEditing(todo)}>
                            <PencilFill className='font-bold' />
                        </button>
                       )
                    }
                    <button 
                    onClick={()=> deleteTodoHandler(todo.id)}
                    >
                        <XCircle className='font-bold'/>
                    </button>
                   </div>
                    
                </div>
            ))
        }
    </div>
  )
}

export default TodoCard