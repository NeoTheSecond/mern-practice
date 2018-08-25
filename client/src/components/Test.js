// import React from 'react';
// import { Button } from 'reactstrap';
// import Form from './Form';
// export default class Test extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             custom: false
//         }
//         this.handleAddField = this.handleAddField.bind(this)
//     }
//     handleAddField(){
//         this.setState({
//             custom: true
//         })
//     }
//     render(){
//          if (this.state.custom){
//              return <input type="text" placeholder="type in something"/>
//          }
//         const customFields = <div>
//             <input type="text" placeholder="name"/>
//             <input type="text" placeholder="price"/>
//             <input type="file"/>
//         </div>
//
//
//         return(
//             <div>
//                 <Button onClick={this.handleAddField}>Add Field</Button>
//                 { this.state.custom && customFields }
//                 <hr/>
//                 <Button>Submit</Button>
//             </div>
//         )
//     }
// }
import { Button } from 'reactstrap';
import React from 'react';
import {Form, Text} from 'react-form';
export default class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedValues: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(submittedValues) {
        this.setState({submittedValues: submittedValues})
        console.log(this.state.submittedValues)
    }
    render() {
        return (<div>
            <Form onSubmit={this.handleSubmit}>
                {
                    formApi => (<div>
                        <form onSubmit={formApi.submitForm} id="dynamic-form">
                            <label>Name</label>
                            <Text field="name"/> {
                                formApi.values.customizeOptions && formApi.values.customizeOptions.map((customizeOption, i) => (<div key={`customizeOption{i}`}>
                                    <label>Customize Option</label>
                                    <Text field={['customizeOptions', i]} id={`customizeOption-${i}`}/>
                                    <input type="file" />
                                    <Button onClick={() => formApi.removeValue('customizeOptions', i)} type="button" color="danger">Remove</Button>
                                </div>))
                            }
                            <Button type="submit" color="success" >Submit</Button>
                        </form>
                        <Button onClick={() => formApi.addValue('customizeOptions', '')} type="button" >Add Customize Options</Button>
                    </div>)
                }
            </Form>
        </div>);
    }
}
