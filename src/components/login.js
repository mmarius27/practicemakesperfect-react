import {useState } from 'react';
import React from 'react'
import {Alert, Container} from 'react-bootstrap'
import AuthenticationService from '../service/authentication.service'
import {useHistory} from 'react-router-dom'

const LoginForm = () =>{

    const history = useHistory();
    const [alertMessage, setAlertMessage] = useState("");

    let emailInput = React.createRef();
    let passwordInput = React.createRef();

    const handleLoginResponse = (response) => {
        if(response === false){
            setAlertMessage("Wrong email or password!");
        }
        else{
            history.push("/home");
        }
    }
    const loginButtonClicked = () => {
        let email = emailInput.current.value;
        let password = passwordInput.current.value;

        if(email === ""){
            setAlertMessage("Email field empty!");
            return;
        }
        else if(password === ""){
            setAlertMessage("Password field empty!");
            return;
        }

        AuthenticationService.login(email, password).then(response => {handleLoginResponse(response)})
    }

    return (
        <Container className="p-2">
        <div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="w-25 form-control" placeholder="Email" ref={emailInput}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="w-25 form-control" placeholder="Password" ref={passwordInput}/>
            </div>
                <button className="mt-2 btn btn-outline-primary" onClick={loginButtonClicked}>Log in</button>
        </div>
        {alertMessage && <Alert className=" my-2 p-1 w-25 fade out" variant="warning">{alertMessage}</Alert>}
        
        </Container >
    );
}

export default LoginForm
