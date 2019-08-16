import React, {Component} from 'react';

import Footer from "../Footer";
import Header from "../Header";

import './styles.sass';
import {connect} from "react-redux";
import {userSignUp} from "./actions";
import {Redirect} from "react-router-dom";
import auth from "../../utils/auth";

class Index extends Component {

    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.userSignUp(this.state)
    };

    render() {

        if (this.props.signUp.isSuccess || auth.isLogged()) {
            return (
                <Redirect to={"/"}/>
            )
        }

        return (
            <div>
                <Header/>
                <div className={"container"}>
                    <div id="login">
                        <div className="login-card">
                            <div className="card-title">
                                <h1>Don't you have an account? Sign up now!</h1>
                            </div>

                            <div className="content">

                                {!this.props.signUp.isSuccess && this.props.signUp.error &&
                                    <div className={"notification is-danger"}>{this.props.signUp.error}</div>
                                }

                                <form onSubmit={this.handleSubmit}>
                                    <div className={"field"}>
                                        <label className={"label"}>Email</label>
                                        <div className={"control has-icons-left"}>
                                            <input className={"input is-medium"}
                                                   value={this.state.email}
                                                   name={"email"}
                                                   onChange={this.handleChange}
                                                   type="email"
                                                   required
                                            />
                                            <span className={"icon is-small is-left"}>
                                            <i className={"fa fa-user"}></i>
                                          </span>
                                        </div>
                                    </div>

                                    <div className={"field"}>
                                        <label className={"label"}>Password</label>
                                        <div className={"control has-icons-left"}>
                                            <input className={"input is-medium"}
                                                   name={"password"}
                                                   value={this.state.password}
                                                   onChange={this.handleChange}
                                                   type="password"
                                                   required
                                            />
                                            <span className={"icon is-small is-left"}>
                                            <i className={"fa fa-key"}></i>
                                          </span>
                                        </div>
                                    </div>

                                    <button type="submit" className={"button is-vcentered is-primary is-outlined is-medium"}>
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    };
}

const mapStateToProps = (state, {params}) => {
    return {
        signUp: state.signUp
    };
};

const mapDispatchToProps = dispatch => ({
    userSignUp: signUp => dispatch(userSignUp(signUp))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
