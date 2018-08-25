import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
export default class Login extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <h1>This is Login</h1>
                    <input type='button' value="login"></input>

                    {/* <Route path="/" component={Home}></Route> */}
                </div>
            </Router>

        )
    }
}
