import { useHistory } from 'react-router-dom';
import { Alert, Modal, Button, Card, Container} from "react-bootstrap";
import { useState, useRef } from "react";
import postService from '../service/post.service';


const PostItem = ({postItem}) => {
    console.log("POST ITEM:");
    console.log(postItem);
    const history = useHistory();

    const [post, setPost] = useState(postItem);
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
            postService.updatePost(post.id, newPost).then(res => {
                if(res === true){
                    post.title = title;
                    post.description = description;
                    post.type = type;
                    post.city = city;
                    setShow(false);
                }
                else{
                    setAlertMessage("Error saving post!");
                }
            });
        }
    }

    const handleDelete = () =>{
        postService.deletePost(post.id)
        .then(res => {
            if(res === true){
                history.push("/my-posts");
                setShow(false);
            }
            else{
                setAlertMessage("Error when deleting post!")
            }
        })
        
    }

    const postClicked = (postId) => {
        history.push("/post/" + postId);
    }

    return(post &&
        <Container>
            <div className="mx-2 p-2 rounded-100 w-100 d-flex " >
                <Card className="text-left border-0 modal-triger w-85" onClick={() => postClicked(post.id)} >
                    <Card.Body className="p-1">
                        <Card.Title className="mx-1">{postItem.title}</Card.Title>
                        <Card.Text as='div'>
                            <h6><small>
                                <span className="text-primary mx-1 ">{post.type}</span>|
                                <span className="mx-1">{post.city}</span>|
                                <span className="mx-1">{post.postDate}</span>
                            </small></h6>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="mx-2 p-2 rounded-100 w-15">
                    <Button onClick={handleShow}>Modify</Button>
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Modify info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Title</label>
                            <input type="text" className="w-50 form-control" defaultValue={post.title} ref={titleInput}/>

                            <label>Description</label>
                            <textarea type="text" className="w-100 form-control" defaultValue={post.description} ref={descriptionInput}/>

                            <label>Type</label>
                            <select className="w-50 form-control" defaultValue={post.type} ref={typeInput}>
                                <option value="Stagiu" defaultValue>Stagiu</option>
                                <option value="Internship" >Internship</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Full-time">Full-time</option>
                            </select>

                            <label>City</label>
                            <input type="text" className="w-50 form-control" defaultValue={post.city} ref={cityInput}/>

                            {alertMessage && alertMessage && <Alert className=" my-2 p-1 w-75 fade out" variant="warning">{alertMessage}</Alert>}

                        </Modal.Body>
                        <Modal.Footer className="d-flex">
                            <div className="w-75">
                                <Button className="mx-2"variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                                <Button className="mx-2" variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className="mx-2" variant="primary" onClick={handleModify}>
                                    Modify
                                </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <hr className="m-0"/>
         </Container>
         
         
    );
}

export default PostItem;