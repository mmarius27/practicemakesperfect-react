import { API_URL, JWT_KEY } from "./constants";

class CompanyService{

    getCurrentCompany(){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/company", {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        });
    }

    updateCurrentCompany(data){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/company", {
            method:'POST',
            headers:{"Content-type":"application/json","Authorization":jwt},
            body:JSON.stringify(data)
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        });
    }

    getCompanyBasedOnId(id){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/company/" + id, {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        })
    }

    getCompanyPostedPosts(id){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/company/" + id + "/posted-posts", {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {console.log(data);});
        })
    }

    getRequestingCompanyPostedPosts(){
        let jwt = window.localStorage.getItem(JWT_KEY);
        return fetch(API_URL + "/api/company/posted-posts", {
            method:'GET',
            headers:{"Content-type":"application/json","Authorization":jwt}
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        });
    }

}

export default new CompanyService();