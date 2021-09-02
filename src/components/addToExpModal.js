import '../customcss.css'
import { useState, useRef } from "react";
import { Alert, Container, Modal, Button } from "react-bootstrap";

const dateRegEx = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$");

const AddExpModal = ({addNewItem}) => {
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    let startDateInput = useRef();
    let endDateInput = useRef();
    let companyNameInput = useRef();
    let postNameInput = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModify = () =>{
        let startDate = startDateInput.current.value;
        let endDate = endDateInput.current.value;
        let companyName = companyNameInput.current.value;
        let postName = postNameInput.current.value;

        if(!dateRegEx.test(startDate) || !dateRegEx.test(endDate)){
            setAlertMessage("Date must respect format DD/MM/YYYY");
            return;
        }
        if(companyName === ""){
            setAlertMessage("Company name field empty!");
            return;
        }

        let newItem = {startDate:startDate, endDate:endDate, postName:postName, companyName:companyName};

        addNewItem(newItem);

        setShow(false);
    }

    return(
        <Container className="m-0 p-0">
            <div className="d-block modal-triger mx-2 p-2 rounded-100 align-text-center" onClick={(item) => handleShow(item)}>
                <span className="d-block">ADD NEW ITEM</span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Entered</label>
                    <input type="text" className="w-25 form-control" ref={startDateInput} />

                    <label>Graduated</label>
                    <input type="text" className="w-25 form-control" ref={endDateInput}/>

                    <label>At</label>
                    <input type="text" className="w-100 form-control" ref={companyNameInput} />

                    <label>As</label>
                    <input type="text" className="w-100 form-control" ref={postNameInput} />

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

export default AddExpModal