import React, { Component } from 'react';
import { Segment, Image, Icon } from 'semantic-ui-react';
import endpoint from '../Endpoint';

export default class Item extends Component {

  handleDecrement = product => e => {
    this.props.decreaseProduct(product);
  }

  handleIncrement = product => e => {
    this.props.addProduct(product);
  }

  handleRemoveProduct = product => e => {
    this.props.removeProduct(product);
  }

  render() {
    return (
      <React.Fragment>
        { this.props.empty
          ? (<Segment> Cart empty. </Segment>)
          : this.props.productInCart.map(product => (
              <Segment key={ product.id }>
                <div className='checkout-product-container'>
                  <div className='checkout-product-content'>
                    <div className='checkout-product-image'><Image src={ endpoint.baseEndpoint + '/' + product.image} /></div>
                    <div className='checkout-product-title-container'>
                      <div className='checkout-product-title'>{ product.name }</div>
                      <div className='checkout-product-price'>{ product.price }</div>
                    </div>
                    <div className='checkout-product-quantity-container'>
                      <div className='checkout-product-quantity-decrement' onClick={this.handleDecrement(product)}><Icon name='minus' /></div>
                      <div className='checkout-product-quantity'>
                        <input type='number' step='1' value={ product.quantity } readOnly />
                      </div>
                      <div className='checkout-product-quantity-increment' onClick={this.handleIncrement(product)}><Icon name='plus' /></div>
                    </div>
                    <div className='checkout-product-subtotal'>{ product.quantity * product.price }</div>
                    <div className='checkout-delete-product' onClick={this.handleRemoveProduct(product)}>Delete Product</div>
                  </div>
                </div>
              </Segment>
            ))
        }
      </React.Fragment>
    );
  }
}
