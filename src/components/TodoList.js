// export default function TodoList(props){
//     return(
//         <div className="todoListContainer">
//             To do List 
//         </div>
//     )
// }


import Todo from "./Todo"

export default function TodoList(
{
    todos,
    foundTodo,
    newTodo,
    handleChange,
    completeTodo, 
    createTodo, 
    updateTodo,
    deleteTodo
}
)

{
    return (
                <>
                    <h1>Create Todo</h1>
                    <input
                        type="text"
                        onKeyDown={(e) => {
                            e.key === "Enter" && newTodo(e)
                        }}
                    />
                    {todos.length ? (
                        <>
                            <h1>Todo Items</h1>
                            <ul className="todolist">
                                {todos
                                    .filter((i) => !i.completed)
                                    .map((todo) => {
                                        return (
                                            <Todo
                                                key={todo.id}
                                                todo={todo}
                                                completeTodo={completeTodo}
                                                updateTodo={updateTodo}
                                                deleteTodo={deleteTodo}
                                            />
                                        )
                                    })}
                            </ul>
                            <h1>Completed Items </h1>
                            <ul className="todolist">
                                {todos
                                    .filter((i) => i.completed)
                                    .map((todo) => {
                                        return (
                                            <Todo
                                                key={todo.id}
                                                todo={todo}
                                                completeTodo={completeTodo}
                                                updateTodo={updateTodo}
                                                deleteTodo={deleteTodo}
                                            />
                                        )
                                    })}
                            </ul>
                        </>
                    ) : (
                        <h1>No Todos Added Yet</h1>
                    )}
                </>
            )
}