import React, { Component } from 'react';
import './styles.sass';
import {Link} from "react-router-dom";

export class Index extends Component {
    render() {
        return (
            <div className={"container has-text-centered"}>
                <div className={"m-top-30"}>
                    <h1 className={"is-size-1"}>PAGE NOT FOUND</h1>
                    <Link to={"/"}>Back to homepage</Link>
                </div>
            </div>
        );
    }
}

export default Index;
