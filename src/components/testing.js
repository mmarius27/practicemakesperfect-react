import AuthenticationService from '../service/authentication.service'
//import StudentService from '../service/student.service'
import PostService from '../service/post.service'
import CompanyService from '../service/company.service'
import {useState, useEffect} from 'react'
import {JWT_KEY} from '../service/constants'

const TestArea = () => {
        const [isLogged, setIsLogged] = useState(null);
        //const [registerResponse, setRegisterResponse] = useState(null);
        //const [updateCurrentUserResponse, setUpdateCurrentUserResponse] = useState(null);
        //const [currentStudentInfo, setCurrentStudentInfo] = useState(null);
        //const [studentInfo, setStudentInfo] = useState(null);
        //const [appliedToPosts, setAppliedToPosts] = useState(null);
        //const [responseGeneric, setResponseGeneric] = useState(null);

        const [addPostResponse, setAddPostResponse] = useState(null);
        const [postById, setPostById] = useState(null);
        const [postBySearchString, setPostBySearchString] = useState(null);

        const [currentCompany,setCurrentCompany] = useState(null);
        const [updateCurrentCompanyResponse,setCpdateCurrentCompanyResponse] = useState(null);
        const [comapany,setComapany] = useState(null);
        const [postedPosts,setPostedPosts] = useState(null);
        const [curentPostedPosts,setCurentPostedPosts] = useState(null);
        
        useEffect(() => {
            console.log("useEffect");
            AuthenticationService.login("email_company01", "password01").then(response => {setIsLogged(response);});
            //AuthenticationService.register("email01", "password01","STUDENT").then(response => {setRegisterResponse(response);});

            /*
            const body = {
            "firstName":"UpdateName1",
            "lastName":"UpdateLastName1",
            "contactEmail":"updateEmail1",
            "phoneNumber":"updatePhonenumber1",
            "birthday":"01/01/20001",
            "description":"Update Description of mine1",
            "faculty":"Update Faculty1",
            "yearOfStudy":4
            };

            const id = "611fc4664a3b78120ec6b94f";
            const idPost = "611fda040061ca5c64925c53";
            */
            const postBody = {
                "posterId":"611fd83e0061ca5c64925c51",
                "title":"post nou",
                "description":"economie.",
                "city":"Iasi",
                "keywords":["kewyword2","keyword3"]
            }
            
            const companyBody = {
                contactFirstName:"updated Name",
                contactSurname:"updated Surnae",
                companyName:"NEW COMPANY NAME",
                description:"THE NEW AND IMPROVE",
                contactEmail:"CONTACT ME HERE",
                contactPhoneNumber:"0000-2200-1"
            }
            
            /*
            StudentService.updateCurrentStudent(body).then(response => {setUpdateCurrentUserResponse(response);});
            StudentService.getCurrentStudent().then(response => {setCurrentStudentInfo(response);});
            StudentService.getStudentBasedOnId(id).then(response => {setStudentInfo(response);});
            StudentService.getCurrentStudentAppliedToPosts(id).then(response => {setAppliedToPosts(response);});
            StudentService.addToCurrentStudentAppliedToPosts(idPost).then(response => {setResponseGeneric(response);});
            */

            PostService.getPostBySearchString("economie").then(response => {setPostBySearchString(response);});
            PostService.getPostById("611fda040061ca5c64925c53").then(response => {setPostById(response);});
            PostService.addNewPost(postBody).then(response => {setAddPostResponse(response);});

            CompanyService.getCurrentCompany().then(response => {setCurrentCompany(response);});
            CompanyService.updateCurrentCompany(companyBody).then(response => {setCpdateCurrentCompanyResponse(response);});
            CompanyService.getCompanyBasedOnId("611fd83e0061ca5c64925c51").then(response => {setComapany(response);});
            CompanyService.getCompanyPostedPosts("611fd83e0061ca5c64925c51").then(response => {setPostedPosts(response);});
            CompanyService.getRequestingCompanyPostedPosts().then(response => {setCurentPostedPosts(response);});
        
        },[]);

        return (
            (<div >
                USER SERVICE****************************************************************************************<br/>
                {isLogged
                ? "true " + window.localStorage.getItem(JWT_KEY)
                : "false"
                }
                <br/><br/><br/><br/>POST SERVICE*****************************************************************<br/>
                <br/>
                {postById && (JSON.stringify(postById))}
                <br/>
                {postBySearchString && (JSON.stringify(postBySearchString))}
                <br/>
                {addPostResponse && (JSON.stringify(addPostResponse))}
                <br/><br/><br/><br/>COMPANY SERVICE*****************************************************************<br/>
                {currentCompany && (JSON.stringify(currentCompany))}
                <br/>
                {updateCurrentCompanyResponse && (JSON.stringify(updateCurrentCompanyResponse))}
                <br/>
                {comapany && (JSON.stringify(comapany))}
                <br/>
                {postedPosts && (JSON.stringify(postedPosts))}
                <br/>
                {curentPostedPosts && (JSON.stringify(curentPostedPosts))}
            </div>)
            );
}

export default TestArea

/*
                <br/>
                {registerResponse && (registerResponse.message)}
                <br/><br/><br/><br/>STUDENT SERVICE*****************************************************************<br/>
                {updateCurrentUserResponse && (updateCurrentUserResponse.message)}
                <br/>
                {currentStudentInfo && (JSON.stringify(currentStudentInfo))}
                <br/>
                {studentInfo && (JSON.stringify(studentInfo))}
                <br/>
                {appliedToPosts && (JSON.stringify(appliedToPosts))}
                <br/>
                {responseGeneric && (JSON.stringify(responseGeneric))}
*/