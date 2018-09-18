import React, { Component } from 'react';
import { Grid, Image, Card, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import endpoint from '../Endpoint';


export default class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      products: []
    }
  }

  handleAddToCart = product => e => {
    toast.info('Added to cart')

    this.props.addProduct(product);
  }

  componentDidMount() {
    axios.get(endpoint.baseEndpoint + '/products')
    .then(response => {
      this.setState({
        products: response.data.products
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid className="product-container">
            <Grid.Row columns={5}>
              { this.state.products.map(product => (
                <Grid.Column className="product-item" key={product.id}>
                  <Card>
                    <Image src={ endpoint.baseEndpoint + '/' + product.image}/>
                    <Card.Content>
                      <Card.Header>{product.name}</Card.Header>
                      <Card.Description>{product.description}.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button icon labelPosition='left' primary onClick={this.handleAddToCart(product)}>
                        <Icon name='add to cart' />
                        Add to Cart
                      </Button>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <ToastContainer autoClose={1000} />
          <style jsx="true">{`
            .product-item {
              padding-bottom: 20px;
            }
            .product-container {
              width: 100%;
            }
            .Toastify__toast-body {
              padding: 0 15px !important;
            }
          `}</style>
      </React.Fragment>
    );
  }
}