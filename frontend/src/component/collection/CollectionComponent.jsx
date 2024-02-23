import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContext from '../../context/login/loginContext';
import { base_url } from '../../util/constant';
import { postMethod } from '../../util/methods';
import NavBarComponent from '../navbar/NavBarComponent';

const CollectionComponent = (props) => {
    const Navigate = useNavigate();
    const loginContext = useContext(LoginContext);
    const {songs} = props;

    async function handelCurrentPlaySong(song){
        if(loginContext.isAuthenticate){
            let result = await postMethod('/set-master-play',{token : loginContext.cookies.token, songId : song._id});
            // console.log(result)
            loginContext.setMasterPlay(song);
        }else{
            toast.warn("Log In Now to Listening Song !")
            return;
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
            // loginContext.setIsAuthenticate(result.user);
            loginContext.setRelodeUser(prev=>!prev);
        }else if(result.status === 202){
            toast.warn(result.message+'. '+'Please Refresh the page...');
        }else{

        }
    }


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
            <div className='h-full w-full text-white bg-[#262626]'>
                <NavBarComponent />
                <main className='w-full h-[calc(100%-4rem)] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300'>
                    <div style={{background : 'linear-gradient(180deg, rgba(36,10,63,1 ) 0%, rgba(55,3,109,1) 65%)'}}  className={`p-3 flex items-end w-full h-[35vh] bg-blue-900  bg-center bg-cover`}>
                        <img className='h-[65%] shadow-lg  shadow-blue-950 rounded-md aspect-square' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="Like" />
                        <div className='pl-5'>
                            <p>Playlist</p>
                            <p className="gd-back-artist-name text-[50px] md:text-[60px] font-sans font-bold">Liked Songs</p>
                            <p>{loginContext.user.firstName+" "+loginContext.user.lastName}</p>
                        </div>
                    </div>

                    <div style={{background : 'linear-gradient(180deg, rgba(39,1,78,1) 0%, rgba(38,38,38,1) 65%)'}} className="px-4 py-3 ">
                        <div className='p-2 flex items-center gap-[20px]'>
                            <div className="h-[60px] hover:scale-105 aspect-square flex justify-center items-center bg-green-500 rounded-full cursor-pointer">
                                <Icon icon="mdi:play" height={40} color='black' />
                            </div>

                        </div>
                        <p className="text-[30px] font-bold py-2">Songs</p>
                        <div className="w-full md:p-5">
                            {/* <SongComponent songs={loginContext.user.likesong}/> */}

                            {loginContext.user.likesong?.map((song,index)=>(
                                <div key={index} className='w-full gap-2 flex flex-col'>
                                    <div className="w-full flex justify-between p-2 hover:bg-[#4a4a4a] rounded-md">
                                        <div className="w-full md:w-[80%] flex items-center gap-3 md:gap-5 cursor-pointer">
                                            <div className="w-[20px] flex items-center justify-center">
                                                <div onClick={()=>handelCurrentPlaySong(song)}>{index+1}</div>
                                            </div>
                                            <div className="h-[50px] w-[50px]"><img className="h-full w-full" src={require('../../util/image/music-thumbnil.png')} alt="" /></div>
                                            <div className="w-[calc(100%-150px)] text-[16px] line-clamp-1">
                                                <span onClick={()=>handelCurrentPlaySong(song)} className='hover:underline '>{song.songTitle}</span>
                                                <div className='text-[12px] text-[#afafaf] line-clamp-1'>
                                                    <span className='hover:underline' onClick={()=>handelArtistPage(song.artist)}>{song.artist}</span>
                                                </div>
                                            </div>
                                            <div className="md:hidden cursor-pointer flex justify-center items-center">
                                                <Icon  icon="ph:dots-three-vertical-light" height={30} color="#ff"/>
                                            </div>
                                        </div>
                                        <div className="w-0 md:w-[20%] flex justify-between gap-3">
                                            <div className='hidden md:flex items-center'>
                                                <Icon className="text-green-500 cursor-pointer" icon="wpf:like" height={30} onClick={()=>HandelLike_btn(song._id, false)} />
                                            </div>
                                            <div className="hidden md:flex text-[16px] items-center">
                                                00:30
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CollectionComponent;
