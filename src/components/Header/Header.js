import React, { Component } from 'react';
import { Menu, Grid, Dropdown, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LoginMenu from './LoginMenu';
import IsNotLoginMenu from './IsNotLoginMenu';
import endpoint from '../Endpoint';

export default class Header extends Component {

  handleRemoveCart = product => e => {
    this.props.removeProduct(product);
  }

  render() {
    return (
      <header>
        <Menu>
          <Grid container>
            <Grid.Row>
              <Menu.Item as={ Link } to='/'>Home</Menu.Item>
              <Menu.Menu position='right'>
                <Dropdown icon='add to cart' text='Cart' item simple className='icon' direction='right'>
                  <Dropdown.Menu>
                    <div className={'cart-product-holder' + (this.props.productInCart.length > 0 ? ' contains-product' : '') }>
                      { this.props.productInCart.map(product => (
                        <div className='cart-product-item' key={product.id}>
                          <div className='cart-product-image-container'><Image src={ endpoint.baseEndpoint + '/' + product.image} /></div>
                          <div className='cart-product-title'>{product.name}</div>
                          <div className='cart-product-price-holder'>
                            <div className='cart-product-price'>{product.quantity * product.price}</div>
                            <div className='cart-product-action-holder'>
                              <div className='cart-product-quantity'>{product.quantity}</div>
                              <div className='cart-product-remove-action'><Icon name='close' onClick={this.handleRemoveCart(product)} /></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>                    
                    <Dropdown.Header>
                      { this.props.productInCart.length > 0 
                        ? (<Link to='/checkout'>Move to checkout</Link>)
                        : 'Cart is empty'}
                    </Dropdown.Header>
                  </Dropdown.Menu>
                </Dropdown>
                {this.props.user ? <LoginMenu user={this.props.user} onUserLogout={this.props.onUserLogout} /> : <IsNotLoginMenu /> }
              </Menu.Menu>
            </Grid.Row>
          </Grid>
        </Menu>
        <style jsx="true">{`
          .menu .item a { color: inherit; }
          .cart-product-holder.contains-product { padding: 15px; width: 320px; }
          .cart-product-item { overflow: hidden; margin: 0 0 10px 0; }
          .cart-product-item:last-child { margin: 0; }
          .cart-product-image-container { float: left; width: 40px; }
          .cart-product-title { float: left; margin: 0 10px; width: 125px; white-space: initial; word-wrap: break-word; }
          .cart-product-price-holder { float: left; margin: 0 10px 0 0; width: 95px; }
          .cart-product-action-holder { margin: 10px 0 0 0; overflow: hidden; }
          .cart-product-quantity { float: left; margin: 0 10px 0 0; width: 40px; }
          .cart-product-remove-action { float: right; width: 25px; }
          .cart-product-remove-action i { cursor: pointer; }
        `}</style>
      </header>
    );
  }
}
