import { useEffect, useState } from 'react'
import instance from './api/axios'
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
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
        <>
            <Box sx={{ maxWidth: 500, mt: 4, p: 2, boxShadow: 3, borderRadius: 2, mb: 2 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Todo App
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 4,mt:4 }}>
                    <TextField label="Enter you tasks" variant="outlined" value={title} onChange={handleTitleChange} />
                    <Button variant='contained' onClick={createTodo}>Add Todo</Button>
                </Box>
                {
                    todos.map((todo, id) => (
                        <Stack
                            key={todo.id}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1, mb: 1 }}
                        >
                            <Typography>{todo.title}</Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </Button>
                        </Stack>

                    ))
                }
            </Box>
        </>
    )
}

export default Todo
