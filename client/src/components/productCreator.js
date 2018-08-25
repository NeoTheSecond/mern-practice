import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import axios from 'axios';
export default class ProductCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: '',
            productPrice: '',
            productImageURL: '',
            sale: '',
            fileSelected: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFile = this.handleFile.bind(this)
        this.createUI = this.createUI.bind(this)
    }
    handleFile(event) {
        const file= event.target.files
        this.setState({
            fileSelected: event.target.files[0],
            // file: URL.createObjectURL(event.target.files[0])
        })

    }
    handleSubmit(){
        const formData = new FormData();
        formData.append("file", this.state.fileSelected);
        formData.append("upload_preset", "oxljmzfc"); // Replace the preset name with your own
        formData.append("api_key", "915351483667299"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        return axios.post("https://api.cloudinary.com/v1_1/giaphatocphamphu/image/upload", formData, {
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
            if(res.status == 200){
                alert('success')

            }
            else{
                alert('failed')
            }
        })
}
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    createUI(){
        return(
            <div>
                <Input type='text'/>
                <Input type='file'/>
            </div>
        )
    }
    // handleSubmit(event) {
    //     axios.post('api/products', {name: this.state.productName}).then(res => console.log(res)).catch(err => console.log(err))
    // }
    render() {
        return (
            <Container>
            <Form>
                <FormGroup>
                    <Label>Product Name</Label>
                    <Input name="productName" value={this.state.productName} onChange={this.handleChange}></Input>
                    <Label>Product Image</Label>
                    <Input type="file" onChange={this.handleFile}/>
                    <Label>Price</Label>
                    <Input name="productPrice" value={this.state.productPrice} onChange={this.handleChange}></Input>
                    <Label>Sale</Label>
                    <Input name="sale" value={this.state.sale} onChange={this.handleChange}></Input>
                    <Button type="button" onClick={this.createUI}>Add Custom</Button>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </FormGroup>
            </Form>
        </Container>)
    }
}
