import React from 'react';

const InputComponent = (props) => {
    const {type,placeHolder,label,value, setValue} = props;
    return (
        <div className='w-full flex flex-col py-2'>
            <label htmlFor={label} className='text-white mb-2'>
                {label} <span className='text-red-500'>*</span>
            </label>
            <input id={label} value={value} onChange={(e)=>setValue(e.target.value)} type={type} placeholder={placeHolder} required className='w-full px-2 py-3 rounded-md bg-[#2d2d2d] text-white border border-white focus:outline-none focus:border-[#fff] focus:ring-[#fff] focus:ring-2' />
        </div>
    );
}

export default InputComponent;
