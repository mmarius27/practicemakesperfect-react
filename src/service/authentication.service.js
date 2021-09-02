import { API_URL, JWT_KEY, PMP_ROLE} from "./constants";

const parseJwt = (token) => {
    if (!token) { return; }
    token = token.replace("Bearer ", "");
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

class AuthenticationService{

    

    login(username , password){

        const body = {username:username, password:password}
        const formBody = Object.keys(body).map(key =>
                            encodeURIComponent(key) + '=' + 
                            encodeURIComponent(body[key])).join('&');
        
        return fetch(API_URL + "/login", {
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded"},
            body:formBody
        })
        .then(res => {
            if(res.status === 200){
               return res.text().then(data => {
                            let token = JSON.parse(data).Authorization;
                            window.localStorage.setItem(JWT_KEY, JSON.parse(data).Authorization);
                            window.localStorage.setItem(PMP_ROLE, parseJwt(token).role);

                            console.log(parseJwt(token).role);
                            return true;
                        });
            }
            else{
                return false;
            }
        });
    }

    register(email, password, role){
        const body = {email:email, password:password, role:role};
        return fetch(API_URL + "/api/user/register", {
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(body)
        })
        .then(res =>{
            return res.text().then(data => {return JSON.parse(data);});
        })
    }

    logout(){
        if(window.localStorage.getItem(JWT_KEY) != null)
            window.localStorage.removeItem(JWT_KEY);
    }
}

export default new AuthenticationService();