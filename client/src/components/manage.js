import React from 'react';
import ProductCreator from './productCreator';
import Designer from './Designer';
// import Test from './Test';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import cloudinary from 'cloudinary';
import Products from './products';
export default class Manage extends React.Component {
    render(){
        return(
            <div>
                <ProductCreator/>
                {/* <Test/> */}
                <Products/>
                {/* <Designer/> */}

            </div>
        )
    }
}
