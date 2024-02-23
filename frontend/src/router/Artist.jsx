import React, { useContext } from 'react';
import ArtistComponent from '../component/artist/ArtistComponent';
import SidebarComponent from '../component/sidebar/SidebarComponent';
import LoginContext from '../context/login/loginContext';
const Artist = () => {
    // const{isAuthenticate, artistId} = props;
    const loginContext = useContext(LoginContext);

    return (
        <>
            <div className={`Artist-page ${loginContext.isAuthenticate?(`${loginContext.masterPlay?('h-[calc(100%-5rem)]'):('h-[calc(100%)]')}`):('h-[calc(100%-5rem)]')} w-full bg-black flex`}>
                {/* <div className='h-full w-full flex'> */}
                    {/* laptop => side bar  &  phone => nav bar*/}
                    
                    <div className='sidebar-component 
                                    h-full w-0 hidden
                                    md:block md:w-4/12 md:px-2 pt-2 mb-4
                                    lg:w-3/12 
                                    xl:w-1/5 
                                    bg-black text-white font-semibold'>
                        <SidebarComponent />
                    </div>
                    

                    {/* main content */}
                    <div className='main-component h-full w-full 
                                    md:w-8/12 md:pt-2 md:pr-2 
                                    lg:w-9/12 
                                    xl:w-4/5 
                                    text-white'>
                        <ArtistComponent />
                    </div>
                {/* </div> */}
            </div>
            {/* <div className='h-20 p-2 bg-black'>
                <PlaySongComponent />
            </div> */}
        </>
    );
}

export default Artist;
