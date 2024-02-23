import React from 'react';
import NavBarComponent from '../navbar/NavBarComponent';

const ResultSearchComponent = () => {
    return (
        <>
            <div className='h-full bg-[#262626] rounded-md'>
                {/* navbar */}
                <NavBarComponent />
                <main className='w-full h-[calc(100%-4rem)] px-4 py-3
                    overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300'>
                        hello
                    </main>
            </div>
        </>
    );
}

export default ResultSearchComponent;
