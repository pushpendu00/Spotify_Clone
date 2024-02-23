import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import LoginContext from '../../context/login/loginContext';
import { base_url } from '../../util/constant';
import './NavBarComponent.css';

const NavBarComponent = (props) => {
    const {searchItem, setSearchItem, setDefaultSearch, setSearchResult_artist, setSearchResult_songs, setVisibleSpinner} = props;
    const  loginContext = useContext(LoginContext);
    const [profile_after_hover, setProfile_after_hover] = useState(false);
    const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
    const location = useLocation();
    const Navigate = useNavigate();
    // const history = useHistory();

    useEffect(()=>{
        // console.log('len - ',location.pathname.length);
        // console.log(location.pathname.match('/search'))
        if(location.pathname === '/search'){
            // setDefaultSearch(false);
            if(location.pathname.length > 8){
                setDefaultSearch(false);
                setSearchItem(location.pathname.substring(8));
                console.log("lentth =",location.pathname.substring(8))
                searchFun();
            }
        }
    },[])


    async function handelLogout(){
        // console.log("Logout",loginContext.cookie);
        await loginContext.removeCookie('token');
        loginContext.setIsAuthenticate(false);
        Navigate('/');
    }

    async function HandelSearch(e){
        // if(searchItem!==""){
            if(e.key === 'Enter'){
                if(searchItem!==""){
                    setDefaultSearch(false);
                    setVisibleSpinner(true);
                    await searchFun();
                }else{
                    setDefaultSearch(true);
                }
                
            // }
        }
        // console.log(searchItem);
    }
    async function searchFun(){
        setDefaultSearch(false);
        Navigate(`/search/${searchItem}`);
        const result = await fetch(`${base_url}/search/${searchItem}`);
        const jsonResult = await result.json();
        setSearchResult_artist(jsonResult.artists);
        setSearchResult_songs(jsonResult.songs);
        setVisibleSpinner(false);
        // console
        // console.log(jsonResult);
    }




    return (<>
        <nav className='w-full h-16 px-4 py-2 lg:rounded-tl-md lg:rounded-tr-md bg-[#1e1d1d] flex gap-2 items-center'>
            <div className='w-3/12 md:w-2/12 hidden md:flex lg:items-center gap-2'>
                <div className='text-[16px] text-[#848484] p-2 bg-[#151414] hover:bg-[#0d0d0d] hover:text-[#fff] rounded-full cursor-pointer'>
                    <FaChevronLeft />
                </div>

                <div className='text-[16px] text-[#848484] p-2 bg-[#151414] hover:bg-[#0d0d0d] hover:text-[#fff] rounded-full cursor-pointer'>
                    <FaChevronRight />
                </div>
            </div>
        {/* visible spotify icon from md(768px - infinity)*/}
            <div className='w-3/12 md:w-2/12 visible md:hidden'>
                <Link to={'/'}>
                    <Icon icon="logos:spotify" className='text-[25px]'/>
                </Link>
            </div>

            <div className={`h-full w-9/12 md:w-10/12 flex ${location.pathname === '/search'?"justify-between":"justify-between md:justify-end"}`}>
                {/* visible search bar function */}
                {location.pathname === '/search'? (
                    <div className='h-full md:w-3/12 w-[65%]  flex gap-2 items-center relative hover:border-2 rounded-full md:hover:scale-105'>
                        <Icon icon="tdesign:search" className='absolute left-3 text-[#adadad]' />
                        <input 
                                autoFocus
                                value={searchItem}
                                onChange={(e)=>setSearchItem(e.target.value)}
                                onKeyUp={HandelSearch}
                                type="text"
                                id='search-input'
                                placeholder='What do you want to listen to?' 
                                className='h-full w-full bg-[#535353] placeholder:text-[14px] placeholder:text-[#afacac] 
                                            px-9 focus:outline-1 focus:outline-[#fff] 
                                            border-[#fff] rounded-full' />
                        {searchItem?(
                            <div onClick={()=>setSearchItem('')} className='absolute right-5 cursor-pointer'>
                                <Icon icon="bitcoin-icons:cross-filled" height={20}/>
                            </div>
                        ):(<></>)}
                    </div>
                ):(<>
                    <div className='w-3/12 flex items-center text-[30px]  md:hidden'>
                        <NavLink to={'/search'} 
                            style={({ isActive }) => ({
                                color: isActive ? "white" : "#929292",
                            })}
                        >
                            <Icon icon="ion:search" />
                        </NavLink>
                    </div>
                </>)}
                <div className=' flex items-center gap-4'>
                    {!loginContext.isAuthenticate?(<>
                        <ul className=' lg:flex gap-3 justify-end hidden lg:visible'>
                        <li className='text-[#adadad] font-bold cursor-pointer hover:text-[#fff] hover:scale-105'>Premium</li>
                        <li className='text-[#adadad] font-bold cursor-pointer hover:text-[#fff] hover:scale-105'>Support</li>
                        <li className='text-[#adadad] font-bold cursor-pointer hover:text-[#fff] hover:scale-105'>Download</li>
                    </ul>
                    <div className='h-2/3 border-r-2 mr-3 ml-3 hidden lg:block'></div>
                    <div className=' flex gap-2 items-center'>
                        <div className='hidden md:block text-[#adadad] font-bold cursor-pointer hover:text-[#fff] hover:scale-105'>
                            <Link to={'/signup'} >Sign up</Link>
                        </div>
                        <Link to={'/login'}>
                            <div className='px-2 md:px-5 py-1 bg-[white] text-[#000] text-[14px] font-semibold rounded-full cursor-pointer hover:scale-105'>
                                Log in
                            </div>
                        </Link>

                        {/* Side Bar Icon */}
                        <div onClick={()=>setIsVisibleSidebar(true)} className='lg:hidden text-[27px] md:text-[35px] cursor-pointer'>
                            <Icon icon="fe:bar"/>
                        </div>
                        {/* {!isVisibleSidebar?(
                            <div onClick={()=>setIsVisibleSidebar(true)} className='md:hidden cursor-pointer '>
                                <Icon icon="fe:bar" height={35} />
                            </div>
                        ):(
                            <div onClick={()=>setIsVisibleSidebar(false)} className='cursor-pointer'>
                                <Icon icon="radix-icons:cross-2" height={35}/>
                            </div>
                        )} */}
                    </div>
                    </>):(
                            <>
                                <div className='px-2 py-2 hidden md:block md:px-5 md:py-2 bg-[white]  text-[#000] font-semibold rounded-full cursor-pointer text-center hover:scale-105'>
                                    Explore Premium
                                </div>
                                <div className='h-4/5 hidden lg:flex aspect-square text-[20px] bg-[#0e0e0e] text-[#bdbdbd] hover:text-[#fff] hover:scale-110 rounded-full items-center justify-center cursor-pointer'>
                                    <Icon icon="mi:notification" />
                                </div>
                                <NavLink to={'/library'} 
                                    style={({ isActive }) => ({
                                        color: isActive ? "white" : "#929292",
                                    })}
                                >
                                    <div className='md:hidden flex flex-col items-center gap-1'>
                                        <Icon icon='icomoon-free:books' className='text-[25px]' />
                                        {/* <span className='text-[10px]'>My Library</span> */}
                                    </div>
                                </NavLink>
                                <div className='h-4/5 relative'>
                                    <div onClick={()=>setIsVisibleSidebar(true)}  className='show-side-bar md:hidden profile-nickName h-full aspect-square font-bold text-[18px] bg-[#29b1ff] text-[#000] hover:scale-110 rounded-full flex items-center justify-center cursor-pointer'>
                                        {loginContext.user.nickName}
                                    </div>
                                    <div onClick={()=>setProfile_after_hover(prev=>!prev)}  className='hidden profile-nickName h-full aspect-square font-bold text-[18px] bg-[#29b1ff] text-[#000] hover:scale-110 rounded-full md:flex items-center justify-center cursor-pointer'>
                                        {loginContext.user.nickName}
                                    </div>
                                    {profile_after_hover === true?(
                                        <div onClick={()=>setProfile_after_hover(prev=>!prev)} className='profile-after-hover z-[5] absolute w-40 p-2 bg-[#0e0e0e] right-0 top-12 rounded-md'>
                                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Account</div>
                                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Profile</div>
                                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Settings</div>
                                            <div className='border-b-[1px] border-[#6c6c6c]'></div>
                                            <div onClick={()=>handelLogout()} className='p-2 hover:bg-[#1f1f1f] rounded-sm cursor-pointer'>Log out</div>
                                        </div>
                                    ):(
                                        <></>
                                    )}
                                </div>
                                {/* {!isVisibleSidebar?(
                                    <div onClick={()=>setIsVisibleSidebar(true)} className='md:hidden cursor-pointer '>
                                        <Icon icon="fe:bar" height={35} />
                                    </div>
                                ):(
                                    <div onClick={()=>setIsVisibleSidebar(false)} className='cursor-pointer'>
                                        <Icon icon="radix-icons:cross-2" height={35}/>
                                    </div>
                                )} */}
                            </>
                        )}
                </div>
            </div>
        </nav>
        <div onClick={()=>setIsVisibleSidebar(false)} className={`${isVisibleSidebar?('flex'):('hidden')} z-[4] h-[100vh] w-[100%] absolute top-0 right-0 bg-transparent bg-green-400`}>
            <div className='h-full w-[70%] md:w-[30%] absolute bg-[#494949] top-0 right-0 opacity-100'>
                {loginContext.isAuthenticate?(
                <>
                    <div className='h-20 w-full p-4 flex gap-3 items-center'>
                        <div className='h-full aspect-square font-bold text-[22px] bg-[#29b1ff] text-[#000000] rounded-full flex  items-center justify-center cursor-pointer'>
                            {loginContext.user.nickName}
                        </div>
                        <div>
                            <div className='font-semibold text-[18px] text-[#e3e3e3] line-clamp-1'>{loginContext.user.firstName}{" "}{loginContext.user.lastName}</div>
                            <div className='font-semibold text-[13px] text-[#939393] cursor-pointer hover:underline'>View profile</div>
                        </div>
                    </div>
                    <div className='border-b-[1px] border-[#a7a7a7]'></div>
                </>
                ):(<></>)}
                <div className='p-4 text-[#dddddd]'>
                    <Link to={'/'} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                        {/* <Icon icon="ep:setting" height={25}/> */}
                        <Icon icon="ant-design:home-filled" className='text-[25px]' />
                        <div className='p-2 cursor-pointer rounded-sm'>Home</div>
                    </Link>

                    <Link to={'/search'} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                        <Icon icon="tdesign:search" height={25} />
                        <div className='p-2 rounded-sm cursor-pointer'>Search</div>
                    </Link>

                    {loginContext.isAuthenticate?(
                        <Link className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="mdi:account" height={25}/>
                            <div className='p-2 cursor-pointer hover:bg-[#1f1f1f] rounded-sm'>Account</div>
                        </Link>
                    ):(<></>)}

                    <Link className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                        <Icon icon="ep:setting" height={25}/>
                        <div className='p-2 cursor-pointer rounded-sm'>Settings</div>
                    </Link>



                    {loginContext.isAuthenticate?(
                        <div onClick={()=>handelLogout()} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                            <Icon icon="ic:round-logout" height={25}/>
                            <div className='p-2 rounded-sm cursor-pointer'>Log out</div>
                        </div>
                    ):(
                        <>
                            <Link to={'/login'} className='flex items-center px-1 hover:bg-[#1f1f1f] rounded-md'>
                                <Icon icon="ic:outline-login" height={25}/>
                                <div className='p-2 rounded-sm cursor-pointer'>Log in</div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
    );
}

export default NavBarComponent;




