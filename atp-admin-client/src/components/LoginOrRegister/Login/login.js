import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emailChanged, passwordChanged, errorUpdated } from '../../../app/loginFormDataSlice';
import { Link } from 'react-router-dom';
import { FORGOT_PASSWORD } from '../../../constants/routes';

const Login = ({ firebase }) => {
  const email = useSelector(state => state.loginFormData.email)
  const password = useSelector(state => state.loginFormData.password)
  const error = useSelector(state => state.loginFormData.error)

  const dispatch = useDispatch()

  const onEmailChange = event => dispatch(emailChanged(event.target.value))
  const onPasswordChange = event => dispatch(passwordChanged(event.target.value))

  const onLoginClick = () => firebase.doSignInWithEmailAndPassword(email.value, password.value)
    .catch(error => dispatch(errorUpdated(error.message)));

  return (
    <div className="w-full max-w-xs m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-center text-lg font-black'>Login</h2>
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="loginFormEmail" >
            Email
          </label>
          <input 
            className={`shadow appearance-none border ${!email.isValid && email.wasValidated ? 'border-red-500': '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
            id="loginFormEmail" 
            type="text" 
            placeholder="Email"
            value={email.value}
            onChange={onEmailChange} />
        </div>
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="loginFormPassword" >
            Password
          </label>
          <input 
            className={`shadow appearance-none border ${!password.isValid && password.wasValidated ? 'border-red-500': '' } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} 
            id="loginFormPassword" 
            type="password" 
            placeholder="**********"
            value={password.value}
            onChange={onPasswordChange} />
        </div>
        <p className="text-red-500 text-xs italic my-2" >{error}</p>
        <div className="flex items-center justify-between">
          {email.isValid && password.isValid? <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            onClick={onLoginClick} >
            Sign In
          </button> : <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed" 
            type="button" disabled >
            Sign In
          </button>}
          <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to={FORGOT_PASSWORD} >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;