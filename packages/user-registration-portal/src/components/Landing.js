import React from 'react';
import UserRegistrationForm from './UserRegistrationForm';

const Landing = () => {
  return (
    <div>
      <div>User Registration portal</div>
      <div>Who is this for?</div>
      <div>Who to contact is case of any problems related to this website?</div>
      <UserRegistrationForm />
    </div>
  );
};

export default Landing;