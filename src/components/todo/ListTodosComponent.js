import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTodoByIdApi, retrieveAllTodosByUsernameApi } from "./api/TodosApiService";
import { useAuth } from "./Security/AuthContext";

//Todos Component
function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay())

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    //for updating the todo list this state will use.
    const [todos, setTodos] = useState([])
    //after delete the todo this state will be update each time.
    const [message, setMessage] = useState(null)

    //it's render the given data every time when app will be start.
    useEffect(() => refreshTodos())

    //Getting All Todos For Perticular User.Also For Refresh The Todo List.
    function refreshTodos() {
        retrieveAllTodosByUsernameApi(username)
            .then((response) => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    //delete the todo by perticular id.
    function deleteTodo(id) {
        deleteTodoByIdApi(username, id)
            .then(() => {
                setMessage(`Delete of todo with id ${id} successfull.`)
                refreshTodos()
            })
            .catch(() => console.log("error"))
    }

    //update the todo by perticular id.
    function updateTodo(id) {
        console.log("clicked: " + id);
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate("/todo/-1")
    }

    //This part will be display on browser.
    return (
        <div className="container">
            <h1>Things You Want To Do!!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={addNewTodo}>Add Todo</button>
            </div>
        </div>
    )
}

export default ListTodosComponent;