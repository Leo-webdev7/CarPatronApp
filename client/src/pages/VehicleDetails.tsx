import { useQuery } from '@apollo/client';
import {useState} from 'react';
import { GET_ME } from '../apollo/queries';
import HeaderSmall from '../components/HeaderSmall';
import type { User } from '../models/User';
import vehicle from '../assets/icons/vehicle.svg';

const VehicleDetails = () => {
  const { loading, data } = useQuery(GET_ME);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const userData: User = data.me;

  const selectedVehicle = userData.vehicles.find(vehicle => vehicle.vin === selectedValue);


  return (
    <div>
      <HeaderSmall />
      <div className="vehicle-details">
        <img src={vehicle} alt="vehicle icon" className="page-img"/>
        <h1>Vehicle Details</h1>
        <div className='vehicle-profile box'>
          <div className="number-of-vehicles">
          {userData.vehicles.length ? (
              `${userData.vehicles.length} Vehicle(s) Saved`
            ) : (
              <span>
                You have no saved vehicles!{' '}
                <a href="/AddVehicle">Add a Vehicle</a>
              </span>
            )}
            </div>
            <select value={selectedValue} onChange={handleChange}>
            <option value="">Select an option</option>
            {userData.vehicles.map((vehicle) => (
              <option key={vehicle.vin} value={vehicle.vin ?? ''}>
                {vehicle.make} {vehicle.car_model} {vehicle.year}
              </option>
            ))}
          </select>
          {selectedVehicle && (
            <ul className='vehicle-details'>
              <li><strong>Make:</strong> {selectedVehicle.make}</li>
              <li><strong>Model:</strong> {selectedVehicle.car_model}</li>
              <li><strong>Year:</strong> {selectedVehicle.year}</li>
              <li><strong>VIN:</strong> {selectedVehicle.vin}</li>
              <li><strong>Mileage:</strong> {selectedVehicle.mileage}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
