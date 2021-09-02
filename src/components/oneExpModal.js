import '../customcss.css'
import { useState, useEffect, useRef } from "react";
import { Alert, Container, Modal, Button } from "react-bootstrap";

const dateRegEx = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$");

const OneExpModal = ({itemParam, index, setItem}) => {
    
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [item, setCurrentItem] = useState(itemParam);

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

        let newItem = {startDate:startDate, endDate:endDate, postName:postName, companyName:companyName};

        setCurrentItem(newItem);
        setItem(newItem, index);

        console.log(startDate + " " + endDate + " " + companyName + " " + postName);
        setShow(false);
    }

    let handleDelete = () =>{
        console.log("INDEXXX:" + index);
        setItem(null, index);
        setShow(false);
    }

    useEffect( () => {
        setCurrentItem(itemParam);
    }, [itemParam])

    return(
        <Container className="m-0 p-0">
            <div className="d-block modal-triger mx-2 p-2 rounded-100" onClick={(item) => handleShow(item)}>
                <span className="d-block">From {item.startDate} until {item.endDate} </span>
                <span className="d-block">{item.postName} at {item.companyName}</span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modify info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Entered</label>
                    <input type="text" className="w-25 form-control" defaultValue={item.startDate} ref={startDateInput} />

                    <label>Graduated</label>
                    <input type="text" className="w-25 form-control" defaultValue={item.endDate} ref={endDateInput}/>

                    <label>At</label>
                    <input type="text" className="w-100 form-control" defaultValue={item.companyName} ref={companyNameInput} />

                    <label>As</label>
                    <input type="text" className="w-100 form-control" defaultValue={item.postName} ref={postNameInput} />

                    {alertMessage && alertMessage && <Alert className=" my-2 p-1 w-75 fade out" variant="warning">{alertMessage}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={handleModify}>
                        Modify
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default OneExpModal