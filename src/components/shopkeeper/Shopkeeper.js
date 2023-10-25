import './Shopkeeper.css';
import {Outlet} from 'react-router-dom';
import ShopkeeperNav from './ShopkeeperNav';

function Shopkeeper(){
    return (
        <div className='home'>
        <ShopkeeperNav/>
        <Outlet />
       </div>
    )

}

export default Shopkeeper;