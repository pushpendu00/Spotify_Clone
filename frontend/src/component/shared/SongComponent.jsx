import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContext from '../../context/login/loginContext';
import { postMethod } from '../../util/methods';
import IsLikeSongComponent from './IsLikeSongComponent';

const SongComponent = (props) => {
    const loginContext = useContext(LoginContext);
    const location = useLocation();
    const Navigate = useNavigate();
    const {songs, visibleArtistName} = props;

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
            {songs?.map((song,index)=>(
                <div key={index} className='w-full gap-2 flex flex-col'>
                    <div className="w-full flex justify-between p-2 hover:bg-[#4a4a4a] rounded-md">
                        <div className="w-full md:w-[80%] flex items-center gap-3 md:gap-5">
                            <div className="w-[30px] flex items-center justify-center">
                                <div className='cursor-pointer' onClick={()=>handelCurrentPlaySong(song)}>{index+1}</div>
                            </div>
                            <div className="h-[50px] w-[50px]"><img className="h-full w-full" src={require('../../util/image/music-thumbnil.png')} alt="" /></div>
                            <div className="w-[calc(100%-160px)] text-[16px]">
                                <div className='line-clamp-1'>
                                    <span onClick={()=>handelCurrentPlaySong(song)} className='cursor-pointer hover:underline'>{song.songTitle}</span>
                                </div>
                                {visibleArtistName?(
                                        <div className='text-[12px] text-[#afafaf] line-clamp-1'>
                                            <span className='hover:underline cursor-pointer' onClick={()=>handelArtistPage(song.artist)}>{song.artist}</span>
                                        </div>
                                    ):(<></>)}
                            </div>

                            <div className="md:hidden cursor-pointer flex justify-center items-center">
                                <Icon  icon="ph:dots-three-vertical-light" height={30} color="#ff"/>
                            </div>
                        </div>
                        <div className="w-0 md:w-[20%] flex justify-between gap-3">
                            {loginContext.isAuthenticate?(
                                <>
                                    <IsLikeSongComponent song={song} classname={'hidden md:flex'}/>
                                </>
                            ):(<></>)}
                            <div className="hidden md:flex text-[16px] items-center">
                                00:30
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SongComponent;
