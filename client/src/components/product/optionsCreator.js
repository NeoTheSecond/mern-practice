import React from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input, Form, Label, FormGroup} from 'reactstrap';
import axios from 'axios';
export default class OptionsCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customizeOptions: this.props.customizeOptions,
            customizeOption: this.props.customizeOption
        }
    }

    handleChange = e => {
        // console.log(e.target);
        if(["name", "price", "sale"].includes(e.target.name)){
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        else{
            this.setState({
                img: e.target.files[0]
            })
        }
    }

    handleSubmit = (event) => {
        console.log("this is the og state: " + this.state.customizeOptions);
        event.preventDefault()
        let customizeOption = this.state.customizeOption
        const option = {
            name: this.state.name,
            price: this.state.price,
            sale: this.state.sale,
            img: null,
        }
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
        })
        .then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            option.img = fileURL;
            customizeOption.options = [...customizeOption.options, option]
            console.log(this.state.customizeOptions);
            // this.setState((prevState, customizeOption) => ({
            //     customizeOptions: [...prevState.customizeOptions, customizeOption]
            // }))
            // console.log(this.state.customizeOptions);
            return axios.patch('/api/products/' + this.props.match.params.id, {
                customizeOptions: this.state.customizeOptions,
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

    render(){
        return(
            <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input name="name"/>
                    <Label>Price</Label>
                    <Input name="price"/>
                    <Label>Sale</Label>
                    <Input name="sale"/>
                    <Label>Pic</Label>
                    <Input type="file" name="pic"/>
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </Form>
        )
    }
};
