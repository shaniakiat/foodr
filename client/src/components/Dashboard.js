import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Typography, List } from 'antd'

const { Title } = Typography

class Dashboard extends Component {
  render() {
    return (
      <>
        <Title>
          {this.props.user.user.isShelter ? 'Sehlter' : 'Business'}:&nbsp;
          {this.props.user.user.name}
        </Title>
        <List bordered style={{ backgroundColor: '#fff' }}>
          <List.Item>
            <List.Item.Meta
              title="Email"
              description={this.props.user.user.email}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="Address"
              description={this.props.user.user.address}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="ZIP Code"
              description={this.props.user.user.zipcode}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title="Phone"
              description={this.props.user.user.phone}
            />
          </List.Item>
          {this.props.user.user.isShelter && (
            <>
              <List.Item>
                <List.Item.Meta
                  title="Driver's Phone Number"
                  description={this.props.user.user.driverPhoneNumbers}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Capacity"
                  description={this.props.user.user.capacity}
                />
              </List.Item>
            </>
          )}
        </List>
      </>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  {}
)(Dashboard)
