import React from 'react';

export default class OptionsCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <h1>{this.props.option.name}</h1>
        )
    }
};
