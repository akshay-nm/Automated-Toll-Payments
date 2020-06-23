import React from 'react';
import { useSelector } from 'react-redux';

const Profile = ({ firebase }) => {
  const user = useSelector(state => state.session.user)

  const onSendVerificationEmailClick = () => firebase.doSendEmailVerification().then(() => console.log('email sent')).catch(error => console.log(error))

  return user && firebase? (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <img src={user.photoUrl} alt='User profile' />
      <div>{user.name}</div>    
      <div>{user.email}</div>
      <div>{user.isEmailVerified? 'Email verified' : (
        <div>Email not verified. 
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={onSendVerificationEmailClick} >Send Verification Email</button>
          </div>
        )}</div>
    </div>
  ): '';
};

export default Profile;
