import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='w-full h-full flex flex-col p-4'>
      <div className='text-4xl'>Automated Toll Payments</div>
      <Switch>
        <Route exact path='/'>
          <div>
            <div className='mb-4'>
              About project, details regarding registraion, etc
            </div>
            <div>
              <Link to='/new-user' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>Register Your Vehicle</Link>
            </div>
          </div>
        </Route>
        <Route path='/new-user'><UserRegistrationForm /></Route>
      </Switch>
      
    </div>
  );
}

export default App;
