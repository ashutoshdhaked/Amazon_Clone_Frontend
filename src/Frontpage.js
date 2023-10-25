import NavBar from './components/navbar/NavBar';
import Newnavbar from './components/newnavbar/Newnavbar';
import Footer from './components/footer/Footer';
import {Outlet} from 'react-router-dom';
import './Frontpage.css';

function Frontpage() {
  return (
    <div className='home'>
     <NavBar/>
     <Newnavbar/>
     <Outlet />
     <Footer/>
    </div>
  );
}

export default Frontpage;
