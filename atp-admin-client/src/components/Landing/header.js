import React, { useContext } from 'react';
import { FirebaseContext } from '../Firebase';

const Header = () => {
  const firebase = useContext(FirebaseContext)
  return (
    <div>
      <button onClick={() => firebase.doSignOut()}>Logout</button>
    </div>
  );
};

export default Header;