import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import NavBarComponent from '../navbar/NavBarComponent';
import './HomeComponent.css';

import { category } from '../../util/fakeData/categories';

const HomeComponent = () => {
    const [playlistArray, setplaylistArray] = useState(category);

    return (
        <>
            <div className='h-full w-full bg-[#262626] rounded-md text-[#fff]'>
                    <NavBarComponent />
                    
                    <main className='w-full h-[calc(100%-4rem)] px-4 py-3
                                overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300'>
                        <div className='flex flex-wrap justify-center gap-5'>
                            {playlistArray.map((playlist, index)=>(
                                
                                    <div key={index} className='w-[160px] md:w-[180px] each-playlist-card relative p-4 bg-[#373636] rounded-lg hover:bg-[#4a4a4a] hover:shadow-lg cursor-pointer'>
                                        <img className='w-full aspect-square  rounded-md' src={playlist.url} alt="PlayList" />
                                        <div className='line-clamp-2'>{playlist.name}</div>
                                        <div className='h-auto w-full text-[14px] text-[#a1a1a1] line-clamp-2'>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate facilis officiis maxime saepe unde perspiciatis expedita labore id voluptatum? Id, optio unde architecto nisi numquam hic autem cupiditate deleniti. Esse!
                                        </div>
                                        <div className='hover-play-btn p-2 rounded-full absolute bottom-[90px] right-6 hidden bg-green-600'>
                                            <Icon icon="mdi:play" height={30} color='black' />
                                        </div>
                                    </div>
                                
                            ))}
                        </div>
                    </main>

                    {/* <div className='h-16 w-full bg-green-300 rounded-bl-md rounded-br-md'> */}
                        {/* <PlaySongComponent /> */}
                    {/* </div> */}
            </div>
        </>
    );
}

export default HomeComponent;
