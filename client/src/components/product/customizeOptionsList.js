import React from 'react';
import { Container, ListGroup, ListGroupItem, Input, Button, ButtonGroup} from 'reactstrap';
import {  BrowserRouter as Router } from 'react-router-dom';
export default class CustomizeOptionsList extends React.Component {
    constructor(props){
        super(props)
        this.handlePick = this.handlePick.bind(this)
        this.state = {
            customizeOptions: this.props.customizeOption,
            selectedCustomizeOptions: [],
        }
        this.handlePick = this.handlePick.bind(this)
    }



    handlePick(event){
        event.preventDefault();
        //name chính là category
        let selectedCustomizeOption = this.state.selectedCustomizeOptions
        if(selectedCustomizeOption.length !== 0){
            if (selectedCustomizeOption.filter(customizeOption => customizeOption.category === event.target.name ).length > 0){
                selectedCustomizeOption.forEach(customizeOption => {
                    if(customizeOption.category === event.target.name){
                        customizeOption.option = event.target.value;
                        customizeOption.img = event.target.id;
                    }
                })
            }else{
                selectedCustomizeOption.push({
                    category: event.target.name,
                    option: event.target.value,
                    img: event.target.id
                })
            }
        }else{
            selectedCustomizeOption.push({
                category: event.target.name,
                option: event.target.value,
                img: event.target.id
            })
        }
        this.setState({
            selectedCustomizeOptions: selectedCustomizeOption
        })
    }


    handleAddToCart = e => {
        this.state.selectedCustomizeOptions.forEach((selectedCustomizeOption) => {
            console.log(selectedCustomizeOption)
        })
    }



    render(){
        // RENDER OPTION
        const optionsList = (options,category) => {
            return options.map((option, index) => <Input key={index} type="button" value={option.name} name={category} onClick={this.handlePick} id={option.img}/>)
        }

        // RENDER CUSTOMIZE OPTION LIST
        const customizeOptionList = this.props.customizeOption.map((customizeOption, index) =>
            <ListGroup key={index}>
                <ListGroupItem><Input type="button" value={customizeOption.category}/></ListGroupItem>
                {optionsList(customizeOption.options, customizeOption.category)}
            </ListGroup>
        );

        // IMAGES FOR SELECTED CUSTOMIZE OPTIONS
        let selectedCustomizeOptions = this.state.selectedCustomizeOptions.map((customizeOption, index) =>
            <img key={index} src={customizeOption.img} className="image"/>
        )
        return(
                <Container>
                    <h1>these are the customize options</h1>
                    {customizeOptionList}
                    <Container className="container">
                        <img src={this.props.baseProduct} className="image"></img>
                        {selectedCustomizeOptions}
                    </Container>
                    <Container>
                        <Button color="primary" onClick={this.handleAddToCart}>ADD TO CART</Button>
                    </Container>
                </Container>
        )

    }

};
