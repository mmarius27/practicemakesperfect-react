import '../customcss.css'
import { useState, useRef } from "react";
import {Container, Modal, Button } from "react-bootstrap";

const CompanyDetails = ({companyName, companyDescription, setCompanyDetails}) =>{

    const companyNameInput = useRef();
    const companyDescriptionInput = useRef();
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({"companyName":companyName, "companyDescription":companyDescription});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let companyName = companyNameInput.current.value;
        let companyDescription = companyDescriptionInput.current.value

        setDetails({companyName, companyDescription})
        setCompanyDetails(companyName, companyDescription);

        setShow(false);
    }

    return(
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">
                <span className="d-block">Company Name:</span>
                <span className="d-block">Description:</span>
            </div>
            <div className="modal-triger mx-2 p-2 rounded-100 w-85" onClick={handleShow}> 
                <span className="d-block">{details.companyName}</span>
                <span className="d-block prewrap">{details.companyDescription}</span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Company Name</label>
                    <input type="text" className="w-50 form-control" defaultValue={details.companyName} ref={companyNameInput}/>

                    <label>Company Details</label>
                    <textarea type="text" className="w-100 h-100 form-control" defaultValue={details.companyDescription} ref={companyDescriptionInput}/>
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
    );
}

export default CompanyDetails