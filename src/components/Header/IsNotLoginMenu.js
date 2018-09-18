import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class IsNotLoginMenu extends Component {
	render() {
		return (
			<React.Fragment>
    		<Menu.Item as={ Link } to='/login'>Login</Menu.Item>
    		<Menu.Item as={ Link } to='/register'>Register</Menu.Item>
  		</React.Fragment>
		);
	}
}
