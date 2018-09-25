import React from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input, Form} from 'reactstrap';
import axios from 'axios';
import OptionsCreator from './optionsCreator';
export default class CustomizeOptionsCreator extends React.Component {
    constructor() {
        super()
        // this.state = {
        //     customizeOptions: [
        //         {
        //             name: "",
        //             price: "",
        //             pic: ""
        //         }
        //     ],
        //     img: "",
        // }
        this.state = {
            customizeOptions: [
                {
                    category: "",
                    options: [],
                }
            ],
            toggler: false,
            add: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // handleChange = (e) => {
    //     if (["name", "price"].includes(e.target.className)) {
    //         let customizeOptions = [...this.state.customizeOptions]
    //         customizeOptions[0][e.target.className] = e.target.value
    //         this.setState({
    //             customizeOptions
    //         })
    //     } else {
    //         this.setState({
    //             [e.target.name]: e.target.files[0]
    //         })
    //     }
    // }
    handlePick = e => {
        console.log(e);
        // return <OptionsCreator option={customizeOption.options}/>
    }
    handleChange = (e) => {
        if (["category"].includes(e.target.className)) {
            let customizeOptions = [...this.state.customizeOptions]
            customizeOptions[0][e.target.className] = e.target.value
            this.setState({
                customizeOptions
            })
        } else {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        }
    }
    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     var url = "https://api.cloudinary.com/v1_1/giaphatocphamphu/image/upload";
    //     const formData = new FormData();
    //     formData.append("file", this.state.img);
    //     formData.append("upload_preset", "oxljmzfc"); // Replace the preset name with your own
    //     formData.append("api_key", "915351483667299"); // Replace API key with your own Cloudinary key
    //     formData.append("timestamp", (Date.now() / 1000) | 0);
    //     // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    //     return axios.post(url, formData, {
    //         headers: {
    //             "X-Requested-With": "XMLHttpRequest"
    //         }
    //     })
    //     .catch(err => console.log("There has been ERROR: " + err))
    //     .then(response => {
    //         console.log(response.status);
    //         const data = response.data;
    //         const fileURL = data.secure_url // You should store this URL for future references in your app
    //         let customizeOptions = this.state.customizeOptions
    //         console.log(customizeOptions);
    //         customizeOptions[0].pic = fileURL
    //         this.setState({
    //             customizeOptions: customizeOptions
    //         })
    //         return axios.patch('/api/products/' + this.props.match.params.id, {
    //             customizeOptions: this.state.customizeOptions
    //         }).catch(err => console.log(err))
    //     })
    //     .then(res => {
    //         if(res.status === 200){
    //             alert('success')
    //
    //         }
    //         else{
    //             alert('failed')
    //         }
    //     })
    // }
    handleSubmit = e => {
        axios.patch('/api/products/' + this.props.match.params.id, {
            customizeOptions: this.state.customizeOptions
        })
        .then(res => {
            if(res.status === 200){
                alert('success')
            }
            else{
                alert('failed')
            }
        })
    }

    handleAdd = () => {
        this.setState({
            add: true
        })
    }

    // addCategory = (e) => {
    //     return
    //         <Form>
    //
    //         </Form>
    // }

    render() {

        const customizeOptionsList = this.props.customizeOptions.map((customizeOption, index) =>
                <ListGroup key={index}>
                    <ListGroupItem><Input value={customizeOption.category} type="button" onClick={this.handlePick} key={index} customizeOption={customizeOption}></Input></ListGroupItem>
                        {/* {customizeOption.options.map((option, index) =>
                            <ListGroupItem key={index}>
                                <h2>{option.name}</h2>
                            </ListGroupItem>
                        )} */}
                    <hr/>
                </ListGroup>
        );
        return (
        <div>

            {/* <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <div>
                    <label>{`Category`}</label>
                    <input
                      type="text"
                      name="category"
                      className="category"
                    />
              </div>
                <hr/>
                <div>
                    <label>{`Customize Option`}</label>
                    <input
                      type="text"
                      name="name"
                      className="name"
                    />
                    <label>{`Price`}</label>
                    <input
                      type="text"
                      name="price"
                      className="price"
                    />
                    <label>Image</label>
                    <input
                      type="file"
                      name="img"
                      className="img"
                    />
              </div>
                <Button type="submit">Submit</Button>
            </form> */}
            {customizeOptionsList}
            <Button onClick={this.handleAdd}>Add new category</Button>
            <br/>
            {this.state.add &&
                <div>
                    <input onChange={this.handleChange} className="category" ></input>
                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </div>
            }
        </div>)
    }
}
