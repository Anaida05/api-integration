import React, { useEffect, useState } from 'react'
import instance from './api/axios'
import { resolvePath } from 'react-router-dom'
import axios from 'axios'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')

    const fetchTodos = async () => {
        try {
            const response = await instance.get("/todos?_limit=5")
            setTodos(response.data)
        } catch (error) {
            console.log("Error getting todos", error)
        }
    }

    const createTodo = async () => {
        try {
            const response = await instance.post("/todos", {
                title,
                completed: true
            })
            setTodos(prev => [...prev, response.data])
            setTitle("")
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const deleteTodo = async (id) => {
        try {
            await instance.delete(`/todos/${id}`)
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (error) {
            console.log('error occured : ', error);
        }
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    return (
        <div>
            <input type="text" placeholder='Enter todo' value={title} onChange={handleTitleChange} /><br />
            <button onClick={createTodo}>Add Todo</button>
            <ul>{
                todos.map((todo, id) => (
                    <li key={id} style={{listStyle:"none"}}>
                        <p>{todo.title}</p>
                        <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))
            }</ul>
        </div>
    )
}

export default Todo
