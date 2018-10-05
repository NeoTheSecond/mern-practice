import React from 'react';
import axios from 'axios';
import CustomizeOptionsList from './customizeOptionsList';
import { Button, Container, ListGroup } from 'reactstrap';
import Designer from './Designer';
import { Redirect } from 'react-router';
import ProductEdit from './productEdit';
export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            redirectToReferrer: false,
            logedin: false,
            edit: false,
        }
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
            logedin: true
        })
    }
    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        if (idToken.idToken === undefined){
            this.setState({
                logedin: false,
            })
        }else{
            this.setState({
                logedin: true,
            })
        }
    }
    handleEdit = () => {
        this.setState((prevState) => ({
            edit: !prevState.edit
        }))
    }
    // const customizeOption = (customizeOptions) => {
    //     <Container>
    //         <h1></h1>
    //     </Container>>
    // }
    render(){
        if (this.state.redirectToReferrer){
            return <Redirect push to='/products'/>;
        }
        return(
                <div>
                    <h1>{this.state.product.name}</h1>
                    <h3>{this.state.product.price}</h3>
                    <h3>{this.state.product.sale}</h3>

                    <hr/>

                    {/* { this.state.logedin && <Button color="danger" onClick={this.handleDelete}>Delete</Button> } */}
                    {/* { this.state.logedin && <CustomizeOptionsCreator match={this.props.match}/> } */}
                    { this.state.product.customizeOptions && <CustomizeOptionsList customizeOption={this.state.product.customizeOptions} baseProduct={this.state.product.pic}/>}
                    <Container>
                        <Button onClick={this.handleEdit}>Edit</Button>
                        { this.state.logedin && this.state.edit && <ProductEdit match={this.props.match} product={this.state.product}/> }
                    </Container>
                    {/* <Designer/> */}
                </div>

        )
    }

};
