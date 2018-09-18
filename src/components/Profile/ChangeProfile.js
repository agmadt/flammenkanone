import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class ChangeProfile extends Component {
	render() {
		return (
			<React.Fragment>
			  <Form>
			    <Form.Field>
			      <label>Email</label>
			      <input placeholder='Email' type='email' />
			    </Form.Field>
			    <Form.Field>
			      <label>Old Password</label>
			      <input placeholder='Password' type='password' />
			    </Form.Field>
			    <Form.Field>
			      <label>New Password</label>
			      <input placeholder='New Password' type='password' />
			    </Form.Field>
			    <Form.Field>
			      <label>Re-New Password</label>
			      <input placeholder='Re-type New Password' type='password' />
			    </Form.Field>
			    <Button type='submit'>Change</Button>
			  </Form>
			</React.Fragment>
		);
	}
}
