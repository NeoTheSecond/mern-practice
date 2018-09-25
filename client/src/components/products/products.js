import React from 'react';
import axios from 'axios';
import ProductList from './productList';
import { Container, ListGroup } from 'reactstrap';
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
                products: res.data,
            }))
    }
    // componentDidMount() {
    //     if(this.state.product){
    //         const link = '/products/' + this.state.product._id
    //     }
    // }
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
