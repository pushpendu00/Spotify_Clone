import React from 'react';

const Buttonloginsignup = (props) => {
    const {name, type, handelSubmit} = props;
    return (
        <div className='w-full py-6'>
            <button type={type} className={`w-full bg-green-500 hover:bg-green-600 rounded-full py-3 text-[19px]`}>{name}</button>
        </div>
    );
}

export default Buttonloginsignup;
