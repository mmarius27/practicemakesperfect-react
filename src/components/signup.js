import { useState, useRef } from 'react';
import {useHistory} from 'react-router-dom'
import {Alert, Container} from 'react-bootstrap'

import AuthenticationService from '../service/authentication.service'

const passwordRegEx = new RegExp("^[a-zA-Z0-9_]{8,24}$");
const emailRegEx = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

const SignupForm = () =>{

    const [alertMessage, setAlertMessage] = useState('');

    const history = useHistory();

    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const roleInput = useRef();

    const handleLoginResponse = (response) => {
        if(response === false){
            setAlertMessage("Something went wrong! Try to log in!");
        }
        else{
            history.push("/student/profile");
        }
    }

    const signupButtonClicked = () =>{
        let email = emailInput.current.value;
        let password = passwordInput.current.value;
        let confirmPassword = confirmPasswordInput.current.value;
        let role = roleInput.current.value;

        if(email === "" || password === "" || confirmPassword === "" || role === ""){
            setAlertMessage("All fields are required!");
        }
        else if(!emailRegEx.test(email)){
            setAlertMessage("It appears email form is not valid!");
        }
        else if(!passwordRegEx.test(password)){
            setAlertMessage("Password must consist of 8 to 24 letters or numbers or \"underscore\"(_) symbol.");
        }
        else if(password !== confirmPassword){
            setAlertMessage("Password and Password Confirm fields are not matching!");
        }
        else{
            AuthenticationService.register(email, password, role).then(response =>{
                if(response.registerSuccesful === true){
                    AuthenticationService.login(email, password).then(response => {handleLoginResponse(response)});
                }
                else{
                    setAlertMessage(response.message);
                }
                    
            })
        }
            

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
            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="w-25 form-control" placeholder="Password" ref={confirmPasswordInput}/>
            </div>
            <div className="form-group">
                <label>Student or Company</label>
                <select className="w-25 form-control" ref={roleInput}>
                    <option value="STUDENT" defaultValue>Student</option>
                    <option value="COMPANY">Company</option>
                </select>
            </div>
                <button className="mt-2 btn btn-outline-primary" onClick={signupButtonClicked}>Sign up</button>
        </div>
        {alertMessage && <Alert className="my-2 p-1 w-25" variant="dark">{alertMessage}</Alert>}
        </Container >
    );
}

export default SignupForm