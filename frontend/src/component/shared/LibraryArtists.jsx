import { Link } from 'react-router-dom';

const LibraryArtists = (props) => {
    const {element} = props;
    // const Navigate = useNavigate();



    return (
            <Link to={`/artist/${element._id}`}>
                <div className='w-full p-2 hover:bg-[#121212] cursor-pointer flex items-center rounded-md gap-3'>
                    <div className='h-14 aspect-square'>
                        <img className='h-full w-full rounded-full' src={`${element.avatar?(`${element.avatar}`):('https://imgs.search.brave.com/CLjS7FapjOWZC0gdORtiOf36Pk4N8GRdOrEm6YvIeJo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzY1LzI4LzA4/LzM2MF9GXzQ2NTI4/MDg5N184bkw2eGx2/QndVY0xZSVFCbXlY/MEdPOWZRakR3Tll0/Vi5qcGc')}`} alt="Playlist" />
                    </div>
                    <div >
                        <div className='font-bold line-clamp-1'>{element.artist}</div>
                        <div className='text-[14px] text-[#a1a1a1]'>Artists</div>
                    </div>
                </div>
            </Link>
        // </>
    );
}

export default LibraryArtists;
