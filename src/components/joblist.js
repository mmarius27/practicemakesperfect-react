import {Card,Container} from 'react-bootstrap'
import PostService from '../service/post.service'
import {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

const JobList = () =>{

    const location = useLocation();
    const history = useHistory();

    const [posts, setPosts] = useState(null);

    const querryParams = queryString.parse(location.search);
    let searchString = querryParams.searchTerm;
    if(typeof searchString === 'undefined'){
        searchString = "";
    }

    useEffect(() =>{
        PostService.getPostBySearchString(searchString).then(response => {setPosts(response)});
    }, [searchString]);

    const postClicked = (postId) => {
        console.log("POST CLICKED! "+ postId);
        history.push("/post/" + postId);
    }

    //PostService.getPostBySearchString(searchString);
    return (
        <Container>
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

export default JobList