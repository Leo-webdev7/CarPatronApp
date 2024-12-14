// pages/AddVehicle.js
import '../App.css'; 
import VehicleForm from '../components/AddVehicleForm.js';
import HeaderSmall from '../components/HeaderSmall';

function AddVehicle() {
return (
  <>
    <div className="add-vehicle-page">
      <HeaderSmall />
       <img src="../assets/icons/vehicle1.svg" alt="profile logo" className="page-img"/>
       <h1>Add Vehicle</h1>
      <VehicleForm/>
    </div>
  </> 
  );
};

export default AddVehicle;
