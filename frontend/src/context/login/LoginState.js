import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { base_url } from "../../util/constant";
import LoginContext from "./loginContext";

const LoginState = (props)=>{
    // const location = useLocation();
    const [isAuthenticate, setIsAuthenticate] = useState();
    const [user,setUser] = useState({});
    const [masterPlay, setMasterPlay] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [relodeUser, setRelodeUser] = useState(false);

    useEffect(()=>{
        try{
            // console.log("relode");
            if(cookies.token){
                
                fun();
            }
        }catch(err){
            // console.log(err);
        }
    },[relodeUser]);

    async function fun(){
        await setIsAuthenticate(true);
        if(cookies.token){
            let token = cookies.token;
            let res = await fetch(`${base_url}/user`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    token
                }),
            });
            let u = await res.json();
            if(u.status === 200){
                setIsAuthenticate(true);
                setUser(u.user);
                setMasterPlay(u.user.masterPlay);
                // <Navigate to={'/artist'} />
            }else if(u.status === 404){
                // render Login page
                console.log("render",cookies.token);
                removeCookie('token');
                setIsAuthenticate(false);
                <Navigate to={'/login'} />
            }else{
                removeCookie('token');
                alert(u.message);
                

            }
        }
    }

    return (
        <LoginContext.Provider value={{isAuthenticate, setIsAuthenticate, user, setUser, masterPlay, setMasterPlay, cookies, setCookie, removeCookie, relodeUser, setRelodeUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;
