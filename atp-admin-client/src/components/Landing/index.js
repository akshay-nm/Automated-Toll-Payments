import React, { lazy } from 'react';

const Header = lazy(() => import('./header'))
const Profile = lazy(() => import('./Profile'))
const Booths = lazy(() => import('./Booths'))
const Transactions = lazy(() => import('./Transactions'))
const Vehicles = lazy(() => import('./Vehicles'))

const Landing = () => {
  return (
    <div>
      <Header />
      <Profile />
      <Booths />
      <Transactions />
      <Vehicles />
    </div>
  );
};

export default Landing;
