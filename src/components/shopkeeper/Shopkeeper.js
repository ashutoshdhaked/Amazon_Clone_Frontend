import './Shopkeeper.css';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ShopkeeperNav from './ShopkeeperNav';
import ErrorPage from '../ErrorPage';

function Shopkeeper() {
    const [isError, setIsError] = useState(false);
    async function authenticate() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            setIsError(true);
            return;
        }
       const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body :JSON.stringify({})
        };
        const response = await fetch('https://amazonebackend.onrender.com/userportal/home', options);
        const userType = await response.json();
        if (userType !== 'shopkeeper') {
            setIsError(true);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);
    if (isError) {
        return <ErrorPage status="403" message="Access denied !! You are not a valid user to use this page" />;
    }

    return (
        <div className='home'>
            <ShopkeeperNav />
            <Outlet />
        </div>
    );
}

export default Shopkeeper;
