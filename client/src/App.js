import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/navBar';
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';
import {  BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './components/home';
import Products from './components/products';
import Faq from './components/faq';
import Contact from './components/contact';
import Login from './components/auth/Login';
import Manage from './components/manage';
import Product from './components/product';
const config = {
  issuer: 'https://dev-172989.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oag283rrbYk6ZAEd0h7'
}
// import Designer from './components/Designer';
function onAuthRequired({history}){
    history.push('/login')
}

class App extends Component {
  render() {
    return (
        <Router>
            <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired={onAuthRequired}
            >
                <NavBar/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/products" component={Products}/>
                 <Route exact path="/products/:id" component={Product}/>
                <Route path="/faq" component={Faq}/>
                <Route path="/contact" component={Contact}/>
                <Route path='/login' render={() => <Login baseUrl='https://dev-172989.oktapreview.com' />} />
                <Route path='/implicit/callback' component={ImplicitCallback}/>
                <SecureRoute path="/manage" component={Manage}/>
            </Security>
        </Router>

    );
  }
}

export default App;
