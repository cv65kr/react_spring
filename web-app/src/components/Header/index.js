import React, { Component } from 'react';
import './styles.sass';
import NavBar from "../Layout/NavBar/index";
import {withRouter} from "react-router-dom";

class Index extends Component {

    render() {
        return (
            <header>
                <NavBar/>
            </header>
        );
    }
}

export default withRouter(Index);
