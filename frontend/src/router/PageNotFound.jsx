import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            Page Not Found <br />
            <Link to={'/'}>Home</Link>
        </div>
    );
}

export default PageNotFound;
