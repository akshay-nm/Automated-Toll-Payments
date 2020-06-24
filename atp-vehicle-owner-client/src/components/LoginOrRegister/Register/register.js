import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emailChanged, passwordChanged, confirmPasswordChanged, errorUpdated } from '../../../app/registerFormDataSlice';

const Register = ({ firebase }) => {
  const email = useSelector(state => state.registerFormData.email)
  const password = useSelector(state => state.registerFormData.password)
  const confirmPassword = useSelector(state => state.registerFormData.confirmPassword)
  const error = useSelector(state => state.registerFormData.error)

  const dispatch = useDispatch()

  const onEmailChange = event => dispatch(emailChanged(event.target.value))
  const onPasswordChange = event => dispatch(passwordChanged(event.target.value))
  const onConfirmPasswordChange = event => dispatch(confirmPasswordChanged(event.target.value))

  const onRegisterClick = () => firebase.doCreateUserWithEmailAndPassword(email.value, password.value)
    .catch(error => dispatch(errorUpdated(error.message)));

  return (
    <div className="w-full max-w-xs m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-center text-lg font-black'>Register</h2>
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="registerFormEmail" >
            Email
          </label>
          <input 
            className={`shadow appearance-none border ${!email.isValid && email.wasValidated ? 'border-red-500': '' } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
            id="registerFormEmail" 
            type="text" 
            placeholder="Email"
            value={email.value}
            onChange={onEmailChange} />
        </div>
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="registerFormPassword" >
            Password
          </label>
          <input 
            className={`shadow appearance-none border ${!password.isValid && password.wasValidated ? 'border-red-500': '' } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} 
            id="registerFormPassword" 
            type="password" 
            placeholder="**********"
            value={password.value}
            onChange={onPasswordChange} />
        </div>
        <div className="mb-6">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="registerFormConfirmPassword" >
            Confirm Password
          </label>
          <input 
            className={`shadow appearance-none border ${!password.isValid && password.wasValidated ? 'border-red-500': '' } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} 
            id="registerFormConfirmPassword" 
            type="password" 
            placeholder="**********"
            value={confirmPassword.value}
            onChange={onConfirmPasswordChange} />
        </div>
        <p className="text-red-500 text-xs italic my-2" >{error}</p>
        <div className="flex items-center justify-center">
          {email.isValid && password.isValid? <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            onClick={onRegisterClick} >
            Sign Up
          </button> : <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed" 
            type="button" disabled >
            Sign Up
          </button>}
        </div>
      </form>
    </div>
  );
};

export default Register;