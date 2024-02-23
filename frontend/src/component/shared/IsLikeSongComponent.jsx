import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoginContext from '../../context/login/loginContext';
import { base_url } from '../../util/constant';

const IsLikeSongComponent = (props) => {
    const [isLikeSong, setIsLikeSong] = useState(false);
    const loginContext = useContext(LoginContext);
    const {song, classname} = props;
    const [likesong, setLikeSong] = useState(loginContext.user.likesong);

    useEffect(()=>{
        // console.log("hello");
        // console.log(classname);
        fun(song);
    },[loginContext.user.likesong,]);

    function fun(song){
        // console.log("hello")
        for(let i=0;i<likesong?.length;i++){
            if(song._id === likesong[i]._id){
                setIsLikeSong(true);
                return;
            }
        }
    }

    async function HandelLike_btn(song_id, isLike){
        const token = loginContext.cookies;
        let res = await fetch(`${base_url}/song/like`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({
                song_id, isLike, token
            }),
        });
        const result = await res.json();
        if(result.status === 200){
            setIsLikeSong(true);
            loginContext.setRelodeUser(prev=>!prev);
            // setIsLikeSong(true);
        }else if(result.status === 202){
            setIsLikeSong(false);
            loginContext.setRelodeUser(prev=>!prev);
        }else{
            toast.err(result.message);
        }
    }


    return (
        <>
            {/* {loginContext.isAuthenticate === true?( */}
                <div className={`${classname} items-center`}>
                    {isLikeSong?(
                        <Icon className="text-green-500 cursor-pointer" icon="wpf:like" height={30} onClick={()=>HandelLike_btn(song._id, false)} />
                    ):(
                        <Icon className="cursor-pointer" icon="wpf:like" height={30} onClick={()=>HandelLike_btn(song._id, true)} />
                    )}


                    {/* {
                        (() => {
                            let f = 0;
                            for(let i = 0; i<likesong?.length; i++){
                                console.log("id=",song._id," ",likesong[i])
                                if(song._id === likesong[i]._id) {
                                    console.log("done")
                                    // return (
                                    //     <p>Hi</p>
                                    // )
                                }
                            }
                            return (
                                <p>hello</p>
                            )
                        })()
                    } */}

                </div>
        </>
    );
}

export default IsLikeSongComponent;
