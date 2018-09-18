import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';

import Home from './Home/Home';
import Header from './Header/Header';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import AddProduct from './AddProduct/AddProduct';
import Profile from './Profile/Profile';
import Checkout from './Checkout/Checkout';

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: null,
      isLogin: false,
      productInCart: [],
      cartTotalItems: 0,
      cartGrandTotal: 0
    }

    this.userAuth = this.userAuth.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.decreaseProduct = this.decreaseProduct.bind(this);
  }

  userAuth(theUser) {
    this.setState({
      user: theUser,
      isLogin: true
    })

    localStorage.setItem('agmadt-simple-commerce', JSON.stringify(theUser));
  }

  userLogout() {
    this.setState({
      user: null,
      isLogin: false
    })

    localStorage.removeItem('agmadt-simple-commerce');
  }

  addProduct(product) {
    const products = this.state.productInCart.slice();
    const findProduct = this.findProduct(products, product.id);

    if(findProduct > -1) {
      products[findProduct].quantity += 1;
    } else {
      products.push({
        ...product,
        quantity: 1
      });
    }

    this.setState({
      productInCart: products,
      cartGrandTotal: this.state.cartGrandTotal + parseFloat(product.price),
      cartTotalItems: this.state.cartTotalItems + 1
    })

    localStorage.setItem('agmadt-simple-commerce-cart', JSON.stringify(products));
  }

  decreaseProduct(product) {
    const products = this.state.productInCart.slice();
    const findProduct = this.findProduct(products, product.id);

    if(findProduct > -1) {
      if (products[findProduct].quantity > 1) {
        products[findProduct].quantity -= 1;
      }
    }

    this.setState({
      productInCart: products,
      cartGrandTotal: this.state.cartGrandTotal - parseFloat(product.price),
      cartTotalItems: this.state.cartTotalItems - 1
    })

    localStorage.setItem('agmadt-simple-commerce-cart', JSON.stringify(products));
  }

  removeProduct(product) {
    const products = this.state.productInCart.slice();
    const findProduct = this.findProduct(products, product.id);

    products.splice(findProduct, 1);

    this.setState({
      productInCart: products,
      cartGrandTotal: this.state.cartGrandTotal - (parseFloat(product.price) * parseFloat(product.quantity)),
      cartTotalItems: this.state.cartTotalItems - parseInt(product.quantity, 10)
    })

    localStorage.setItem('agmadt-simple-commerce-cart', JSON.stringify(products));
  }

  findProduct(arr, productId) {

    for(var i=0; i<arr.length;i++) {
      if (arr[i].id === productId) {
        return i;
      }
    }

    return -1;
  }

  componentWillMount() {
    const theUser = localStorage.getItem('agmadt-simple-commerce');
    const cartData = localStorage.getItem('agmadt-simple-commerce-cart');
    const productInCart = JSON.parse(cartData);

    if (theUser) {
      this.setState({
        user: JSON.parse(theUser),
        isLogin: true
      })
    }

    if (cartData) {
      this.setState({
        productInCart: productInCart
      })
    }

    let _tmpCount = 0;
    let _tmpGrandTotal = 0;

    for (var i = 0; i < productInCart.length; i++) {
      _tmpCount += parseFloat(productInCart[i].quantity);
      _tmpGrandTotal += parseFloat(productInCart[i].quantity) * parseFloat(productInCart[i].price);
    }

    this.setState({
      cartTotalItems: _tmpCount,
      cartGrandTotal: _tmpGrandTotal
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Header user={this.state.user} onUserLogout={this.userLogout} productInCart={this.state.productInCart} removeProduct={this.removeProduct} />
            <Grid container className='page-wrapper'>
              <Switch>
                <Route exact path="/" render={ (props) => (<Home addProduct={this.addProduct} />) } />
                
                <Route exact path="/add-product" render={ (props) => this.state.isLogin ? (<AddProduct user={this.state.user} />) : <Redirect to='/' />  } />
                <Route exact path="/product/edit/:id" render={ (props) => this.state.isLogin ? (<AddProduct user={this.state.user} />) : <Redirect to='/' />  } />
                <Route exact path="/profile" render={ (props) => this.state.isLogin ? (<Profile user={this.state.user} {...props} />) : <Redirect to='/' />  } />

                <Route exact path="/checkout" 
                  render={ (props) => (
                    <Checkout user={this.state.user} productInCart={this.state.productInCart} removeProduct={this.removeProduct} addProduct={this.addProduct} decreaseProduct={this.decreaseProduct} 
                      cartGrandTotal={this.state.cartGrandTotal} cartTotalItems={this.state.cartTotalItems} />
                  ) } 
                />

                <Route exact path="/login" render={(props) => !this.state.isLogin ? (<Login onUserAuth={this.userAuth} />) : <Redirect to='/' />} />
                <Route exact path="/register" render={ (props) => !this.state.isLogin ? (<Register />) : <Redirect to='/' />  } />
                <Route exact path="/forgot-password " render={ (props) => !this.state.isLogin ? (<ForgotPassword />) : <Redirect to='/' />  } />
              </Switch>
            </Grid>
          </React.Fragment>
        </Router>

        <style>{`
          body {
            background: #F0F0F0;
          }
          .page-wrapper {
            padding-top: 10px !important;
          }

        `}</style>
      </div>
    );
  }
}

export default App;
