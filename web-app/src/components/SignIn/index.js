import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import auth from "../../utils/auth";
import logo from "../../images/logo.jpg";

import './styles.css';
import {connect} from "react-redux";
import {userSignIn} from "./actions";

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
        this.props.userSignIn(this.state)
    };

    render() {

        if (this.props.signIn.isSuccess || auth.isLogged()) {
            return (
                <Redirect to={"/"}/>
            )
        }

        return (
            <div>
                <div className={"columns is-vcentered"}>
                    <div className={"interactive-bg column is-8"}>
                        <section className={"section"}>
                            <div className={"has-text-centered"}>
                                <h1 className={"has-text-white is-size-1"}>SOME EXAMPLE TEXT</h1>
                            </div>
                        </section>
                    </div>
                    <div className={"login column is-4"}>
                        <section className={"section"}>
                            <div className={"has-text-centered"}>
                                <img className={"login-logo"} src={logo} alt={""} />
                            </div>

                            {!this.props.signIn.isSuccess && this.props.signIn.error &&
                            <div className={"notification is-danger"}>{this.props.signIn.error}</div>
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
                                <div className={"has-text-centered"}>
                                    <button type="submit" className={"button is-vcentered is-primary is-outlined is-medium"}>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <div className={"has-text-centered"}>
                                <Link to={"/sign-up"}> Don't you have an account? Sign up now!</Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, {params}) => {
    return {
        signIn: state.signIn
    };
};

const mapDispatchToProps = dispatch => ({
    userSignIn: signIn => dispatch(userSignIn(signIn))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
