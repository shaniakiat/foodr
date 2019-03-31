import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import axios from 'axios'

import {
  Row,
  Col,
  Card,
  Form,
  Icon,
  Input,
  Switch,
  Button,
  notification
} from 'antd'

const FormItem = Form.Item

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      zipcode: '',
      phone: '',
      isShelter: false,
      driverPhoneNumbers: '',
      capacity: '',
      errors: {}
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

  toggleShelter = () => {
    this.setState({ isShelter: !this.state.isShelter })
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
      isShelter: this.state.isShelter.toString(),
      driverPhoneNumbers: this.state.driverPhoneNumbers,
      capacity: this.state.capacity
    }

    this.setState({ errors: {} })

    axios
      .post('/api/user/register', newUser)
      .then(res => {
        notification['success']({
          message: 'Welcome, ' + res.data.name + '.',
          description: "You've successfully registered, let's log in."
        })
        this.props.history.replace('/login')
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    return (
      <Row
        align="middle"
        gutter={{ xs: 8, md: 16 }}
        justify="center"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <Col xs={{ offset: 2, span: 20 }} lg={{ offset: 6, span: 12 }}>
          <Card
            title={
              this.state.isShelter ? 'Register Shelter' : 'Register Business'
            }
          >
            <Form hideRequiredMark layout="vertical" onSubmit={this.onSubmit}>
              <FormItem label="Register as a Shelter">
                <Switch
                  checked={this.state.isShelter}
                  onChange={this.toggleShelter}
                />
              </FormItem>
              <FormItem
                label={this.state.isShelter ? 'Shelter Name' : 'Business Name'}
                hasFeedback
                validateStatus={this.state.errors.name ? 'error' : ''}
                help={this.state.errors.name}
              >
                <Input
                  prefix={<Icon type="idcard" theme="outlined" />}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                />
              </FormItem>
              <FormItem
                label="Email"
                hasFeedback
                validateStatus={this.state.errors.email ? 'error' : ''}
                help={this.state.errors.email}
              >
                <Input
                  prefix={<Icon type="mail" theme="outlined" />}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  autoComplete="username"
                />
              </FormItem>
              <FormItem
                label="Password"
                hasFeedback
                validateStatus={this.state.errors.password ? 'error' : ''}
                help={this.state.errors.password}
              >
                <Input
                  prefix={<Icon type="lock" theme="outlined" />}
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  autoComplete="new-password"
                />
              </FormItem>
              <FormItem
                label="Confirm Password"
                hasFeedback
                validateStatus={this.state.errors.password2 ? 'error' : ''}
                help={this.state.errors.password2}
              >
                <Input
                  prefix={<Icon type="lock" theme="outlined" />}
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  autoComplete="new-password"
                />
              </FormItem>
              <FormItem
                label="Address"
                hasFeedback
                validateStatus={this.state.errors.address ? 'error' : ''}
                help={this.state.errors.address}
              >
                <Input
                  prefix={<Icon type="environment" theme="outlined" />}
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                />
              </FormItem>
              <FormItem
                label="ZIP Code"
                hasFeedback
                validateStatus={this.state.errors.zipcode ? 'error' : ''}
                help={this.state.errors.zipcode}
              >
                <Input
                  prefix={<Icon type="environment" theme="outlined" />}
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                />
              </FormItem>
              <FormItem
                label="Phone Number:"
                hasFeedback
                validateStatus={this.state.errors.phone ? 'error' : ''}
                help={this.state.errors.phone}
              >
                <Input
                  prefix={<Icon type="phone" theme="outlined" />}
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                />
              </FormItem>
              {this.state.isShelter && (
                <>
                  <FormItem
                    label="Driver's Phone Number"
                    hasFeedback
                    validateStatus={
                      this.state.errors.driverPhoneNumbers ? 'error' : ''
                    }
                    help={this.state.errors.driverPhoneNumbers}
                  >
                    <Input
                      prefix={<Icon type="phone" theme="outlined" />}
                      name="driverPhoneNumbers"
                      value={this.state.driverPhoneNumbers}
                      onChange={this.onChange}
                      onPressEnter={this.onSubmit}
                    />
                  </FormItem>
                  <FormItem
                    label="Capacity"
                    hasFeedback
                    validateStatus={this.state.errors.capacity ? 'error' : ''}
                    help={this.state.errors.capacity}
                  >
                    <Input
                      prefix={<Icon type="team" theme="outlined" />}
                      name="capacity"
                      value={this.state.capacity}
                      onChange={this.onChange}
                      onPressEnter={this.onSubmit}
                    />
                  </FormItem>
                </>
              )}
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Register)
)
