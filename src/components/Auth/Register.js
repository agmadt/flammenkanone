import React, { Component } from 'react';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import endpoint from '../Endpoint';

export default class Register extends Component {

    constructor() {
      super();

      this.state = {
          isError: false,
          error: null,
          name: '',
          email: '',
          password: '',
          re_password: ''
      }

      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleInput(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        await this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
      e.preventDefault();

      axios.post(endpoint.baseEndpoint + '/auth/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (!response.data.isError) {
          this.setState({
            name: '',
            email: '',
            password: '',
            re_password: '',
          })
        }

        this.setState({
          error: response.data.message
        })
      });
    }

    render() {
        return (
            <React.Fragment>
              { this.state.error
                  ? <div className='message-wrapper'>
                        <Message negative>
                          {this.state.error}
                        </Message>
                  </div>
              : ''}
              <Form onSubmit={ this.handleSubmit }>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' type='text' onChange={this.handleInput} name='name' value={this.state.name} />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' type='email' onChange={this.handleInput} name='email' value={this.state.email} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder='Password' type='password' onChange={this.handleInput} name='password' value={this.state.password} />
                </Form.Field>
                <Form.Field>
                  <label>Re-type Password</label>
                  <input placeholder='Re-Password' type='password' onChange={this.handleInput} name='re_password' value={this.state.re_password} />
                </Form.Field>
                <Button type='submit' disabled={ this.state.isError ? true : false }>Register</Button>
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
