import React from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input, Form} from 'reactstrap';
import axios from 'axios';
import OptionsCreator from './optionsCreator';
export default class CustomizeOptionsCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customizeOption: {
                category: "",
                options: [],
            },
            customizeOptions: this.props.customizeOptions,
            toggler: false,
            add: false,
            addOption: false,
            categoryId: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = (e) => {
        if (["category"].includes(e.target.className)) {
            let customizeOption = this.state.customizeOption
            customizeOption.category = e.target.value
            this.setState({
                customizeOption: customizeOption
            })
        }
    }
    handleSubmit = e => {
        // this.setState((prevState) => ({
        //     customizeOptions: [...prevState.customizeOptions, this.state.customizeOption]
        // }))
        let customizeOptions = [...this.state.customizeOptions, this.state.customizeOption]
        console.log(customizeOptions);
        axios.patch('/api/products/' + this.props.match.params.id, {
            customizeOptions: customizeOptions
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

    handleAddOption = (index) => {
        this.setState((prevState) => ({
            categoryId: index,
            addOption: !prevState.addOption,
        }))
        setTimeout(() => console.log(this.state),2000)
    }


    render() {

        const customizeOptionsList = this.props.customizeOptions.map((customizeOption, index) =>
                <ListGroup key={index}>
                    <ListGroupItem><Input value={customizeOption.category} type="button" onClick={this.handlePick} key={index} customizeOption={customizeOption}></Input>
                        {customizeOption.options.map((option, index) =>
                            <ListGroupItem key={index}>
                                <h2>{option.name}</h2>
                                <img src={option.img}></img>
                            </ListGroupItem>
                        )}
                        <Button onClick={() => this.handleAddOption(index)}>Add Option</Button>
                        {this.state.addOption && this.state.categoryId === index &&  <OptionsCreator customizeOptions={this.props.customizeOptions} match={this.props.match} customizeOption={customizeOption}/>}
                    </ListGroupItem>
                    <hr/>
                </ListGroup>
        );
        return (
        <div>
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
