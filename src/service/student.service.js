import { API_URL, JWT_KEY } from "./constants";

class StudentService{
    updateCurrentStudent(data){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/student", {
            method:'POST',
            headers:{"Content-type":"application/json","Authorization":jwt},
            body:JSON.stringify(data)
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        });
    }

    getCurrentStudent(){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/student", {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {
                console.log(data);
                return JSON.parse(data);});
        });
    }

    getStudentBasedOnId(id){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/student/" + id, {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        })
    }
    
    getCurrentStudentAppliedToPosts(){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/student/applied-to-posts", {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        })
    }
    
    addToCurrentStudentAppliedToPosts(data){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/student/applied-to-posts", {
            method:'POST',
            headers:{"Content-type":"application/json","Authorization":jwt},
            body:JSON.stringify(data)
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        });
    }
    
}

export default new StudentService();