import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import service from '../assets/icons/service.svg';
import AddServiceMain from '../components/AddService';


function ServiceRecords () {
    return (
        <div>
        <HeaderSmall />
        <div className="user-profile">
        <img src={service} alt="service" className="page-img" />
        <AddServiceMain />
        </div>
        </div>
        
    )
}

export default ServiceRecords;