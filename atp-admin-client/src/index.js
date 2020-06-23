import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import { isLoggedInUpdated, userUpdated } from './app/sessionSlice';

const onAuthStateChanged = user => {
  store.dispatch(isLoggedInUpdated(user? true : false))
  store.dispatch(userUpdated(user? {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    isEmailVerified: user.emailVerified,
    uid: user.uid,
  } : null))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase(onAuthStateChanged)} >
        <Router>
          <App />
        </Router>
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
