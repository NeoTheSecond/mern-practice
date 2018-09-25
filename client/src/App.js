import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/navBar';
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Products from './components/products/products';
import Faq from './components/faq';
import Contact from './components/contact';
import Login from './components/auth/Login';
import Manage from './components/manage/manage';
import Product from './components/product/product';
const config = {
  issuer: 'https://dev-172989.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oag283rrbYk6ZAEd0h7'
}
function onAuthRequired({history}){
    history.push('/login')
}

class App extends Component {
    constructor(){
        super()
        this.state = {
            logedin: false
        }
    }
    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if (idToken.idToken === undefined){
            this.setState({
                logedin: false,
            })
        }else{
            this.setState({
                logedin: true,
            })
        }
    }
    render() {
        return (
            <Router>
                <Security issuer={config.issuer}
                      client_id={config.client_id}
                      redirect_uri={config.redirect_uri}
                      onAuthRequired={onAuthRequired}
                >
                    <NavBar logedin={this.state.logedin}/>
                    <Route exact path="/" component={Home} logedin={this.state.logedin}/>
                    <Route exact path="/products" component={Products} logedin={this.state.logedin}/>
                        <Route path="/products/:id" component={Product} logedin={this.state.logedin}/>
                    <Route path="/faq" component={Faq}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path='/login' render={() => <Login baseUrl='https://dev-172989.oktapreview.com' />} />
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    <SecureRoute exact path="/manage" component={Manage}/>
                </Security>
            </Router>

        );
    }
}

export default App;
