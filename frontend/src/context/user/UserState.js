import { useContext, useEffect } from 'react';
import LoginContext from '../login/loginContext';
import UserContext from './UserContext';

const UserState = (props)=>{
    const loginContext = useContext(LoginContext);


    useEffect(()=>{
        // setPlaySong({'a':"pupai", 'b' : "jana"});
        // setMasterPlay(loginContext.user.masterPlay)
        // handelMasterPlay();
    },[])

    // async function handelMasterPlay(){
    //     try{
    //         console.log("hello",loginContext.isAuthenticate);
    //         if(loginContext.cookies.token){
    //             const body = {
    //                 // user_id : Cookies.token,
    //                 token : loginContext.cookies.token,
    //             }
    //             console.log("hello master play",body);
    //             let masterSong = postMethod('/get-master-play',{token : loginContext.cookies.token});
    //             setMasterPlay(masterSong.song);
    //         }
    //     }catch(err){
    //         console.log(err);
    //         toast.error("you can't play song....server problem");
    //     }
    // }
    return (
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserState;