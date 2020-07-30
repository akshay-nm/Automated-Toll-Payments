import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from './Firebase';

const UserRegistrationForm = () => {
  const firebase = useContext(FirebaseContext)

  /*
  const states = [
    'Andaman and Nicobar Islands union territory', 
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu union territory',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ]
  */

  const [rc, setRC] = useState({ value: '', isValid: false, wasValidated: false, isChecked: false, isNonExisting: false })
  const [manufacturer, setManufacturer] = useState({ value: '', isValid: false, wasValidated: false })
  const [model, setModel] = useState({ value: '', isValid: false, wasValidated: false })

  const [name, setName] = useState({ value: '', isValid: false, wasValidated: false })
  const [contactNumber, setContactNumber] = useState({ value: '', isValid: false, wasValidated: false })
  const [street, setStreet] = useState({ value: '', isValid: false, wasValidated: false })
  const [city, setCity] = useState({ value: '', isValid: false, wasValidated: false })
  const [state, setState] = useState({ value: '', isValid: false, wasValidated: false })
  const [pin, setPin] = useState({ value: '', isValid: false, wasValidated: false })

  const [isFormValid, setIsFormValid] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  
  const [formSubmitted, setFormSubmitted] = useState(false)



  useEffect(() => {
    setIsFormValid(
      rc.isValid &&
      manufacturer.isValid &&
      model.isValid &&
      name.isValid &&
      contactNumber.isValid &&
      street.isValid &&
      city.isValid &&
      state.isValid &&
      pin.isValid
    )
  }, [
    rc,
    manufacturer,
    model,
    name,
    contactNumber,
    street,
    city,
    state,
    pin
  ])

  useEffect(() => {
    if(rc.wasValidated && rc.isValid && !rc.isChecked) {
      firebase.firestore().collection('vehicles')
        .where('rc', '==', rc.value)
        .limit(1)
        .get()
        .then(querySnaphot => {
          setRC({ ...rc, isChecked: true, isNonExisting: querySnaphot.empty })
        })
        .catch(e => {
          console.log('Error trying to check whether the vehicle is already registered or not: ', e)
        })
    }
  }, [rc])

  useEffect(() => {
    if(formSubmitted) {
      setRC({ value: '', isValid: false, wasValidated: false, isChecked: false, isNonExisting: false })
      setManufacturer({ value: '', isValid: false, wasValidated: false })
      setModel({ value: '', isValid: false, wasValidated: false })

      setName({ value: '', isValid: false, wasValidated: false })
      setContactNumber({ value: '', isValid: false, wasValidated: false })
      setStreet({ value: '', isValid: false, wasValidated: false })
      setCity({ value: '', isValid: false, wasValidated: false })
      setState({ value: '', isValid: false, wasValidated: false })
      setPin({ value: '', isValid: false, wasValidated: false })

      setFormSubmitted(false)
      
      setShowSuccessDialog(true)
    }
  }, [formSubmitted])

  useEffect(() => {
    if(showSuccessDialog) {
      let timeout = setTimeout(() => setShowSuccessDialog(false), 5000)
      return () => clearTimeout(timeout)
    }
  }, [showSuccessDialog])

  const onRCChange = value => setRC({ value: value, isValid: value.length === 9, wasValidated: true, isChecked: false, isNonExisting: false })
  const onManufacturerChange = value => setManufacturer({ value: value, isValid: value.length > 0, wasValidated: true })
  const onModelChange = value => setModel({ value: value, isValid: value.length > 0, wasValidated: true })
  
  const onNameChange = value => setName({ value: value, isValid: value.length > 0, wasValidated: true })
  const onContactNumberChange = value => setContactNumber({ value: value, isValid: value.length === 10, wasValidated: true })
  const onStreetChange = value => setStreet({ value: value, isValid: value.length > 0, wasValidated: true })
  const onCityChange = value => setCity({ value: value, isValid: value.length > 0, wasValidated: true })
  const onStateChange = value => setState({ value: value, isValid: value.length > 0, wasValidated: true })
  const onPinChange = value => setPin({ value: value, isValid: value.length === 6, wasValidated: true })

  const onFormSubmit = event => {
    event.preventDefault()
    if(isFormValid) {
      firebase.firestore().collection('vehicles')
        .add({
          rc: rc.value,
          manufacturer: manufacturer.value,
          model: model.value,
          owner: {
            name: name.value,
            contactNumber: contactNumber.value,
            street: street.value,
            city: city.value,
            state: state.value,
            pin: pin.value,
          }
        })
        .then(() => {
          setFormSubmitted(true)
        })
        .catch(e => {
          console.log('Error trying to add new user: ', e)
        })
        
    }
  }

  return (
    <div className="w-full h-full shadow rounded p-4">
      <div className='text-xl'>User registration Form</div>
      <form onSubmit={onFormSubmit} className="px-8 pt-6 pb-8 mb-4">
        <div className='text-lg'>Vehicle details</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rc">Registration Number</label>
          <input className={`shadow appearance-none border mb-2 ${rc.wasValidated? rc.isValid? rc.isChecked? rc.isNonExisting? 'border-green-500' : 'border-red-500' : '' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="rc" type="text" placeholder="Registration Number" value={rc.value} onChange={event => onRCChange(event.target.value)} />
          {rc.wasValidated? 
            rc.isValid? 
              rc.isChecked? 
                rc.isNonExisting? 
                  <p className="text-green-500 text-xs italic">No existing records found with this RC</p> 
                  : <p className="text-red-500 text-xs italic">Vehicle already registered</p> 
                : <p className="text-yellow-500 text-xs italic">Crosschecking with existing vehicle records</p> 
              : <p className="text-red-500 text-xs italic">Please enter a valid RC.</p> 
            : ''} 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">Manufacturer</label>
          <input className={`shadow appearance-none border mb-2 ${manufacturer.wasValidated? manufacturer.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="manufacturer" type="text" placeholder="Manufacturer" value={manufacturer.value} onChange={event => onManufacturerChange(event.target.value)} />
          {manufacturer.wasValidated? !manufacturer.isValid? <p className="text-red-500 text-xs italic">Please enter name of manufacturer.</p> : '' : ''} 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model</label>
          <input className={`shadow appearance-none border mb-2 ${model.wasValidated? model.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="model" type="text" placeholder="Model" value={model.value} onChange={event => onModelChange(event.target.value)} />
          {model.wasValidated? !model.isValid? <p className="text-red-500 text-xs italic">Please enter model of the vehicle.</p> : '' : ''} 
        </div>
        <div className='text-lg'>User details</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input className={`shadow appearance-none border mb-2 ${name.wasValidated? name.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="name" type="text" placeholder="Name" value={name.value} onChange={event => onNameChange(event.target.value)} />
          {name.wasValidated? !name.isValid? <p className="text-red-500 text-xs italic">Please enter your name.</p> : '' : ''} 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">Contact Number</label>
          <input className={`shadow appearance-none border mb-2 ${contactNumber.wasValidated? contactNumber.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="contactNumber" type="text" placeholder="Contact Number" value={contactNumber.value} onChange={event => onContactNumberChange(event.target.value)} />
          {contactNumber.wasValidated? !contactNumber.isValid? <p className="text-red-500 text-xs italic">Please enter a valid contact number.</p> : '' : ''} 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >Address</label>
          <div className='p-4'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">Street</label>
              <input className={`shadow appearance-none border mb-2 ${street.wasValidated? street.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="street" type="text" placeholder="Street" value={street.value} onChange={event => onStreetChange(event.target.value)} />
              {street.wasValidated? !street.isValid? <p className="text-red-500 text-xs italic">Please enter your street address.</p> : '' : ''} 
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
              <input className={`shadow appearance-none border mb-2 ${city.wasValidated? city.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="city" type="text" placeholder="City" value={city.value} onChange={event => onCityChange(event.target.value)} />
              {city.wasValidated? !city.isValid? <p className="text-red-500 text-xs italic">Please enter your city.</p> : '' : ''} 
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
              <input className={`shadow appearance-none border mb-2 ${state.wasValidated? state.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="state" type="text" placeholder="State" value={state.value} onChange={event => onStateChange(event.target.value)} />
              {state.wasValidated? !state.isValid? <p className="text-red-500 text-xs italic">Please Select your state.</p> : '' : ''} 
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">Pincode</label>
              <input className={`shadow appearance-none border mb-2 ${pin.wasValidated? pin.isValid? 'border-green-500' : 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="pin" type="text" placeholder="Pincode" value={pin.value} onChange={event => onPinChange(event.target.value)} />
              {pin.wasValidated? !pin.isValid? <p className="text-red-500 text-xs italic">Please enter your pincode.</p> : '' : ''} 
            </div>
          </div>
        </div>
        
        {isFormValid? 
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={onFormSubmit}>Submit</button> : (
            <>
              <p>Please fill the above form correctly to proceed</p>
              <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed' disabled>Submit</button>
              {showSuccessDialog? <p className='text-green-500 text-xs italic'>Vehicle registration successful.</p> : ''}
            </>
          )}
      </form>
    </div>
  );
};

export default UserRegistrationForm;