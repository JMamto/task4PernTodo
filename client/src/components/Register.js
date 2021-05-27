import React,{Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";


const Register = ({setAuth}) => {

    //states
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setpassword] = useState("");
    const [inputs, setInputs] = useState({

        name: "",
        email: "",
        password: "",

    })

    const {name, email, password} = inputs;
    
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }


    const onRegister =async  (e) => {
        e.preventDefault();
        try {
            const body = {name, email, password}
            const response = await fetch('http://localhost:5000/auth/register',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            
            const parseResponse = await response.json()
            
            if(parseResponse.token){
                localStorage.setItem("token", parseResponse.token)
                setAuth(true);
                toast.success("Registered Successfully")
            }else{
                setAuth(false)
                toast.error(parseResponse)
            }


            console.log(parseResponse)
        } catch (err) {
            console.error(err.message);
        }
    }

    return (

        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onRegister}>
                <input type="text" 
                       name="name" 
                       placeholder="name" 
                       className ="form-control my-3"
                       value={name}
                       onChange = {e => onChange(e)} />

                <input type="email" 
                       name="email" 
                       placeholder="email" 
                       className ="form-control my-3"
                       value={email}
                       onChange = {e => onChange(e)} />

                <input type="password" 
                       name="password" 
                       placeholder="password" 
                       className ="form-control my-3"
                       value={password}
                       onChange = {e => onChange(e)} />

                <button className="btn btn-success btn-block">Register</button>
            </form>
            <Link to ="/login">Login</Link>
        </Fragment>
    )

}

export default Register;