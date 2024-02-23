import { Cookies } from "react-cookie";
import { base_url } from "../util/constant";

// const isAuth = false;
// // const userId = '';
// const user = {id : "1",name:"pupai"};
const st = {
    isAuth : false,
    user : {
        id : "1",name:"pupai"
    }
}



const isAuthenticate = async(state=st,action)=>{
    switch(action.type){
        case "LOGIN" : {
            let token = Cookies.token;
            if(!token){
                return state;
            }
            let res = await fetch(`${base_url}/user`,{
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token
                }),
            });
            let user = await res.json().user;
            state.isAuth = true;
            state.user = user;
            // state.userId = user
            return state;
        }
        case "LOGOUT" : {
            state.isAuth = false;
            state.user = {};
            return state;
        }
        default : {
            return state;
        }
    }
}

export default isAuthenticate;