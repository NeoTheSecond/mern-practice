import React from 'react';
import axios from 'axios';
import ProductList from './productList';
import { Container, ListGroup } from 'reactstrap';
import Product from './product';
import {  BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
export default class Products extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
        }
    }
    componentWillMount() {
        axios.get('/api/products')
            .then(res => this.setState({
                products: res.data
            }))

    }
    render(){
        return(
            <Container>
                <h1>these are the products</h1>
                <ListGroup>
                    {this.state.products.map((product) =>{
                        return <ProductList product={product} key={product._id}/>
                    })}
                </ListGroup>
            </Container>
        )
    }
};
