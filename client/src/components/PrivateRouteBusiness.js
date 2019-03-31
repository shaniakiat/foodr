import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRouteBusiness = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.isAuthenticated === true && user.isShelter === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

PrivateRouteBusiness.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRouteBusiness)
