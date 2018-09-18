import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

export default class ForgotPassword extends Component {

	state = {
		isSuccess: false
	}

	render() {
		return (
			<React.Fragment>
				{ this.state.isSuccess 
					? <div className='message-wrapper'>
					  	<Message warning>
					      We've sent an email for you to recover your password, please check your email.
					    </Message>
					  </div>
					: ''
				}
			  <Form>
			    <Form.Field>
			      <label>Email</label>
			      <input placeholder='Email' type='email' />
			    </Form.Field>
			    <Button type='submit'>Reset Password</Button>
			  </Form>
			  <style>{`
			  	.form { width: 100%; }
			  	.message-wrapper { padding: 10px 10px; width: 100%; }
	  		`}</style>
			</React.Fragment>
		);
	}
}
