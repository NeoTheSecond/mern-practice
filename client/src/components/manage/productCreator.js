import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
export default class ProductCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: '',
            productPrice: '',
            productImageURL: '',
            sale: '',
            img: "",
            redirectToReferrer: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        var url = "https://api.cloudinary.com/v1_1/giaphatocphamphu/image/upload";
        const formData = new FormData();
        formData.append("file", this.state.img);
        formData.append("upload_preset", "oxljmzfc"); // Replace the preset name with your own
        formData.append("api_key", "915351483667299"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);
        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        return axios.post(url, formData, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            this.setState({
                productImageURL: fileURL
            })
            return axios.post('api/products', {
                name: this.state.productName,
                pic: this.state.productImageURL,
                price: this.state.productPrice,
                sale: this.state.sale,
            })
        })
        .then(res => {
            if(res.status === 200){
                alert('success');
                this.setState({ redirectToReferrer: true});
            }
            else{
                alert('failed')
            }
        })
}
    handleChange(event) {
        if(event.target.name !== "img"){
            this.setState({
                [event.target.name]: event.target.value
            })
        } else{
            this.setState({
                img: event.target.files[0]
            })
        }
    }
    render() {
        if (this.state.redirectToReferrer){
            return <Redirect push to='/products'/>;
        }
        return (
            <Container>
            <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Product Name</Label>
                    <Input name="productName"></Input>
                    <Label>Product Image</Label>
                    <Input name="img" type="file"/>
                    <Label>Price</Label>
                    <Input name="productPrice"></Input>
                    <Label>Sale</Label>
                    <Input name="sale"></Input>
                    <hr/>
                    <Button type='submit'>Submit</Button>
                </FormGroup>
            </Form>
        </Container>)
    }
}
