import { useState, useEffect } from 'react'

export default function FruitsPage (props){
    const [todos, setTodos] = useState([])
    const [foundTodo, setFoundTodo] = useState(null)
    const [newTodo, setNewTodo] = useState({
        text: '',
        completed: false,
    })
    // index
    const getTodos = async () => {
        try {
            const response = await fetch('/api/todos')
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundTodo(data)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateTodo = async (id, updatedTodo) => {
        try {
            const response = await fetch(`/api/fruits/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedTodo})
            })
            const data = await response.json()
            setFoundTodo(data)
        } catch (error) {
            console.error(error)
        }
    }
    // create
        const createdTodo = async () => {
            try {
                const response = await fetch('/api/todos', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newTodo})
                })
                const data = await response.json()
                setFoundTodo(data)
                setNewTodo({
                    text: '',
                    completed: false, 
                })
            } catch (error) {
                console.error(error)
            }
        }

    const handleChange = (evt) => {
        setNewTodo({...newTodo, [evt.target.name]: evt.target.value})
    }

    useEffect(()=> {
        getTodos()
    }, [foundTodo])

    return (
        <>
            {
                todos && todos.length ? (<ul>
                    {
                        todos.map((todo) => {
                            return (
                                <li key={todo._id}>
                                    {todo.text}  {todo.completed? 'completed' : ' not completed'}
                                    <br/><button onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>): <h1>No Todo Yet Add One Below</h1>
            }
            {'Text '}<input value={newTodo.text} onChange={handleChange} name="text"></input><br/>
            {'Completed'}<input value={newTodo.completed} onChange={handleChange} name="completed"></input><br/>
            {'Completed '}<input type="checkbox" checked={newTodo.completed} onChange={(evt) => setNewTodo({...newTodo, completed: evt.target.checked })}></input><br/>
            <button onClick={() => createdTodo() }>Create A New To Do</button>
            {
                foundTodo? <div>
                    <h1>{foundTodo.text}</h1>
                    <h3>{foundTodo.completed? 'I am ready': 'I am not ready'}</h3>
                </div>: <>No To Do Found in To Do State</>
            }
        </>
    )
}







