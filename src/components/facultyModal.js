import '../customcss.css'
import { useState, useRef } from "react";
import { Alert, Container, Modal, Button } from "react-bootstrap";

const numericRegEx = new RegExp("^[1-9]{1}$");

const FacultyInfo = ({faculty, year, setFacultyInfo}) =>{

    const facultyInput = useRef();
    const yearInput = useRef();
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState({"faculty":faculty, "year":year});
    const [alertMessage, setAlertMessage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let faculty = facultyInput.current.value;
        let year = yearInput.current.value

        if(!numericRegEx.test(year)){
            setAlertMessage("Year must be a digit betwin 1 and 9!");
            return;
        }
        setInfo({faculty, year})
        setFacultyInfo(faculty, year);

        setShow(false);
    }

    return(
        <Container className="d-flex">
            <div className="align-text-right d-inline w-15 py-2 ">
                <span className="d-block">College:</span>
                <span className="d-block">Year of study:</span>
            </div>
            <div className="modal-triger mx-2 p-2 rounded-100 w-100" onClick={handleShow}> 
                <span className="d-block">{info.faculty? info.faculty: "-"}</span>
                <span className="d-block">{info.year}</span>  
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify contact info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>College</label>
                    <input type="text" className="w-50 form-control" defaultValue={info.faculty} ref={facultyInput}/>

                    <label>Year of study</label>
                    <input type="text" className="w-50 form-control" defaultValue={info.year} ref={yearInput}/>
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

export default FacultyInfo