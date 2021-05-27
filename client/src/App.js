import React, {Fragment, useState, useEffect}  from "react";
// import Axios from "axios";
import './App.css';
import './style.css';

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

//components
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";


toast.configure();
function App() {


  //states
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // changes the state of is authenticated 
  const setAuth = (boolean) => {
      setIsAuthenticated(boolean);

  }

  async function isAuth(){
    try {
        const response = await fetch("http://localhost:5000/auth/is-verify",{
          method: "GET",
          headers: {token: localStorage.token}

        })

        const parseResponse = await response.json();

        //> 1 liner if else 
        parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

        console.log(parseResponse);
    } catch (err) {
        console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  });

  return (
    <Fragment>
      <Router>
        <div className ="container">
        <Switch>
          <Route exact path = "/login" 
                       render = {props => !isAuthenticated ? <Login {...props} setAuth = {setAuth} /> : <Redirect to = "/dashboard" /> } />

          <Route exact path = "/register" 
                       render = {props => !isAuthenticated ? <Register {...props} setAuth = {setAuth} /> : <Redirect to = "/login"/>}/>

          <Route exact path = "/dashboard" 
                       render = {props => isAuthenticated ? <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to = "/login"/>}/>
                       
           <Route exact path = "/"
                       render = {props => isAuthenticated ? <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to = "/dashboard"/>}/>
        </Switch>
        </div>
      </Router>
    </Fragment>);
}
export default App;