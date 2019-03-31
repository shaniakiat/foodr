import React, { Component } from 'react'

import { Row, Col, Card, Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      showPassword: false
    }
  }

  render() {
    return (
      <Row
        align="middle"
        gutter={{ xs: 8, md: 16 }}
        justify="center"
        style={{ marginTop: '8rem' }}
      >
        <Col xs={{ offset: 2, span: 20 }} md={{ offset: 6, span: 12 }}>
          <Card
            title="Register"
            className="formCard"
            style={{ margin: 'auto' }}
          >
            <Form hideRequiredMark layout="vertical" onSubmit={this.onSubmit}>
              <FormItem
                label="Full Name"
                hasFeedback
                validateStatus={this.state.errors.name ? 'error' : ''}
                help={this.state.errors.name}
              >
                <Input
                  prefix={
                    <Icon
                      type="idcard"
                      theme="outlined"
                      className="secondary-text-color"
                    />
                  }
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
                extra="Psst, Artsee recommends using a Gravatar email."
              >
                <Input
                  prefix={
                    <Icon
                      type="mail"
                      theme="outlined"
                      className="secondary-text-color"
                    />
                  }
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
                  prefix={
                    <Icon
                      type="lock"
                      theme="outlined"
                      className="secondary-text-color"
                    />
                  }
                  suffix={
                    this.state.password ? (
                      <Icon
                        className={
                          this.state.showPassword
                            ? 'secondary-text-color showpasswordtoggle icon-color active'
                            : 'secondary-text-color showpasswordtoggle icon-color'
                        }
                        type="eye"
                        theme={this.state.showPassword ? 'filled' : 'outlined'}
                        onClick={this.toggleShowPassword}
                      />
                    ) : null
                  }
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  type={this.state.showPassword ? 'text' : 'password'}
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
                  prefix={
                    <Icon
                      type="lock"
                      theme="outlined"
                      className="secondary-text-color"
                    />
                  }
                  suffix={
                    this.state.password2 ? (
                      <Icon
                        className={
                          this.state.showPassword
                            ? 'secondary-text-color showpasswordtoggle icon-color active'
                            : 'secondary-text-color showpasswordtoggle icon-color'
                        }
                        type="eye"
                        theme={this.state.showPassword ? 'filled' : 'outlined'}
                        onClick={this.toggleShowPassword}
                      />
                    ) : null
                  }
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  onPressEnter={this.onSubmit}
                  type={this.state.showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                />
              </FormItem>
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

export default Register
