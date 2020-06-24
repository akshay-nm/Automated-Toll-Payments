import React, { lazy } from 'react';

const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))

const LoginOrRegister = () => {
  return (
      <div className='pt-5'>
        <h1 className='text-5xl text-center'>ATP VEHICLE OWNER CLIENT</h1>
        <Login />
        <div className='text-center font-hairline my-5'>OR</div>
        <Register />
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Automatic Toll Payments
        </p>
      </div>
    
  );
};

export default LoginOrRegister;