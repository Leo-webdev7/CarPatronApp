// pages/AddVehicle.js
import '../App.css'; 
import VehicleForm from '../components/AddVehicleForm.js';
import Header from '../components/Header';

function AddVehicle() {
return (
  <>
    <div className="add-vehicle-page">
      <Header />
      <VehicleForm/>
    </div>
  </> 
  );
};

export default AddVehicle;
