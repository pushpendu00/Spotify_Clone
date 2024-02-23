import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import LoginContext from '../../context/login/loginContext';
import NavBarComponent from '../navbar/NavBarComponent';
import SongComponent from '../shared/SongComponent';
import SearchDefaultComponent from './SearchDefaultComponent';

const SearchComponent = () => {
    const loginContext = useContext(LoginContext);
    const [defaultSearch,setDefaultSearch] = useState(true);
    const [searchItem, setSearchItem] = useState("");
    const [searchResult_artist, setSearchResult_artist] = useState([]);
    const [searchResult_songs, setSearchResult_songs] = useState([]);
    const [visibleSpinner, setVisibleSpinner] = useState(false);
    const location = useLocation();



    return (
        <>
            <div className='h-full bg-[#262626] rounded-md'>
                {/* navbar */}
                <NavBarComponent  searchItem={searchItem} 
                            setSearchItem={setSearchItem} 
                            setDefaultSearch={setDefaultSearch} 
                            setSearchResult_artist={setSearchResult_artist} 
                            setSearchResult_songs={setSearchResult_songs} 
                            setVisibleSpinner={setVisibleSpinner} />
                <main className='w-full h-[calc(100%-4rem)] px-4 py-3
                    overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300'>
                        
                        {defaultSearch === true?(
                            <SearchDefaultComponent />
                        ):(
                            <>
                                {!visibleSpinner?(
                                    <>
                                        {searchResult_artist?.length > 0 || searchResult_songs?.length > 0 ?(
                                            <>
                                                <div className='show-search-result'>
                                                {/* <div className='text-[20px] py-2 font-bold'>Artist :</div> */}
                                                    <div className='w-full flex flex-wrap justify-center gap-5'>
                                                        {searchResult_artist.map((artist, index)=>(
                                                            <Link key={index} to={`/artist/${artist._id}`}>
                                                                <div className='w-[160px] md:w-[200px] each-playlist-card relative p-3 bg-[#373636] rounded-lg hover:bg-[#4a4a4a] hover:shadow-lg cursor-pointer'>
                                                                    <img className=' w-full aspect-square rounded-full' src={artist.avatar} alt="Profile" />
                                                                    <div className='w-full text-[18px] text-[#ffffff] font-semibold line-clamp-1'>{artist.artist}</div>
                                                                    <div className='text-[14px] text-[#a1a1a1] pb-5'>
                                                                        Artist
                                                                    </div>
                                                                    <div className='hover-play-btn p-2 rounded-full absolute bottom-[40%] right-[15%] hidden bg-green-600'>
                                                                        <Icon icon="mdi:play" height={30} color='black' />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                    <div className='text-[20px] py-2 font-bold'>Songs :</div>
                                                    <SongComponent songs={searchResult_songs} visibleArtistName={true} className={'hidden md:flex items-center'}/>
                                                </div>
                                            </>):(<>
                                                <div className='flex items-center justify-center'>
                                                    No results found for "{searchItem}"
                                                </div>
                                            </>)}
                                    </>
                                ):(
                                    <>
                                        <div className="w-full h-full flex justify-center items-center">
                                            {/* <Icon icon="eos-icons:three-dots-loading" height={100}/> */}
                                            <SpinnerCircular size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </main>
            </div>
        </>
    );
}

export default SearchComponent;
