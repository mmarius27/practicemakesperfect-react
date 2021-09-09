import {Container} from 'react-bootstrap'
import companyService from "../service/company.service";
import {useState, useEffect} from 'react'
import PostService from '../service/post.service'
import NewPost from './addNewPostModal';
import PostItem from './modifyPostModal';



const MyPostCompany = () => {

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
        companyService.getRequestingCompanyPostedPosts()
        .then(response => {
            console.log(response);
            if(response.length !== 0){
                console.log("ID OF POSTS:")
                console.log(response);
                requestPosts(response)
                .then(res => {
                    console.log("POSTS:")
                    console.log(res);
                    setPosts(res);
                });
                
            }
        })
    }, []);

    return(
        <Container>
            <Container className="py-0 d-flex">
                    <span className="py-0"><h3 className="m-0 py-0">My posts</h3></span>
                </Container>
                <hr></hr>
        {posts &&
         posts.map((post) =>(
            <PostItem key={post.id} postItem={post}/>
         ))}
        <NewPost/>
        </Container>
    );
}

export default MyPostCompany