import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { GET_ME } from '../apollo/queries';
import HeaderSmall from '../components/HeaderSmall';
import type { User } from '../models/User';

const VehicleDetails = () => {
  // const { profileId } = useParams();
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }
  const userData: User = data.me;
  return (
    <div>
      <HeaderSmall />
      <div className="vehicle-details">
        <img src="../src/assets/vehicle-profile.png" alt="profile logo" className="vehicle-details-img"/>
        <div className='profile-box box'>
          {userData.vehicles.length ? (
              `Viewing ${userData.vehicles.length} saved ${
                userData.vehicles.length === 1 ? 'vehicle' : 'vehicles'
              }:`
            ) : (
              <span>
                You have no saved vehicles!{' '}
                <a href="/AddVehicle">Add a Vehicle</a>
              </span>
            )}

          {userData.vehicles.map((vehicle:any) => {
            return (
              <ul key={vehicle._id}>
                <li><strong>Make:</strong>  {vehicle.make}</li>
                <li><strong>Model:</strong>  {vehicle.model}</li>
                <li><strong>Year:</strong> {vehicle.year}</li>
                <li><strong>VIN:</strong> {vehicle.vin}</li>
                <li><strong>Mileage:</strong> {vehicle.mileage}</li>
              </ul>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
