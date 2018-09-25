import React from 'react';
import { Container, ListGroup, ListGroupItem} from 'reactstrap';
import {  BrowserRouter as Router } from 'react-router-dom';
export default class CustomizeOptionsList extends React.Component {
    constructor(props){
        super(props)
        this.handlePick = this.handlePick.bind(this)
        this.state = {
            customizeOptions: this.props,
            selectedCustomizeOptions: [],
        }
        this.handlePick = this.handlePick.bind(this)
    }
    handlePick(event){
        // this.setState((prevState) => {
        //     selectedCustomizeOptions: [...prevState.selectedCustomizeOptions, event.target.className]
        // })
        let selectedCustomizeOptions = [...selectedCustomizeOptions, event.target.className]
        this.setState({
            selectedCustomizeOptions: selectedCustomizeOptions
        })

        // this.setState({
        //     selectedCustomizeOptions: event.target.className
        // })
        // this.setState((prevState) =>{
        //     selectedCustomizeOptions: event.target.className
        // })
        // console.log(event.target.className);
        // return <img src={this.state.selectedCustomizeOptions} className='image'></img>

    }
    render(){
        const customizeOptionList = this.props.customizeOption.map((customizeOption, index) =>
            <ListGroup key={index}>
                <ListGroupItem><input value={customizeOption.name} className={customizeOption.pic} type="button" onClick={this.handlePick} key={index}></input></ListGroupItem>
                <hr/>
            </ListGroup>
        );
        return(
                <Container>
                    <h1>these are the customize options</h1>
                    {customizeOptionList}
                    <Container className="container">
                        <img src={this.props.baseProduct} className="image"></img>
                        <img src={this.state.selectedCustomizeOptions} className='image'></img>
                        {/* {this.state.selectedCustomizeOptions.map((customizeOption, index) => {
                            return(
                                <img src={this.state.selectedCustomizeOptions} className='image' key={index}></img>
                            )
                        })} */}
                        {/* <img src={Songoku} className='image'></img>
                        <img src={SleveLeftBlue} className='image'></img> */}
                    </Container>
                </Container>
        )

    }

};
