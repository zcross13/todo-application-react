import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'

export default function App(props) {
    // const [showInput, setShowInput] = useState(false)
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    // const [foundTodo, setFoundTodo] = useState(null)
    const [newTodo, setNewTodo] = useState({
        title: '',
        completed: false,
    })
    // index
    const getTodos = async () => {
        try {
            const response = await fetch('/api/todos')
            const foundTodo = await response.json()
            setTodos(foundTodo.reverse()) // put newest todo at the top 
            const responseTwo = await fetch('/api/todos/completed')
            const foundCompletedTodo = await responseTwo.json()
            setCompletedTodos(foundCompletedTodo.reverse())
        } catch (error) {
            console.error(error)
        }
    }
    // delete
    const deleteTodo = async (id) => {
        try {
            const index = completedTodos.findIndex((todo) => todo._id === id) //tell you where to find the todo in this list 
            const completedTodosCopy = [...completedTodos] // make a copy to update the state 
            const response = await fetch(`/api/todos/${id}`,{ // api request 
                method: "DELETE", 
                headers: {
                    'Content-Type':'application/json'
                }, 
            })
            await response.json() // await but not saving it because we dont need it 
            completedTodosCopy.splice(index, 1) // splice from the index and remove it 
            setCompletedTodos(completedTodosCopy) // update the new array without this item 
        } catch (error) {
            console.error(error)
        }
    }
    const moveToCompleted = async (id) => { //id we passed in 
        try{
            const index = todos.findIndex((todo) => todo._id === id) //tell you where to find the todo in this list 
            const todosCopy = [...todos] // make a copy to update the state 
            const subject = todosCopy[index] //saving the todo found inside of subject 
            subject.completed = true // set property equal to true 
            const response = await fetch(`/api/todos/${id}`,{ // api request 
                method: "PUT", 
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify(subject)
            })
            const updatedTodo = await response.json() 
            const completedTDSCopy = [updatedTodo, ...completedTodos] // make a copy of complete todo  and add update todo 
            setCompletedTodos(completedTDSCopy) // set it  
            todosCopy.splice(index, 1) //splice out old todo 
            setTodos(todosCopy) // set new todo 
        }catch(error){
            console.error(error)
        }
    }
    // // update
    // const updateTodo = async (id, updatedTodo) => {
    //     try {
    //         const response = await fetch(`/api/todos/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ ...updatedTodo })
    //         })
    //         const data = await response.json()
    //         setFoundTodo(data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    // createTodos
    const createTodo = async () => {
        const body = {...newTodo}
        try{
            const response = await fetch('/api/todos', {
                method:"POST", 
                headers: {
                    'Content-type':'application/json'
                }, 
                body: JSON.stringify(body)
            })
            const createdTodo = await response.json()
            const todosCopy = [createdTodo, ...todos]
            setTodos(todosCopy)
            setNewTodo({
                title:'',
                completed: false
            })
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    
    return(
        <>
        Add Todo<input type='text' 
        value={newTodo.title} 
        onChange={(e) => {setNewTodo({...newTodo, title:e.target.value})}} 
        onKeyDown={(e) => e.key === 'Enter' && createTodo()}/>

        <h3>Todos</h3>
        {todos.map(todo => {
            return(
                    <div key={todo.id}>{todo.title} 
                    <button onClick={() => moveToCompleted(todo._id)}>Complete</button>
                    </div>
                )
                })
            }
        <h3>Completed Todos</h3>
        {completedTodos.map(todo => {
            return(
                    <div key={todo.id}>{todo.title} 
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </div>
                )
                })
            }
        </>

    )
}

// const createTodo = async () => {
    //     try {
    //         const response = await fetch('/api/todos', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ ...newTodo })
    //         })
    //         const data = await response.json()
    //         setFoundTodo(data)
    //         setNewTodo({
    //             text: '',
    //             completed: false,
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const completeTodo = (id, e) => {
    //     const todosCopy = [...todos]
    //     const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
    //     todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    //     setTodos([...todosCopy])
    //   }

    // const handleChange = (evt) => {
    //     setNewTodo({ ...newTodo, [evt.target.name]: evt.target.value })
    // }

  


    // return (
    //     <>
    //         {
    //             todos && todos.length ? (<ul>
    //                 {
    //                     todos.map((todo) => {
    //                         return (
    //                             <li>
    //                                     <h2
    //                                         onClick={(e) => {
    //                                             setShowInput(!showInput)
    //                                         }}
    //                                     >
    //                                         {todo.text}
    //                                     </h2>
    //                                     <input
    //                                         style={{ display: showInput ? "block" : "none" }}
    //                                         type="text"
    //                                         onKeyDown={(e) => {
    //                                             if (e.key === "Enter") {
    //                                                 updateTodo(todo.id, e)
    //                                                 setShowInput(false)
    //                                             }
    //                                         }}
    //                                     />
    //                                 <label className="middle">
    //                                     Complete
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={todo.completed}
    //                                         onChange={(e) => {
    //                                             completeTodo(todo.id, e)
    //                                         }}
    //                                     />
    //                                 </label>
    //                                 <button
    //                                     checked={todo.completed}
    //                                     onClick={(e) => {
    //                                         deleteTodo(todo.id)
    //                                     }}
    //                                 >
    //                                     Delete Todo
    //                                 </button>
    //                             </li>
    //                         )
    //                     })
    //                 }
    //             </ul>) : <h1>No Todo Yet Add One Below</h1>
    //         }
    //         {'Text '}<input value={newTodo.text} onChange={handleChange} name="text"></input><br />
    //         {/* {'Completed '}<input type="checkbox" checked={newTodo.completed} onChange={(evt) => setNewTodo({ ...newTodo, completed: evt.target.checked })}></input><br /> */}
    //         <button onClick={() => createTodo()}>Create A New To Do</button>
    //         {
    //             foundTodo ? <div>
    //                 <h1>{foundTodo.text}</h1>
    //                 <h3>{foundTodo.completed ? 'I am ready' : 'I am not ready'}</h3>
    //             </div> : <>No To Do Found in To Do State</>
    //         }
    //     </>
    // )

            // <TodoList 
        // todos = {todos}
        // foundTodo = {foundTodo}
        // newTodo =  {newTodo}
        // handleChange = {handleChange}
        // completeTodo = {completeTodo} 
        // createTodo={createTodo}
        // updateTodo={updateTodo}
        // deleteTodo={deleteTodo}/>






