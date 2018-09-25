import React from 'react';
import { Button, Container, ListGroup, Label, Input } from 'reactstrap';
import CustomizeOptionsCreator from './customizeOptionsCreator';
import axios from 'axios';
export default class ProductEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // name: this.props.product.name,
            // price: this.props.product.price,
            // sale: this.props.product.sale,
            name: "",
            price: "",
            sale: "",
        }
    }
    handleDelete = () => {
        axios.delete('/api/products/' + this.props.match.params.id)
        .then(res => {
            if (res.status === 200) {
                alert('successfully deleted')
                this.setState({ redirectToReferrer: true});
            }
            else {
                alert('not success')
            }
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <Container>
                {this.props.product.customizeOptions && <CustomizeOptionsCreator match={this.props.match} customizeOptions={this.props.product.customizeOptions}/>}
                <hr/>
                <Container>
                    <h1>Edit Product</h1>
                    <Label>Name</Label>
                    <Input onChange={this.handleChange} name='name'></Input>
                    <hr/>
                    <Label>Price</Label>
                    <Input onChange={this.handleChange} name='price'></Input>
                    <hr/>
                    <Label>Sale</Label>
                    <Input onChange={this.handleChange} name='sale'></Input>
                </Container>
                <br/>
                <Button color="danger" onClick={this.handleDelete}>Delete</Button>

            </Container>
        )
    }
};
