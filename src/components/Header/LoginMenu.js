import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class LoginMenu extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onUserLogout();
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown text={'Hello, ' + this.props.user.name} pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item as={ Link } to='/profile'>Profile</Dropdown.Item>
              <Dropdown.Item as={ Link } to='/add-product'>Add Product</Dropdown.Item>
              <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginMenu)
