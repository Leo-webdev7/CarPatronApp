import {useEffect} from 'react';
// pages/AddVehicle.js
import '../App.css'; 
import VehicleForm from '../components/AddVehicleForm.js';
import HeaderSmall from '../components/HeaderSmall';
import vehicle from '../assets/icons/vehicle1.svg';

function AddVehicle() {
  useEffect(() => {
    document.body.classList.add('custom-body');
  }, []);
return (
  <>
    <div className="add-vehicle-page">
      <HeaderSmall />
       <img src={vehicle} alt="profile logo" className="page-img"/>
       <h1>Add Vehicle</h1>
      <VehicleForm/>
    </div>
  </> 
  );
};

export default AddVehicle;
