import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { GET_VEHICLE } from '../apollo/queries';
import Header from '../components/Header';

const VehicleDetails = () => {
  // const { profileId } = useParams();
  const { loading, data } = useQuery(GET_VEHICLE);

  const vehicle = data?.vehicle || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <div className="vehicle-details">
        <img src="../src/assets/vehicle-profile.png" alt="profile logo" className="vehicle-details-img"/>
        <div className='profile-box box'>
          <ul>
            <li><strong>Make:</strong>  {vehicle.make}</li>
            <li><strong>Model:</strong>  {vehicle.model}</li>
            <li><strong>Year:</strong> {vehicle.year}</li>
            <li><strong>VIN:</strong> {vehicle.vin}</li>
            <li><strong>Mileage:</strong> {vehicle.mileage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
