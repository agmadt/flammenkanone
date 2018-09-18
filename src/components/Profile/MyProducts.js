import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import endpoint from '../Endpoint';

export default class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get( endpoint.baseEndpoint + '/products', {
      params: {
        user_id: this.props.user.id
      }
    })
    .then(response => {
      if (!response.data.isError) {
        this.setState({
          products: response.data.products
        })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Link to='/add-product'><Icon name='plus' /> Add Product</Link>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.products.map(product => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell collapsing><Link to={'/product/edit/' + product.id}><Icon name='pencil' /> Edit</Link></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
