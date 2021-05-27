import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";


const Login = ({setAuth}) => {


    //> takes in user inputs 
    const[inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    //> deconstructs inputs
    const {email, password} = inputs;


    //> gets all user inputs and sets inputs
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const body = {email, password}
            const response = await fetch('http://localhost:5000/auth/login',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseResponse = await response.json();

            if(parseResponse.token){
                localStorage.setItem("token", parseResponse.token)

                setAuth(true)
                toast.success("Login Successfully")

            }else{
                setAuth(false)
                toast.error(parseResponse)
            }

        } catch (err) {
            console.error(err.message)
        }

    }

    return (   

        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onLogin}>
                <input type="email"
                       name="email"
                       placeholder="email"
                       className="form-control my-3" 
                       value={email}
                       onChange={e => onChange(e)} />

                <input type="password"
                       name="password"
                       placeholder="password"
                       className="form-control my-3"
                       value={password}
                       onChange={e => onChange(e)} /> 

                <button className="btn btn-success btn-block">Login</button>
            </form>
                <Link to ="/register" >Register</Link>
        </Fragment>
    )

}

export default Login;