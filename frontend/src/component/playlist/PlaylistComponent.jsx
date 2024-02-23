import React, { useState } from 'react';
import NavBarComponent from '../navbar/NavBarComponent';

const PlaylistComponent = () => {
    const [isLoggedIn] = useState('bk');
    return (
        <>
            <div className='PlayList-component h-full w-full bg-[#262626] rounded-md text-[#fff]'>
                <NavBarComponent />
                
                <main className='w-full h-[calc(100%-4rem)] px-4 py-3
                            overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300'>
                    <div className='flex flex-wrap justify-center gap-5'>
                    {
                        (() => {
                            if('a'=== isLoggedIn) {
                                    return (
                                        <p>Hi</p>
                                    )
                                } else if ('b'=== isLoggedIn) {
                                    return (
                                    <p>Hello</p>
                                    )
                                } else {
                                    return (
                                        <p>Bye</p>
                                    )
                                }
                        })()
                    }
                    </div>
                </main>
            </div>
        </>
    );
}

export default PlaylistComponent;
