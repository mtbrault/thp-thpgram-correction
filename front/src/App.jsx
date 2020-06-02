import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from './store';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AppRouter from './components/AppRouter';

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/" component={AppRouter} />
      </Switch>
    </Router>
  </Provider>
);

export default App;