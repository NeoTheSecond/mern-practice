import React from 'react';
import {Button} from 'reactstrap';
import Form from './Form';
export default class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            img: "",
            customizeOptions: [
                {
                    name: "",
                    img: ""
                }
            ]
        }
        this.handleAddField = this.handleAddField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleAddField = (e) => {
        this.setState((prevState) => ({
            customizeOptions: [...prevState.customizeOptions, {
                    name: "",
                    img: ""
                }
            ]
        }));
    }
    handleChange = (e) => {
        if (["name", "img"].includes(e.target.className)) {
            let customizeOptions = [...this.state.customizeOptions]
            customizeOptions[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({
                customizeOptions
            }, () => console.log(this.state.customizeOptions))
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
    }
    render() {
        let {customizeOptions} = this.state
        return (<div>
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label>Name</label>
                <input type="text" name="name"/>
                <br/>
                <label>Image</label>
                <input type="file" name="img"/>
                <br/>
                <button onClick={this.handleAddField}>Add Customize Option</button>
                <hr/> {
                    customizeOptions.map((customizeOption, index) => {
                        let customizeOptionId = `customizeOption-${index}`, imgId = `age-${index}`
                        return (
                            <div key={index}>
                <label htmlFor={customizeOption}>{`Customize Option #${index + 1}`}</label>
                <input
                  type="text"
                  name={customizeOption}
                  data-id={index}
                  id={customizeOption}
                  className="name"
                />
                <label htmlFor={imgId}>Image</label>
                <input
                  type="file"
                  name={imgId}
                  data-id={index}
                  id={imgId}
                  className="img"
                />
              </div>
                        )
                    })
                }
                <Button onClick={this.handleSubmit}>Submit</Button>
            </form>
        </div>)
    }
}
