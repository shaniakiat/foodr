import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/userActions'

import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

class SideNav extends Component {
  onLogOutClick = e => {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  render() {
    return (
      <Sider
        className="custom-sider"
        breakpoint="md"
        collapsedWidth="0"
        theme="light"
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[this.props.location.pathname]}
          selectedKeys={[this.props.location.pathname]}
          style={{ height: '100%' }}
        >
          {/* Logo goes here */}
          <Menu.Item key="/" style={{ marginTop: '4rem' }}>
            <Link to="/">
              <Icon type="home" theme="outlined" className="notchFixLeft" />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          {this.props.user.isAuthenticated ? (
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <Icon type="user" theme="outlined" className="notchFixLeft" />
                <span className="nav-text">{this.props.user.user.name}</span>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="/register">
              <Link to="/register">
                <Icon type="idcard" theme="outlined" className="notchFixLeft" />
                <span className="nav-text">Register</span>
              </Link>
            </Menu.Item>
          )}
          {this.props.user.isAuthenticated ? (
            <Menu.Item key="/logout">
              <a href="#" onClick={this.onLogOutClick}>
                <Icon type="logout" theme="outlined" className="notchFixLeft" />
                <span className="nav-text">Log Out</span>
              </a>
            </Menu.Item>
          ) : (
            <Menu.Item key="/login">
              <Link to="/login">
                <Icon type="login" theme="outlined" className="notchFixLeft" />
                <span className="nav-text">Log In</span>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    )
  }
}

SideNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(SideNav)
)
