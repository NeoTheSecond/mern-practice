import React from 'react';
import ProductCreator from './productCreator';
// import Test from './Test';
import {
    Container
} from 'reactstrap';
import Products from '../products/products';
export default class Manage extends React.Component {
    render(){
        return(
            <Container>
                <ProductCreator/>
                {/* <Test/> */}
                <Products/>
            </Container>
        )
    }
}
