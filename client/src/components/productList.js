import React from 'react';
import { Container, ListGroup, ListGroupItem} from 'reactstrap';
import './styles/productList.css';
import Product from './product';
import {  BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
export default class ProductList extends React.Component {
    render(){
        const link = '/products/' + this.props.product._id
        return(
            <Router>
                <div>
                    <ListGroup>
                        <ListGroupItem>
                            <a href={link}><h1>{this.props.product.name}</h1></a>
                            <img src={this.props.product.pic}/>
                            <h3>{this.props.product.price}</h3>
                            <h3>{this.props.product.sale}</h3>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </Router>
        )
    }
};
