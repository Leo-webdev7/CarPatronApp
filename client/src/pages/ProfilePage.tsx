import {useEffect} from 'react';
import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { GET_ME } from '../apollo/queries';
import HeaderSmall from '../components/HeaderSmall';
import profileIcon from '../assets/icons/profile-circle.svg';
const ProfilePage = () => {
  // const { profileId } = useParams();
  const { loading, data } = useQuery(GET_ME);

  const profile = data?.me || {};

  useEffect(() => {
    document.body.classList.add('custom-body');
  }, []);

  if (loading) {
    return <div>Loading...</div>;

  }
  return (
    <div>
      <HeaderSmall />
      <div className="user-profile">
       <div className="profile-wrapper">
        <img src={profileIcon} alt="profile logo" className="page-img"/>
        <h1>Profile</h1>
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
    </div>
  );
};

export default ProfilePage;
