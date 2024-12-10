
import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 
import leftArrow from '../assets/icons/left-arrow.svg'

const HeaderSmall = () => {
  return (
    <>
      <div className='headerSmall'>
        <div>
            <a href="/HomePage"><img src={logo}  alt="Car Patron - Vehicle Maintenance Management" className="logoSmall" /></a>
        </div>
        <div>
            <h1>car patron</h1>
        </div>
        <div>
            <button className='backButton'><a href="/HomePage"><img src={leftArrow} alt="" /></a></button>
        </div>
      </div>
      
    </>
  );
};

export default HeaderSmall;