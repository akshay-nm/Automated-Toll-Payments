import React, { lazy } from 'react';

const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))

const LoginOrRegister = () => {
  return (
      <div className='pt-5 divide-y-5 divide-black divide-opacity-100'>
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