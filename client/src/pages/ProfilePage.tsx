import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { GET_ME } from '../apollo/queries';
import HeaderSmall from '../components/HeaderSmall';

const ProfilePage = () => {
  // const { profileId } = useParams();
  const { loading, data } = useQuery(GET_ME);

  const profile = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HeaderSmall />
      <div className="user-profile">
        <img src="../src/assets/user-profile.png" alt="profile logo" className="user-profile-img"/>
        <div className='profile-box box'>
          <ul>
            <li><strong>Username:</strong>  {profile.username}</li>
            <li><strong>Email:</strong>  {profile.email}</li>
            {/* <li><strong>Vehicle Type:</strong> {profile.vehicles.make }</li> */}
            <li><strong>Phone Number:</strong> {profile.phonenumber}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
