import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/login/loginContext';
import { base_url } from '../util/constant';
import { postMethod } from '../util/methods';

const AllSongs = () => {
    const loginContext = useContext(LoginContext);
    // const userContext = useContext(UserContext);
    const [songs, setSongs] = useState([]);

    useEffect(()=>{
        fun();
    },[])

    async function fun(){
        const response = await fetch(`${base_url}/song`);
        const result = await response.json();
        // console.log(result.songs);
        setSongs(result.songs);
        // console.log(songs);
    }

    async function handelCurrentPlaySong(song){
        let result = await postMethod('/set-master-play',{token : loginContext.cookies.token, songId : song._id});
        // console.log(result)
        loginContext.setMasterPlay(song);
    }

    return (
        <>
        <Link to={'/'}>Home</Link>
       <div>
        All song
       </div>
        <div className=' h-[80vh] overflow-y-scroll'>
            {songs.map((song,index)=>(
                <div key={index} className='gap-2 flex flex-col cursor-pointer' onClick={()=>handelCurrentPlaySong(song)}>
                    <div>
                        <audio controls>
                            <source src={song.songUrl} type='audio/mpeg' />
                        </audio>
                        title : {song.songTitle} <br />
                        artist : {song.artist}
                    </div> <br />
                </div>
            ))}
        </div>
        {/* <PlaySongComponent /> */}
        </>
    );
}

export default AllSongs;
