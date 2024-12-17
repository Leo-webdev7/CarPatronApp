import {useEffect} from 'react';
import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
import service from '../assets/icons/service.svg';
import AddServiceMain from '../components/AddService';


function ServiceRecords () {
    useEffect(() => {
        document.body.classList.add('custom-body');
    }, []);
    
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