import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import {BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom"

import CustomNavbar from './components/custom-navbar'
import JobList from './components/joblist'
import LoginForm from './components/login'
import SignupForm from './components/signup'
import StudentProfile from './components/studentprofile'
import MyPostStudent from './components/mypostsstudent'
import PostPage from './components/postpage';
import { JWT_KEY, PMP_ROLE } from './service/constants';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <CustomNavbar/>
            <JobList/>
          </Route>
          <Route exact path="/search">
            <CustomNavbar/>
            <JobList/>
          </Route>
          <Route exact path="/login">
            <CustomNavbar/>
            <LoginForm/>
          </Route>
          <Route exact path="/signup">
            <CustomNavbar/>
            <SignupForm/>
          </Route>
          <Route exact path="/profile" render={() => {
                if(!window.localStorage.getItem(JWT_KEY)){
                  return (<Redirect to="/home" />)
                }
                else if(window.localStorage.getItem(PMP_ROLE) === "STUDENT"){
                  return (<Redirect to="/student/profile"/>)
                }
                else if(window.localStorage.getItem(PMP_ROLE) === "COMPANY"){
                  return (<Redirect to="/profile/company"/>)
                }
                else{
                  return (<Redirect to="/profile/company" />)
                }
          }}>
          </Route>
          <Route exact path="/student/profile">
            <CustomNavbar/>
            <StudentProfile/>
          </Route>
          <Route exact path="/my-posts">
            <CustomNavbar/>
            <MyPostStudent/>
          </Route>
          <Route exact path="/post/:postid">
            <CustomNavbar/>
            <PostPage/>
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
