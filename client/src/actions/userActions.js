import { SET_CURRENT_USER } from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

import { notification } from 'antd'

// Log In
export const loginUser = (User, history) => dispatch => {
  axios
    .post('/api/user/login', User)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)

      // Set token to Auth header
      setAuthToken(token)

      // Set current user
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))

      notification['success']({
        message: 'Welcome, ' + decoded.name + '.',
        description: "You're now logged in."
      })

      history.replace('/dashboard')
    })
    .catch(err => {
      notification['error']({
        message: 'Error!',
        description: 'Email and Password combination do not match our records.'
      })
    })
}

// Log Out
export const logoutUser = history => dispatch => {
  dispatch(unsetCurrentUser())
  notification['success']({
    message: 'Goodbye.',
    description: 'We miss you already.'
  })
  history.replace('/')
}

// Set user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Unset user
export const unsetCurrentUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
