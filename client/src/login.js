import React, {Fragment, useState, useEffect}  from "react";
import Axios from "axios";
import './App.css';
import './style.css';
//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";


function App() {


  const [emailReg, setEmailReg] = useState('');
  const [passReg, setPassReg] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const onRegister = () => {

    if(emailReg.length !== 0 || passReg.length !== 0){

      if(emailReg.length === 0 && passReg.length !== 0){
          setRegisterStatus('Enter Email');

      }else if(emailReg.length !== 0 && passReg.length === 0){
          if(isValidEmail(emailReg)){
              setRegisterStatus('Enter pass');
          }else{
            setRegisterStatus('Invalid email');
          }
      }else if (emailReg.length !== 0 && passReg.length !== 0){
          
        if(isValidEmail(emailReg)){
          Axios.post('http://localhost:5000/getRegister',{
            emailReg:emailReg,
            
            }).then((response) => {
                if(response.data.length > 0){
                  setRegisterStatus('Email already exists');
                }else{
                  Axios.post('http://localhost:5000/register',{
                    emailReg: emailReg,
                    passReg: passReg,
                    }).then((response) => {
                      setRegisterStatus('Registered successfully');
                    });
                }
            });
        }else{
          setRegisterStatus('Invalid Email')
        }
        
      };
    }else{
      setRegisterStatus('Enter credentials');
    }

  };

  const onLogin = () => {
    if(email.length !== 0 || password.length !== 0){
        if(email.length !== 0 && password.length === 0){
          setLoginStatus('Enter user pass!')
        }else if(email.length === 0 && password.length !== 0){
          setLoginStatus('Enter email')
        }else{
          Axios.post('http://localhost:5000/getLogin',{
            email: email,
            password: password,
        
          }).then((response) => {
            console.log(response)
            
            if(response.data.rowCount === 0){
                console.log(response.data.rowCount)
                setLoginStatus('User does not exist!')
            }else{
              if(email === response.data.rows[0].email && password === response.data.rows[0].password){
                Axios.post('http://localhost:5000/login',{
                  email: email,
                  password: password,
                }).then((reponse) => {
                  setLoginStatus('Logged in!')
              })

              }else{
                setLoginStatus('Email or Password is incorrect');
              }
            }
          })
        }

    }else{
      setLoginStatus('Please enter credentials!');
    }
  }

  function isValidEmail(email){
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(regexEmail)) {
        return true; 
      } else {
        return false; 
    }
    
  }

  return (
    <Fragment>
      <div className = "container">
          {/* <InputTodo />
          <ListTodos /> */}

          <div className="Register">
            <h1>Register</h1>
            <input type="text" 
                   placeholder="email" 
                   onChange={ (e)  => { setEmailReg(e.target.value)}}/>

            <input type="text" 
                    placeholder="password"
                    onChange={ (e)  => { setPassReg(e.target.value)}}/>
            <button onClick={onRegister}> Register </button>
            <h2>{registerStatus}</h2>
          </div>

          <div className="Login">
            <h1>Login</h1>
            <input type="text" 
                   placeholder="email" 
                   onChange={ (e)  => { setEmail(e.target.value)}}/>

            <input type="text" 
                    placeholder="password"
                    onChange={ (e)  => { setPassword(e.target.value)}}/>
            <button onClick={onLogin}> Login </button>
            <h2>{loginStatus}</h2>
          </div>
        
      </div>
    </Fragment>);
}
export default App;