import React from 'react';
import ResultSearchComponent from '../component/searchResult/ResultSearchComponent';
import SidebarComponent from '../component/sidebar/SidebarComponent';

const SearchResult = () => {
    return (
        <>
            <div className={`Searchpage ${loginContext.masterPlay?('h-[calc(100%-5rem)]'):('h-[calc(100%)]')} w-full bg-black flex`}>
            {/* <div className='h-full w-full flex'> */}
                {/* laptop => side bar  &  phone => nav bar*/}
                
                <div className='sidebar 
                                h-full w-0 hidden 
                                md:block md:w-4/12 md:px-2 pt-2 mb-4 
                                lg:w-3/12 
                                xl:w-1/5 
                                bg-black text-white font-semibold'>
                    <SidebarComponent />
                </div>
                

                {/* main content */}
                <div className='h-full w-full 
                                md:w-8/12 md:pt-2 md:pr-2 
                                lg:w-9/12 
                                xl:w-4/5 
                                text-white'>
                    <ResultSearchComponent />
                </div>
            </div>
        </>
    );
}

export default SearchResult;
