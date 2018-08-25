import React from 'react';
import { Container, Input, Button } from 'reactstrap';
import axios from 'axios';
export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fileSelected: null,
            file: null
        }
        this.handleFile = this.handleFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        formData.append("tags", `codeinfuse, medium, gist`);
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
            console.log(data.url);
        })
    }

    render() {
        return(
            <Container>
                <Input type="file" onChange={this.handleFile}></Input>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Container>
        )
    }
}
