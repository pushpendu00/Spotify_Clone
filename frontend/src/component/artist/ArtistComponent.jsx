import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginContext from "../../context/login/loginContext";
import { base_url } from "../../util/constant";
import NavBarComponent from "../navbar/NavBarComponent";
import SongComponent from "../shared/SongComponent";
import './ArtistStyle.css';
// import song_thumbnil from ('../../../public/image/music-thumbnil.png');


const ArtistComponent = () => {
    // const {isAuthenticate} = props;
    const location = useLocation();
    const Navigate = useNavigate();
    // const [artist_id, setArtist_id] = useState();
    const [songs, setSongs] = useState([]);
    const [artist_details,setArtist_details] = useState();
    const [spinner, setSpinner] = useState(true);
    const [threedot_div, setThreedot_div] = useState(false);
    const[follow, setFollow]= useState(false);
    // const[reload, setReload] = useState(false);
    const loginContext = useContext(LoginContext);
    const [isLikeSong, setIsLikeSong] = useState(false);

    useEffect(()=>{
        HandelGetArtistData(location.pathname.substring(8));
    },[location.pathname]);

    useEffect(()=>{
        if(loginContext.user.followartist){
            isFollow();
        }
    },[loginContext.user]);

    function isFollow(){
        for(let i=0;i<loginContext.user.followartist.length;i++){
            // console.log(loginContext.user.followartist[i]._id);
            if(loginContext.user.followartist[i]._id == location.pathname.substring(8)){
                // console.log("hello");
                setFollow(true);
                return;
            }
        }
    }

    async function HandelGetArtistData(id){
        // console.log(typeof(id),id.length);
        if(id.length === 24){

            const res = await fetch(`${base_url}/artist/${id}`);
            const result = await res.json();
            // console.log(result);
            if(result.status === 200){
                setArtist_details(result.artist);
                setSongs(result.songs);
                setSpinner(false);
            }else if(result.status === 404){
                toast.warn(result.message);
                Navigate('/not-found');
            }else if(result.status === 502){
                toast.error(result.message);
                <Navigate to={'/'} />
            }else{
                toast.warn('Page not found');
                <Navigate to={'/not-found'} />
            }
        }else{
            toast.warn('Page not found');
            <Navigate to={'/not-found'} />
        }
    }


    async function HandelClick_follow_unfollow(id,isFollow){
        if(loginContext.isAuthenticate === false){
            Navigate('/login');
        }
        const token = loginContext.cookies;
        // console.log(token);
        if(follow === false){
            const res = await fetch(`${base_url}/artist/unfollow`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    artist_id : id, token
                }),
            });
            const result = await res.json();
            if(result.status === 200){
                // setFollow(false);
                loginContext.setRelodeUser(prev=>!prev);
            }else if(result.status === 404){
                toast.warn(result.message+'. '+'Please Refresh the page...');
            }else{
                toast.error(result.message);
            }
        }else{
            // setFollow(true);
            const res = await fetch(`${base_url}/artist/follow`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    artist_id : id, token
                }),
            });
            const result = await res.json();
            if(result.status === 200){
                loginContext.setRelodeUser(prev=>!prev);
                setFollow(false);
            }else if(result.status === 404){
                toast.warn(result.message+'. '+'Please Refresh the page...');
            }else{
                toast.error(result.message);
            }
        }
    }



    return (
        <div className='h-full w-full bg-[#262626] rounded-md text-[#fff]'>
            <NavBarComponent />
            
            <main className='w-full h-[calc(100%-4rem)] 
                        overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300'>
                {spinner?(
                    <div className="w-full h-full flex justify-center items-center">
                        <Icon icon="eos-icons:three-dots-loading" height={100}/>
                    </div>
                ):(
                    <>
                        <div className=''>
                            <div style={{ backgroundImage: `url(${artist_details.avatar})` }} className={`w-full h-[35vh] flex items-end bg-green-400  bg-center bg-cover`}>
                                <p className="gd-back-artist-name pl-4 pb-5 text-[60px] font-sans font-bold">{artist_details.artist}</p> 
                            </div>

                            <div className="px-4 py-3">
                                <div className='p-2 flex items-center gap-[20px]'>
                                    <div className="h-[60px] hover:scale-105 aspect-square flex justify-center items-center bg-green-500 rounded-full cursor-pointer">
                                        <Icon icon="mdi:play" height={40} color='black' />
                                    </div>
                                    {/* Set follow and unfollow button */}
                                    {!follow?(
                                        <div onClick={()=>HandelClick_follow_unfollow(artist_details._id,true)} className="follow-btn px-4 py-1 font-bold border-[1.5px] border-[#787878] rounded-full cursor-pointer hover:scale-105">
                                            Follow
                                        </div>
                                    ):(
                                        <div onClick={()=>HandelClick_follow_unfollow(artist_details._id,false)} className="follow-btn px-4 py-1 font-bold border-[1.5px] border-[#787878] rounded-full cursor-pointer hover:scale-105">
                                            Unfollow
                                        </div>
                                    )}

                                    <div className="relative three-dot-artist-page cursor-pointer text-[#ababab] hover:text-[#fff]" title={`More options for ${artist_details.artist}`}>
                                        <Icon icon="ph:dots-three-bold" height={40} onClick={()=>setThreedot_div(prev=>!prev)} />
                                        {threedot_div?(
                                            <div onClick={()=>setThreedot_div(prev=>!prev)} className="p-1 w-[130px] text-[#b0b0b0] absolute bg-[#0f0f0f] z-[1] rounded-md">
                                                {follow === false?(
                                                    <div onClick={()=>HandelClick_follow_unfollow(artist_details._id,true)} className={`p-2 flex items-center gap-2 hover:bg-[#252525] rounded-sm`}>
                                                        <Icon icon="cil:user-follow" height={25} color="#b0b0b0" />
                                                        <p>Follow</p>
                                                    </div>
                                                ):(
                                                    <div onClick={()=>HandelClick_follow_unfollow(artist_details._id,false)} className={`p-2 flex items-center gap-2 hover:bg-[#252525] rounded-sm`}>
                                                        <Icon icon="cil:user-unfollow" height={25} color="#b0b0b0" />
                                                        <p>Unfollow</p>
                                                    </div>
                                                )}
                                                <div className="p-2 flex items-center gap-2 hover:bg-[#252525] rounded-sm">
                                                    <Icon icon="ic:outline-report" height={25} color="#b0b0b0" />
                                                    <p>Report</p>
                                                </div>
                                                <div className="p-2 flex items-center gap-2 hover:bg-[#252525] rounded-sm">
                                                    <Icon icon="ion:share-outline" height={25} color="#b0b0b0" />
                                                    <p>Share</p>
                                                </div>
                                            </div>
                                        ):(<></>)}
                                    </div>
                                </div>
                                <p className="text-[30px] font-bold py-2">Songs</p>
                                <div className="w-full md:p-5">
                                    <SongComponent songs={songs} visibleArtistName={false}/>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default ArtistComponent;
