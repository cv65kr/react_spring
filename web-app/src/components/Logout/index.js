import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import auth from "../../utils/auth";

class Index extends Component {
    render() {
        auth.clearAppStorage();

        return <Redirect to={"/"} />
    }
}

export default Index;