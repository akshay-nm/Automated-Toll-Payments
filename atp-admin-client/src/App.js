import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';

const Landing = lazy(() => import('./components/Landing'));
const LoginOrRegister = lazy(() => import('./components/LoginOrRegister'));

function App() {
  const isUserLoggedIn = useSelector(state => state.session.isLoggedIn)

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ROUTES.LANDING} >{isUserLoggedIn? <Landing /> : <Redirect to={ROUTES.LOGIN} />}</Route>
        <Route path={ROUTES.LOGIN} >{isUserLoggedIn? <Redirect to={ROUTES.LANDING} /> : <LoginOrRegister />}</Route>
      </Switch>
    </Suspense>
  );
}

export default App;
