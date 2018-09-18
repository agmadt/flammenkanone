import React, { Component } from 'react';
import { Form, Button, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import endpoint from '../Endpoint';

class AddProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product_name: '',
      product_description: '',
      price: 0,
      file: null,
      image: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'text' || target.type === 'textarea' || target.type === 'number' ? target.value : target.files[0];

    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append('file', this.state.file);
    form.append('name', this.state.product_name);
    form.append('description', this.state.product_description);
    form.append('price', this.state.price);
    form.append('user', JSON.stringify(this.props.user));

    axios.post(endpoint.baseEndpoint + '/products/add', form, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {

      if (!response.data.isError) {
        this.props.history.push({
          pathname: '/profile',
          state: {
            activeItem: 'products',
            message: response.data.message
          }
        })
      }

    })
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios.get(endpoint.baseEndpoint + '/products/' + this.props.match.params.id)
      .then(response => {
        if (!response.data.isError) {
          this.setState({
            product_name: response.data.product.name,
            product_description: response.data.product.description,
            image: endpoint.baseEndpoint + '/' + response.data.product.image
          })
        }
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} method='post'>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Form.Field>
                <label>Product Name</label>
                <input placeholder='Product Name' type='text' name='product_name' onChange={this.handleInput} value={this.state.product_name} />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <textarea name='product_description' value={this.state.product_description} onChange={this.handleInput} />
              </Form.Field>
              <Button type='submit'>{ this.props.match.params.id ? 'Edit Product' : 'Add Product'}</Button>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Field>
                <label>Product Price</label>
                <input type='number' step='0.1' name='price' onChange={this.handleInput} />
              </Form.Field>
              <Form.Field>
                <label>Product Image</label>
                <input type='file' name='file' onChange={this.handleInput} />
              </Form.Field>
              { this.props.match.params.id
                ? (<Form.Field><label>Current Image</label><Image src={this.state.image} /></Form.Field>)
                : ''
              }
            </Grid.Column>
          </Grid>
        </Form>
        <style>{`
          .form { width: 100%; }
          .message-wrapper { padding: 10px 10px; width: 100%; }
          .forgot-password-wrapper { padding-top: 20px; }
          button { margin: 10px 0 0 0 !important; }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withRouter(AddProduct)