import React from 'react';
import { Link } from 'react-router-dom';

const LibraryPlaylist = (props) => {
    const{element} = props;
    return (
        <Link to={`/playlist/${element}`} className='w-full'>
        <div className='w-full p-2 hover:bg-[#121212] cursor-pointer flex items-center rounded-md gap-3'>
            <div className='h-14 aspect-square rounded-md'>
                <img className='h-full w-full rounded-md' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="Playlist" />
            </div>
            <div className='h-10'>
                <div className='font-bold line-clamp-1'>My Playlist</div>
                <div className='text-[14px] text-[#a1a1a1] line-clamp-1'>Playlist . 50 songs</div>
            </div>
        </div>
        </Link>
    );
}



export default LibraryPlaylist;
