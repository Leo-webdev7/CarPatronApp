import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import service from '../assets/icons/service.svg';
import AddServiceForm from '../components/AddServiceForm'


function ServiceRecords () {
    return (
        <div>
        <HeaderSmall />
        <div className="user-profile">
        <img src={service} alt="service" className="user-profile-img" />
        <AddServiceForm />
        
        </div>
        </div>
        
    )
}

export default ServiceRecords;