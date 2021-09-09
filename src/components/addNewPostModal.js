import { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Alert, Card, Container, Modal, Button } from "react-bootstrap";
import postService from "../service/post.service";

const NewPost = ({addNewPost}) => {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    let titleInput = useRef();
    let descriptionInput = useRef();
    let typeInput = useRef();
    let cityInput = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{

        let title = titleInput.current.value;
        let description = descriptionInput.current.value;
        let type = typeInput.current.value;
        let city = cityInput.current.value;

        if(title === "" || description === "" || city === "" || type === ""){
            setAlertMessage("One of the fields is empty!");
        }
        else{
            let newPost = {title:title, description:description, type:type, city:city, keywords:[]};
            postService.addNewPost(newPost).then(res => {
                if(res === true){
                    history.push("/my-posts");
                    setShow(false);
                }
                else{
                    setAlertMessage("Error saving post!");
                }
            });
        }

        
    }

    return(
        <Container className="m-0">
            <Container className="mx-2 p-2 rounded-100 w-100 align-text-center" onClick={() => handleShow()}>
                <Card className="border-0 modal-triger">
                    <Card.Body className="p-1">
                        <Card.Title className="mx-1"></Card.Title>
                        <Card.Text as='div'>
                            <h6><small>
                                <span className="text-primary mx-1 ">ADD NEW POST</span>
                            </small></h6>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <hr className="m-0"/>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title</label>
                    <input type="text" className="w-50 form-control" ref={titleInput}/>

                    <label>Description</label>
                    <textarea type="text" className="w-100 form-control" ref={descriptionInput}/>

                    <label>Type</label>
                    <select className="w-50 form-control" ref={typeInput}>
                        <option value="Stagiu" defaultValue>Stagiu</option>
                        <option value="Internship" defaultValue>Internship</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Full-time">Full-time</option>
                    </select>

                    <label>City</label>
                    <input type="text" className="w-50 form-control" ref={cityInput}/>

                    {alertMessage && alertMessage && <Alert className=" my-2 p-1 w-75 fade out" variant="warning">{alertMessage}</Alert>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModify}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default NewPost