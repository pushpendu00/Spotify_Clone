
import { Icon } from '@iconify/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Naviconcomponent = (props) => {
    const {icon, name, path} = props;
    return (
        <div className='w-full px-2 hover:bg-[#1e1e1e]'>
            <NavLink to={path}
                    style={({ isActive }) => ({
                        color: isActive ? "white" : "#929292",
                    })}
                    className='w-full flex items-center py-2 cursor-pointer hover:text-[#fff]'>
                <Icon icon={icon} className='text-[25px]' />&emsp;
                <span>
                    {name}
                </span>
            </NavLink>
        </div>
    );
}

// ${isActive?"text-[#fff]":"text-[#929292]"}
export default Naviconcomponent;
