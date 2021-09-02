import {Card,Container} from 'react-bootstrap'
import PostService from '../service/post.service'
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import studentService from "../service/student.service";

const MyPostStudent = () =>{
    const history = useHistory();

    const [posts, setPosts] = useState(null);

    const requestPosts = async (posts) => {
        const allAsyncResults = []

        for (const element of posts) {
            await PostService.getPostById(element)
                    .then(res => {
                        allAsyncResults.push(res);
                    });
        }

        return allAsyncResults;
  }

    useEffect(() =>{
        studentService.getCurrentStudentAppliedToPosts()
        .then(response => {
            console.log("ARRA OF POSTS");
            console.log(response);
            if(response.length !== 0){
                requestPosts(response)
                .then(res => {
                    console.log("POSTS IN USE EFFECT");
                    console.log(res);
                    setPosts(res);
                });
                
            }
        })
    }, []);

    const postClicked = (postId) => {
        console.log("POST CLICKED! "+ postId);
        history.push("/post/" + postId);
    }

    return(
        <Container>
            <Container className="py-0 d-flex">
                    <span className="py-0"><h3 className="m-0 py-0">My posts</h3></span>
                </Container>
                <hr></hr>
        {posts && 
         posts.map((post) => (
            <div className="mx-2 p-2 rounded-100 w-100 modal-triger" key={post.id} onClick={() => postClicked(post.id)}>
                <Card className="text-left border-0">
                <Card.Body className="p-1">
                    <Card.Title className="mx-1">{post.title}</Card.Title>
                    <Card.Text as='div'>
                        <h6><small>
                            <span className="text-primary mx-1 ">{post.type}</span>|
                            <span className="mx-1">{post.city}</span>|
                            <span className="mx-1">{post.postDate}</span>
                        </small></h6>
                    </Card.Text>
                </Card.Body>
                </Card> 
            <hr className="m-0"/>
            </div>
        ))}
        </Container>
    );


}

export default MyPostStudent