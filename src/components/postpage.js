import { useParams } from 'react-router-dom';
import {Alert, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PostService from '../service/post.service';
import CompanyService from '../service/company.service'
import studentService from '../service/student.service';
import { JWT_KEY, PMP_ROLE } from '../service/constants';

const PostPage = () => {

    const { postid } = useParams();

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [postInfo, setPostInfo] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        PostService.getPostById(postid)
        .then(result => {
            setPostInfo(result);
            CompanyService.getCompanyBasedOnId(result.posterId)
            .then(result =>{
                setCompanyInfo(result);
            });
        });
    }, []);

    const applyToPost = () => {
        setButtonDisabled(true);
        if(window.localStorage.getItem(JWT_KEY) === null){
            setAlertMessage("You need to log in to apply!");
            return;
        }
        else if(window.localStorage.getItem(PMP_ROLE) === 'COMPANY'){
            setAlertMessage("You can not aplly as COMPANY user!");
            return;
        }

        studentService.getCurrentStudentAppliedToPosts()
        .then(response => {
            if(!response.includes(postid)){
                studentService.addToCurrentStudentAppliedToPosts(postid)
                .then(response => {
                    setAlertMessage(response.message);
                    setButtonDisabled(false);
                });
            }
            else{
                setAlertMessage("You have already applied to this post!");
                setButtonDisabled(false);
            }
        });

        
    }

    return(postInfo && companyInfo &&
        <Container className="d-flex">
            <Container className="d-inline w-25 border-right-2">
                <span className="text-primary" ><h3>{companyInfo.companyName}</h3></span>
                <hr/>
                <span>{companyInfo.description}</span>
                <hr/>
                <span className="text-primary d-block"><h4>Contact:</h4></span>
                <span className="d-block"><h5>{companyInfo.contactFirstName} {companyInfo.contactSurname}</h5></span>
                <span className="d-block"><span className="text-success">Email: </span>{companyInfo.contactEmail}</span>
                <span className="d-block"><span className="text-success">Phone: </span> {companyInfo.contactPhoneNumber}</span>
            </Container>
            <Container className="d-inline w-75">
                <span>{postInfo.title}</span>
                <h6><small>
                        <span className="text-primary mr-1">{postInfo.type}</span>|
                        <span className="mx-1">{postInfo.city}</span>|
                        <span className="mx-1">{postInfo.postDate}</span>
                </small></h6>
                <hr/>
                <span>{postInfo.description}</span>
                <Button disabled={isButtonDisabled} className="w-100" variant="primary" onClick={applyToPost}>Apply</Button>
                {alertMessage && <Alert className="p-1 my-10 w-50" variant="warning">{alertMessage}</Alert>}
            </Container>         
        </Container>
    );
}

export default PostPage