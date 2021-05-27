import React,{Fragment, useState, useEffect} from "react";
import {toast} from "react-toastify";

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
const Dashboard = ({setAuth}) => {

    //states
    const [name, setName] = useState("")
    const [uid, setUid] = useState("")
    const [allTodos, setAllTodos] = useState([]);


    async function getName(){
        try {
            
            const response = await fetch('http://localhost:5000/dashboard/',{
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseResponse = await response.json();


            setName(parseResponse.user_name);
            setUid(parseResponse.user_id);

            setAllTodos(parseResponse);
            //console.log(parseResponse)

        } catch (err) {
            console.error(err.message);
        }
    }


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        getName();
    },[]);
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <h2>Welcome, {name}</h2>
            <InputTodo  uid= {uid}/>
            <ListTodos />
            <button className ="btn btn-primary" onClick ={e => logout(e)} >Logout</button>

        </Fragment>
    )
}

export default Dashboard;