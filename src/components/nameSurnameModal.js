import '../customcss.css'
import { useState, useRef } from "react";
import { Container, Modal, Button } from "react-bootstrap";

const NameAndSurname = ({firstName, lastName, setFirstAndLastName}) =>{

    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const [show, setShow] = useState(false);
    const [names, setNames] = useState({"firstName":firstName, "lastName":lastName});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let firstName = firstNameInput.current.value;
        let lastName = lastNameInput.current.value

        setNames({firstName, lastName})
        setFirstAndLastName(firstName, lastName);

        setShow(false);
    }
    
    return(
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">Name:</div>
            <div className="modal-triger mx-2 p-2 rounded-100 w-100" onClick={handleShow}> 
                {names.firstName} {names.lastName}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>First Name</label>
                    <input type="text" className="w-50 form-control" defaultValue={names.firstName} ref={firstNameInput}/>

                    <label>Last Name</label>
                    <input type="text" className="w-50 form-control" defaultValue={names.lastName} ref={lastNameInput}/>
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

export default NameAndSurname