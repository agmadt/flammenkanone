import React, { Component } from 'react';
import { Grid, Segment, Button, Divider } from 'semantic-ui-react';

import Item from './Item';

export default class Checkout extends Component {
  render() {
    return (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column width={12}>
              { this.props.productInCart.length > 0
                ? <Item productInCart={ this.props.productInCart } removeProduct={this.props.removeProduct} addProduct={this.props.addProduct} decreaseProduct={this.props.decreaseProduct} />
                : <Item empty /> }
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <div className='cart-grand-total-container'>
                  Grand Total ({ this.props.cartTotalItems } items):  
                  <strong className='cart-grand-total'>{ this.props.cartGrandTotal }</strong>
                </div>
                <Divider />
                <Button primary>Pay</Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <style jsx='true'>{`
            .checkout-product-container { position: relative; }
            .checkout-product-content { overflow: hidden; }
            .checkout-product-image { float: left; margin: 0 20px 0 0; width: 60px;}
            .checkout-product-title-container { float: left; margin: 0 10px 0 0; width: 310px; }
            .checkout-product-title { font-size: 16px; word-wrap: break-word; overflow: hidden; text-overflow: ellipsis; margin: 0 0 10px 0; font-weight: bold; }
            .checkout-product-price { font-size: 16px; font-weight: bold; }
            .checkout-product-quantity-container { float: left; margin: 0 10px 0 0; width: 180px; overflow: hidden; }
            .checkout-product-quantity-decrement { cursor: pointer; float: left; margin: 0 0 0 10px; width: 20px;}
            .checkout-product-quantity-increment { cursor: pointer; float: left; margin: 0 10px 0 0; width: 20px;}
            .checkout-product-quantity { float: left; width: 120px; }
            .checkout-product-quantity input { border: 0; border-bottom: 1px solid #333; font-size: 16px; padding: 3px 0; text-align: center; width: 100%; }
            .checkout-product-quantity input:focus { 
              outline: 0;
              -moz-appearance:none;
              outline:0px none transparent;
             }
            .checkout-product-subtotal { float: left; width: 180px; font-weight: bold; font-size: 16px; text-align: right; }
            .checkout-delete-product { cursor: pointer; position: absolute; bottom: 0; right: 0; }
            .cart-grand-total-container { overflow: hidden; }
            .cart-grand-total { float: right; }

            input[type='number'] {
              -moz-appearance:textfield;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          `}</style>
        </React.Fragment>
    );
  }
}
