import {useEffect} from 'react';
// pages/AddVehicle.js
import '../App.css'; 
import VehicleForm from '../components/AddVehicleForm.js';
import HeaderSmall from '../components/HeaderSmall';

function AddVehicle() {
  useEffect(() => {
    document.body.classList.add('custom-body');
  }, []);
return (
  <>
    <div className="add-vehicle-page">
      <HeaderSmall />
      <VehicleForm/>
    </div>
  </> 
  );
};

export default AddVehicle;
