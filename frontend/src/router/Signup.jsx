import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import Buttonloginsignup from '../component/shared/Buttonloginsignup';
import InputComponent from '../component/shared/InputComponent';
import LoginContext from '../context/login/loginContext';
import { postMethod } from '../util/methods';

const Signup = () => {
    const  loginContext = useContext(LoginContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [cookies, setCookie] = useCookies(['']);;

    async function handelSubmit(e){
        e.preventDefault();
        const body = {firstName, lastName, email, password}
        const response = await postMethod('/auth/register',body);
        console.log("Respones = ",response);
        if(response.status === 200){
            // Show successfully message
            toast.success("Registration Successfully");
            loginContext.setCookie("token",response.token);
            loginContext.setRelodeUser(prev=>!prev);
        }else if(response.status === 201){
            // User already loged In
            toast.warn("User Already Exist");
        }else{
            // Register error
            toast.error("Sign Up Error!");
        }
    }

    return (<>
        <div className='w-full h-full bg-[#000] md:bg-[#1d1d1d] overflow-y-scroll scrollbar-hide'>
            <div className='w-full p-6 bg-black flex justify-center'>
                <Link to={'/'}>
                    <Icon icon="logos:spotify" className='text-[35px] md:text-[40px]'/>
                </Link>
            </div>
            <div className='w-full md:mt-10 md:p-5 flex justify-center items-center'>
                <div className='w-full p-10 md:w-3/5 lg:w-2/5  bg-black text-white flex flex-col justify-center items-center md:rounded-lg'>
                    <div className='text-[40px] font-bold text-center'>Sign up to start listening</div>
                    <div className='my-8 w-full border-b border-[#9d9d9d]'></div>
                    <form className='w-full' onSubmit={handelSubmit}>
                        <InputComponent value={firstName} setValue={setFirstName} type={'text'} placeHolder={"First Name"} label={"First Name"}/>
                        <InputComponent value={lastName} setValue={setLastName} type={'text'} placeHolder={"Last Name"} label={"Last Name"}/>
                        <InputComponent value={email} setValue={setEmail} type={'email'} placeHolder={"name@domain.com"} label={"Email address"}/>
                        <InputComponent value={password} setValue={setPassword} type={'password'} placeHolder={"Password"} label={"Password"}/>
                        <Buttonloginsignup type={'submit'} name={'Sign Up'} />
                    </form>
                    <div className='my-8 w-full border-b border-[#9d9d9d]'></div>
                    <div>Already have an account? <Link to={'/login'} className='border-b-2 hover:text-green-500  hover:border-green-500'>Log in here</Link></div>
                </div>
            </div>
        </div>
            {/* <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  /> */}
    </>);
}

export default Signup;

