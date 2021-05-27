import React, {Fragment, useState} from "react";
import "./style.css";
import Dashboard from "./Dashboard"

const InputTodo = ({uid}) => {

    const [todo_name, settodo_name] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");


    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            console.log(uid);
            const body = {uid, todo_name, description, date};
            await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)  
            });
           
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <div className="container">
            <h1 className = "text-center mt-5 title">Pern TODO List</h1>
            <form className = "d-flex mt-4" onSubmit={onSubmitForm}>
                <input placeholder = "Todo name" 
                       type = "text"
                       className = "form-control mr-2 in" 
                       value = {todo_name}
                       onChange = {e => settodo_name(e.target.value)}
                       required
                       />
                
                <input placeholder = "Todo description" 
                       type = "text" 
                       className = "form-control mr-2 in" 
                       value = {description}
                       onChange = {e => setDescription(e.target.value)}
                       />

                <input placeholder = "Todo date" 
                       type = "date" 
                       className = "form-control mr-2 in" 
                       value = {date}
                       onChange = {e => setDate(e.target.value)}
                       required
                       />
                <button className = "btn btn-success bttn">Add</button>
            </form>
            </div>
            
        </Fragment>);
}

export default InputTodo;