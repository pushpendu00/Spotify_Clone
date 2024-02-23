import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBarComponent from '../component/navbar/NavBarComponent';
import LibraryArtists from '../component/shared/LibraryArtists';
import LibraryPlaylist from '../component/shared/LibraryPlaylist';
import LoginContext from '../context/login/loginContext';
// import Naviconcomponent from '../component/shared/naviconcomponent';

const LibraryComponent = () => {
    const  loginContext = useContext(LoginContext);
    return (
        <>
        {/* <div className='h-20 w-full px-5 flex gap-10 items-center bg-[#262626]'>
            <Link to={'/'}>
                <div className='flex gap-2  items-center'>
                    <Icon icon="logos:spotify-icon" height={30}/>
                    <span className='text-[20px] font-semibold text-green-500'>Spotify</span>
                </div>
            </Link>
            <Link>
                <Icon icon="ion:search" height={30} color='gray'/>
            </Link>
        </div> */}
        <NavBarComponent />

        <div className='w-full h-[calc(100vh-9rem)] text-white gap-2 flex flex-col'>
            {/* Library */}
            {/* max-h-[500px] h-auto min-h-[300px] */}
            <div className={`h-full library bg-[#262626] flex flex-col bottom-0`}>
                <div className='flex px-5 py-0'>
                    <div className='w-full flex items-center py-4 cursor-pointe hover:text-[#fff]'>
                        <Icon icon='icomoon-free:books' className='text-[25px]' color='#929292' />&emsp;
                        <span className="text-[#929292]">
                            My Library
                        </span>
                    </div>
                    <div className='text-[30px] text-[#929292] hover:text-[#fff] flex items-center'>
                        <Icon icon="clarity:plus-line" className=' cursor-pointer rounded-full hover:bg-[#434343] p-1' />
                    </div>
                </div>

                {loginContext.isAuthenticate?(
                    <div className='w-full library-head 
                                    shadow-md shadow-[#1c1b1b] 
                                    flex items-center py-2'>
                        <div className='w-full flex items-center justify-around'>
                            <div className='px-2 py-1 bg-[#4d4d4d] rounded-full font-semibold text-[14px] cursor-pointer'>Playlist</div>
                            <div className='px-2 py-1 bg-[#4d4d4d] rounded-full font-semibold text-[14px] cursor-pointer'>Artists</div>
                            <div className='px-2 py-1 bg-[#4d4d4d] rounded-full font-semibold text-[14px] cursor-pointer'>Podcasts</div>
                        </div>
                    </div>
                ):(<></>)}

                {loginContext.isAuthenticate?(
                <>
                    <div className={` overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500`}>
                    {/* scrollbar-thin scrollbar-thumb-gray-300 */}
                        <div className='p-2'>
                            {/* Like song */}
                        {loginContext.user.likesong?.length > 0?(
                                <Link to={`/collection/likesong`} className='w-full'>
                                <div className='w-full p-2 hover:bg-[#121212] cursor-pointer flex items-center rounded-md gap-3'>
                                    <div className='h-14 aspect-square rounded-md'>
                                        <img className='h-full w-full rounded-md' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="Playlist" />
                                    </div>
                                    <div className='h-10'>
                                        <div className='font-bold line-clamp-1'>My Playlist</div>
                                        <div className='text-[14px] text-[#a1a1a1] line-clamp-1'>Playlist . {loginContext.user.likesong?.length} songs</div>
                                    </div>
                                </div>
                            </Link>
                            ):(<></>)}
                            {/* {followartist} */}
                            {loginContext.user.myplaylist?.map((element,index)=>(
                                <div key={index}>
                                    <LibraryPlaylist element={element} />
                                </div>
                            ))}
                            {/* Show all Liked Artists */}
                            {loginContext.user.followartist?.map((element,index)=>(
                                <div key={index}>
                                    <LibraryArtists element={element} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                ):(<div className='flex-1 overflow-y-scroll scrollbar-hide'>
                    <div className='mt-5 p-2 bg-[#4e4e4e] rounded-md'>
                        <p className='font-bold'>Create your first playlist</p>
                        <p>it's easy,we'll help you</p>
                        <button type='button' className='bg-[#ffffff] text-[14px] text-[#000] rounded-full mt-2 px-3 py-1 hover:scale-105'>Create playlist</button>
                    </div>
                    <div className='mt-5 p-2 bg-[#4e4e4e] rounded-md'>
                        <p className='font-bold'>Let's find some products to follow</p>
                        <p>We'll keep you update on new episodes</p>
                        <button type='button' className='bg-[#ffffff] text-[14px] text-[#000] rounded-full mt-2 px-3 py-1 hover:scale-105'>Browse podcasts</button>
                    </div>
                    {loginContext.isAuthenticate === true ?(<>
                        {/* <div className='text-white'>hello</div> */}
                    </>):(<>
                        <ul className='flex gap-3 flex-wrap my-5 p-3 text-[12px] text-gray-500'>
                            <li className='cursor-pointer hover:text-gray-300 '>Legal</li>
                            <li className='cursor-pointer hover:text-gray-300'>Privacy Center</li>
                            <li className='cursor-pointer hover:text-gray-300'>Privacy Policy</li>
                            <li className='cursor-pointer hover:text-gray-300'>Cookies</li>
                            <li className='cursor-pointer hover:text-gray-300'>About Ads</li>
                            <li className='cursor-pointer hover:text-gray-300'>Accessibility</li>
                        </ul>
                        <button className='border-2 border-white flex items-center px-3 py-2 rounded-full mx-5 my-3 hover:scale-105'>
                            <Icon icon="tabler:world" height={20} />
                            <span className='text-[13px]'>English</span>
                        </button>
                    </>)}
                </div>)}
            </div>
        </div>
    </>)
}

export default LibraryComponent;
