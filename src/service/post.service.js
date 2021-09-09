import { API_URL, JWT_KEY } from "./constants";

class PostService{

    addNewPost(data){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/post", {
            method:'POST',
            headers:{"Content-type":"application/json","Authorization":jwt},
            body:JSON.stringify(data)
        })
        .then(res =>{
            if(res.status === 200)
                return true;
            else
                return false;
        });
    }

    getPostById(id){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/post/" + id, {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => { return JSON.parse(data);});
        })
    }

    getPostBySearchString(searchString){
        console.log("SEARCH STRING=" + searchString);
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/post?searchString="+searchString, {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt},
        })
        .then(res =>{
            return res.text().then(data => {
                                if(data === "")
                                    return null;
                                else
                                    return JSON.parse(data);});
        })
    }

    updatePost(postId, data){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/post/" + postId, {
            method:'POST',
            headers:{"Content-type":"application/json","Authorization":jwt},
            body:JSON.stringify(data)
        })
        .then(res =>{
            if(res.status === 200)
                return true;
            else
                return false;
        });
    }

    deletePost(postId){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/post/" + postId, {
            method:'DELETE',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            if(res.status === 200)
                return true;
            else
                return false;
        });
    }
}

export default new PostService();