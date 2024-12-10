// pages/AddVehicle.js
import '../App.css'; 
import VehicleForm from '../components/AddVehicleForm.js';
import HeaderSmall from '../components/HeaderSmall';

function AddVehicle() {
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
