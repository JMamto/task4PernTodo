import React, {Fragment, useEffect, useState} from "react";

import './style.css';
import './script.js';

import EditTodo from "./EditTodo";

const ListTodos = () => {
    // console.log(uid)


    const [todos, setTodos] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState("");

    //! delete todo function

    const deleteTodo = async(id) => {

        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);

        }
    }


    const getTodos = async() => {
        try {
            const id = await getId()
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()

            setTodos(jsonData.filter(todo => todo.user_id === id || todo.user_id === null));

        

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getId(){
        try {
            
            const response = await fetch('http://localhost:5000/dashboard/',{
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseResponse = await response.json();


            return parseResponse.user_id

        } catch (err) {
            console.error(err.message);
        }
    }



    // const getuTodos = async() => {
    //     try {
    //         console.log(uid);
    //         const body = {uid}
    //         const response = await fetch("http://localhost:5000/utodos", {
    //             method: "POST",
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify(body)  

    //         })
    //         const jsonData = await response.json()
    //         setTodos(jsonData);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }
    
   
    useEffect(() => {
        getTodos();
    }, []);
    //console.log(todos)


    return <Fragment>
    <table className="table">
    <thead>
      <tr>
        <th>Status</th>
        <th>Task</th>
        <th>Description</th>
        <th>Date</th>
        <th> </th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
        {todos.map(todo => (
            <tr key = {todo.todo_id}>
                <td><span>{todo.status}</span></td>
                <td>{todo.todo_name}</td>
                <td>{todo.description}</td>
                <td>{todo.date}</td>
                <td>
                    <EditTodo todo={todo} />
                </td>
                <td>
                    <button className="btn btn-danger del"
                            onClick={() => deleteTodo(todo.todo_id)}>
                        Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
  </table>
  </Fragment>;
};

export default ListTodos;