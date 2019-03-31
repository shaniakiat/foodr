import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loginUser } from '../actions/userActions'

import { withRouter } from 'react-router-dom'

import { Row, Col, Card, Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const User = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(User, this.props.history)
  }

  render() {
    return (
      <Row
        align="middle"
        gutter={{ xs: 8, md: 16 }}
        justify="center"
        style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <Col xs={{ offset: 2, span: 20 }} lg={{ offset: 6, span: 12 }}>
          <Card title="Login">
            <Form hideRequiredMark layout="vertical" onSubmit={this.onSubmit}>
              <FormItem label="Email">
                <Input
                  prefix={<Icon type="mail" theme="outlined" />}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  autoComplete="username"
                />
              </FormItem>
              <FormItem label="Password">
                <Input
                  prefix={<Icon type="lock" theme="outlined" />}
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  autoComplete="current-password"
                />
              </FormItem>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
)
