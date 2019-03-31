import React, { Component } from 'react'

import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, unsetCurrentUser } from './actions/userActions'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
// import PrivateRouteBusiness from './components/PrivateRouteBusiness'
import PrivateRouteShelter from './components/PrivateRouteShelter'

import { Layout } from 'antd'

import SideNav from './components/SideNav'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Business from './components/Business'

import './App.css'

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(unsetCurrentUser())
    window.location.href = '/login'
  }
}

const { Content } = Layout

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout hasSider>
            <SideNav />
            <Layout className="custom-layout">
              <Content style={{ margin: '24px 16px 0' }}>
                <Route
                  exact
                  path="/register"
                  component={Register}
                  style={{ height: '100%' }}
                />
                <Route
                  exact
                  path="/login"
                  component={Login}
                  style={{ height: '100%' }}
                />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                    style={{ height: '100%' }}
                  />
                </Switch>
                <Switch>
                  <PrivateRouteShelter
                    exact
                    path="/business"
                    component={Business}
                    style={{ height: '100%' }}
                  />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
