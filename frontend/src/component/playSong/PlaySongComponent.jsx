import React, { useContext } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginContext from "../../context/login/loginContext";
import { postMethod } from "../../util/methods";
import IsLikeSongComponent from "../shared/IsLikeSongComponent";

const PlaySongComponent = () => {
    const loginContext = useContext(LoginContext);
    const Navigate = useNavigate();

    async function handelArtistPage(artist){
        try {
            const result = await postMethod('/artist/artist-name-to-artist-id',{artist});
            if(result.status === 200){
                Navigate(`/artist/${result.artist_id}`);
            }else if(result.status === 404){
                toast.warn(result.message);
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Server problem!");
        }
    }

    return (
        <>
            {loginContext.isAuthenticate?(
                <div className='text-[#fff] h-16 w-full px-3 py-1 md:rounded-bl-md md:rounded-br-md flex items-center justify-evenly'>
                    {loginContext.masterPlay?(
                    <>
                        <div className="absolute left-0 w-[25%] md:w-[25%] lg:w-[40%]">
                            <p className="pl-1 text-[12px] md:text-[18px] lg:text-[22px]">{loginContext.masterPlay.songTitle}</p>
                            <p onClick={()=>handelArtistPage(loginContext.masterPlay.artist)} className="pl-1 text-[10px] md:text-[14px] lg:text-[16px] cursor-pointer hover:underline">{loginContext.masterPlay.artist}</p>
                        </div>
                        {/* <audio controls>
                                <source className="bg-black text-[#000]" src={`${loginContext.masterPlay.songUrl}`} type="audio/mpeg"/>
                        </audio> */}
                        <div className="w-[65%] md:w-[50%] lg:w-[40%]">
                            <AudioPlayer
                                autoPlay={false}
                                src={`${loginContext.masterPlay.songUrl}`}
                                layout="stacked-reverse"
                                showSkipControls={true}
                                showJumpControls={false}
                                // customVolumeControls={[]}
                                // customIcons={{play : }}
                                // onPlay={e => console.log("onPlay")}
                                className="h-full w-full text-[#fff] text-[14px] bg-transparent"
                            
                            />
                        </div>
                        <div className="absolute right-5 md:right-10">
                            <IsLikeSongComponent song={loginContext.masterPlay} className={'flex'}/>
                        </div>
                        {/* &emsp; */}
                        {/* artist : {loginContext.masterPlay.artist} */}
                    </>
                    ):(<></>)}
            </div>
            ):(<>
                <div className="h-16" style={{background : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(227,49,255,1) 0%, rgba(95,182,246,1) 100%)"}}>
                Login Now
                </div>
            </>)}
        </>
    );
}

export default PlaySongComponent;
