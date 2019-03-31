import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import axios from 'axios'

import { Typography, List } from 'antd'

const { Title } = Typography

class Business extends Component {
  constructor() {
    super()
    this.state = {
      businesses: [],
      errors: {}
    }
  }

  componentDidMount() {
    axios
      .get(`/api/user/business/${this.props.user.user.zipcode}`)
      .then(res => {
        this.setState({ businesses: res.data })
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  render() {
    return (
      <>
        <Title>Business around you</Title>
        <Title level={4}>ZIP code: {this.props.user.user.zipcode}</Title>
        <List bordered style={{ backgroundColor: '#fff' }}>
          {this.state.businesses.map((el, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={el.name}
                description={
                  <>
                    <div>{el.address}</div>
                    <div>{el.phone}</div>
                  </>
                }
              />
            </List.Item>
          ))}
        </List>
      </>
    )
  }
}

Business.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  {}
)(Business)
