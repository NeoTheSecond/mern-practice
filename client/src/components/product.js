import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import Designer from './Designer';
import { Redirect } from 'react-router';
const url = require('url');
export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            redirectToReferrer: false,
            deleteButton: false,
        }
        this.handleDelete = this.handleDelete.bind(this)
        let logedin = OktaSignIn.session.get()
        console.log(logedin);
    }

    handleDelete(){
        axios.delete('/api/products/' + this.props.match.params.id)
        .then(res => {
            if (res.status == 200) {
                alert('successfully deleted')
                this.setState({ redirectToReferrer: true});
            }
            else {
                alert('not success')
            }
        })
    }

    componentWillMount() {
        axios.get('/api/products/' + this.props.match.params.id)
            .then(res => this.setState({
                product: res.data
            })
        )
            .catch(err => console.log('There has been some error: ' + err))
    }
    deleteButton = () =>{
        this.setState({
            deleteButton: true
        })
    }

    render(){
        if (this.state.redirectToReferrer){
            return <Redirect push to='/products'/>;
        }
        return(
                <div>
                    <h1>{this.state.product.name}</h1>
                    <img src={this.state.product.pic}></img>
                    <h3>{this.state.product.price}</h3>
                    <h3>{this.state.product.sale}</h3>
                    <hr/>
                    { this.state.deleteButton && <Button color="danger" onClick={this.handleDelete}>Delete</Button> }
                    {/* <Designer/> */}
                </div>

        )
    }

};
