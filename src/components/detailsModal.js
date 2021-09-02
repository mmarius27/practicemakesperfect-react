import '../customcss.css'
import { useState, useRef } from "react";
import {Alert, Container, Modal, Button } from "react-bootstrap";

const dateRegEx = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$");

const Details = ({birthday, description, setDetailsInfo}) =>{

    const birthdayInput = useRef();
    const descriptionInput = useRef();
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({"birthday":birthday, "description":description});
    const [alertMessage, setAlertMessage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let birthday = birthdayInput.current.value;
        let description = descriptionInput.current.value

        if(!dateRegEx.test(birthday)){
            setAlertMessage("Date must respect format DD/MM/YYYY");
            return;
        }

        setDetails({birthday, description})
        setDetailsInfo(birthday, description);

        setShow(false);
    }

    return(
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">
                <span className="d-block">Birthday:</span>
                <span className="d-block">Description:</span>
            </div>
            <div className="modal-triger mx-2 p-2 rounded-100 w-100" onClick={handleShow}> 
                <span className="d-block">{details.birthday}</span>
                <span className="d-block">{details.description}</span>  
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify details info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Birthday</label>
                    <input type="text" className="w-50 form-control" defaultValue={details.birthday} ref={birthdayInput}/>

                    <label>Description</label>
                    <input type="text" className="w-100 form-control" defaultValue={details.description} ref={descriptionInput}/>
                    {alertMessage && alertMessage && <Alert className=" my-2 p-1 w-75 fade out" variant="warning">{alertMessage}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModify}>
                        Modify
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Details