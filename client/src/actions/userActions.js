import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'
import { SET_CURRENT_USER } from './types'

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

      // notification['success']({
      //   message: 'Hi there, ' + decoded.name + '.',
      //   description: 'Welcome to Artsee.'
      // })
      // dispatch(enqueueSnackbar('logged in'))

      history.replace('/dashboard')
    })
    .catch(err => {
      // dispatch(enqueueSnackbar(err))
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    })
}

// Log Out
export const logoutUser = history => dispatch => {
  dispatch(unsetCurrentUser())
  // notification['success']({
  //   message: 'Goodbye.',
  //   description: 'We miss you already.'
  // })
  // dispatch(enqueueSnackbar('logged out'))
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
