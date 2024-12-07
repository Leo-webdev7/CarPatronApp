// import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
// import { GET_ME } from '../apollo/queries';
import Header from '../components/Header';

const ProfilePage = () => {
  // const { profileId } = useParams();
  // const { loading, data } = useQuery(GET_ME, {
  // variables: { profileId: profileId },
  //   });

  // const profile = data?.profile || {};
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      <Header />
      <div className="user-profile">
        <img src="#" alt="profile logo" className="user-profile-img"/>
        <div className='profile-box box'>
          <ul>
            <li><strong>Username:</strong> Test Name</li>
            <li><strong>Email:</strong> testemail@email.com</li>
            <li><strong>Vehicle Type:</strong> Chevy Cobalt</li>
            <li><strong>Phone Number:</strong> 123-456-7890</li>
          </ul>
          {/* <ul>
            <li>Username: {profile.username}</li>
            <li>Email: {profile.email}</li>
            <li>Vehicle Type: {profile.vehicle.model}</li>
            <li>Phone Number: {profile.phonenumber}</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
