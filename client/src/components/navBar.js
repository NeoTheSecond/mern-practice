import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,} from 'reactstrap';
import {  BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './home';
import Products from './products';
import Faq from './faq';
import Contact from './contact';
import Login from './login';
import Manage from './manage';
import Product from './product';
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        logedin: false,
        isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
     <Router>
         <div>
             <div>
                 <Navbar color="light" light expand="md">
                   <NavbarBrand href="/">Shopping</NavbarBrand>
                   <NavbarToggler onClick={this.toggle} />
                   <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                       <NavItem>
                         <NavLink><Link to="/products">Products</Link></NavLink>
                       </NavItem>
                       <NavItem>
                         <NavLink><Link to="/faq">FAQ</Link></NavLink>
                       </NavItem>
                       <NavItem>
                          <NavLink><Link to="/contact">Contact</Link></NavLink>
                       </NavItem>
                       <NavItem>
                          <NavLink><Link to="/login" >Login</Link></NavLink>
                       </NavItem>
                       <NavItem>
                          <NavLink><Link to="/manage" >Manage</Link></NavLink>
                       </NavItem>
                     </Nav>
                   </Collapse>
                 </Navbar>
             </div>


           <div>
               <Switch>
                   <Route exact path="/" component={Home}/>
                   <Route exact path="/products" component={Products}/>
                    <Route exact path="/products/:id" component={Product}/>
                   <Route path="/faq" component={Faq}/>
                   <Route path="/contact" component={Contact}/>
                   {/* <Route path="/login" component={Login}/> */}
                   <Route path="/manage" component={Manage}/>
               </Switch>
           </div>
         </div>
     </Router>
    );
  }
}
