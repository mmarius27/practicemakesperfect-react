import '../customcss.css'
import { useState, useRef } from "react";
import { Alert, Container, Modal, Button } from "react-bootstrap";

const emailRegEx = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

const Contacts = ({email, phone, setContactInfo}) =>{

    const emailInput = useRef();
    const phoneInput = useRef();
    const [show, setShow] = useState(false);
    const [contacts, setContacts] = useState({"email":email, "phone":phone});
    const [alertMessage, setAlertMessage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let email = emailInput.current.value;
        let phone = phoneInput.current.value

        if(!emailRegEx.test(email)){
            setAlertMessage("It appears email form is not valid!");
            return;
        }

        setContacts({email, phone})
        setContactInfo(email, phone);

        setShow(false);
    }

    return(
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">
                <span className="d-block">Email:</span>
                <span className="d-block">Phone:</span>
            </div>
            <div className="modal-triger mx-2 p-2 rounded-100 w-100" onClick={handleShow}> 
                <span className="d-block">{contacts.email}</span>
                <span className="d-block">{contacts.phone}</span>  
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify contact info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Email</label>
                    <input type="text" className="w-50 form-control" defaultValue={contacts.email} ref={emailInput}/>

                    <label>Phone</label>
                    <input type="text" className="w-50 form-control" defaultValue={contacts.phone} ref={phoneInput}/>
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

export default Contacts