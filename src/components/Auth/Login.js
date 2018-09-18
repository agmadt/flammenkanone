import React, { Component } from 'react';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import endpoint from '../Endpoint';

class Login extends Component {

	constructor() {
		super();

		this.state = {
			isError: false,
			errorMessage: '',
			email: '',
			password: ''
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		axios.post(endpoint.baseEndpoint + '/auth/login', {
			email: this.state.email,
			password: this.state.password
		})
		.then(response => {
			if (response.data.isError) {
				this.setState({ isError: true, errorMessage: response.data.message })

				return;
			}

			this.setState({
				isError: false,
				errorMessage: '',
				email: '',
				password: ''
			})

			this.props.onUserAuth(response.data.message);
			this.props.history.push('/')
		})
	}

	render() {
		return (
			<React.Fragment>
				{ this.state.isError
					? <div className='message-wrapper'>
					  	<Message negative>
					      <Icon name='exclamation' />
					      {this.state.errorMessage}
					    </Message>
				    </div>
			    : ''}
			  <Form onSubmit={this.handleSubmit}>
			    <Form.Field>
			      <label>Email</label>
			      <input placeholder='Email' type='email' onChange={this.handleInput} name="email" value={this.state.email} />
			    </Form.Field>
			    <Form.Field>
			      <label>Password</label>
			      <input placeholder='Password' type='password' onChange={this.handleInput} name="password" value={this.state.password} />
			    </Form.Field>
			    <Button type='submit'>Login</Button>
			  </Form>
			  <div className='forgot-password-wrapper message-wrapper'>
			  	<Message warning>
			      <Icon name='question' />
			      Forgot your password? <Link to='/forgot-password'>recover here</Link>
			    </Message>
			  </div>
			  <style>{`
			  	.form { width: 100%; }
			  	.message-wrapper { padding: 10px 10px; width: 100%; }
			  	.forgot-password-wrapper { padding-top: 20px; }
	  		`}</style>
			</React.Fragment>
		);
	}
}

export default withRouter(Login)