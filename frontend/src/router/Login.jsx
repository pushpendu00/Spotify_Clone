import React, { useContext } from 'react';

import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Buttonloginsignup from '../component/shared/Buttonloginsignup';
import InputComponent from '../component/shared/InputComponent';
import LoginContext from '../context/login/loginContext';
import { postMethod } from '../util/methods';


const Login = () => {
    const loginContext = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        const body = {email,password}
        // console.log("login");
        const response = await postMethod('/auth/login',body);
        // console.log(response);
        if(response.status === 200){
            // login successfully
            toast.success(response.message);
            loginContext.setCookie("token",response.token);
            // loginContext.setIsAuthenticate(true);
            loginContext.setRelodeUser(prev=>!prev);
            // loginContext.setUser(response.user);
            Navigate('/');
        }else if(response.status === 401){
            // Incorrect Password
            toast.warn(response.message);

        }else if(response.status === 404){
            // User not registered
            toast.warn(response.message);

        }else{
            toast.error(response.message);
        }
    }

    return (
        <div className='w-full h-full bg-[#000] md:bg-[#1d1d1d] overflow-y-scroll scrollbar-hide'>
            <div className='w-full p-6 bg-black flex justify-center'>
                <Link to={'/'}>
                    <Icon icon="logos:spotify" className='text-[35px] md:text-[40px]'/>
                </Link>
            </div>
            <div className='w-full md:mt-10 md:p-5 flex justify-center items-center'>
                <div className='w-full p-10 md:w-3/5 lg:w-2/5  bg-black text-white flex flex-col justify-center items-center md:rounded-lg'>
                    <div className='text-[40px] font-bold text-center'>Log in to Spotify</div>
                    <div className='my-8 w-full border-b border-[#9d9d9d]'></div>
                    <form className='w-full' onSubmit={handelSubmit}>
                        <InputComponent value={email} setValue={setEmail} type={'email'} placeHolder={"name@domain.com"} label={"Email address"}/>
                        <InputComponent value={password} setValue={setPassword} type={'password'} placeHolder={"Password"} label={"Password"}/>
                        <Buttonloginsignup type={'submit'} name={'Log In'} py={3}  />
                    </form>
                    <div><Link to={'/forgot-password'} className='border-b-2 hover:text-green-500  hover:border-green-500'>Forgot your password?</Link></div>
                    <div className='my-8 w-full border-b border-[#9d9d9d]'></div>
                    <div>Don't have an account? <Link to={'/signup'} className='border-b-2 hover:text-green-500 hover:border-green-500'>Sign up for Spotify</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
