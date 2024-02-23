import React from 'react';
import { category } from '../../util/fakeData/categories';

const SearchDefaultComponent = () => {
    return (
        <>
            <div className='pb-3 text-[30px] font-bold'>Browse all</div>
            <div className='flex flex-wrap justify-center gap-3'>
                {category.map((cat, index)=>(
                    // return (
                        <div key={index} className={`each-playlist-card p-4 ${cat.bg_color} overflow-hidden rounded-lg hover:shadow-lg cursor-pointer`}>
                            <div className='h-[150px] w-[150px] relative '>
                                <img className='h-[80px] w-[80px] absolute rotate-[30deg] bottom-[-20px] right-[-35px]' src={cat.url} alt={cat.name} />
                                <div className='absolute top-3 left-3 text-[25px] font-bold'>{cat.name}</div>
                            </div>
                        </div>
                    // )
                ))}
            </div>
        </>
    );
}

export default SearchDefaultComponent;
