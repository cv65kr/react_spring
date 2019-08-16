import React, { Component } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import auth from "../../../utils/auth";
import logo from "../../../images/logo.jpg";
import './styles.css';

const VISIBLE_ALWAYS = 0;
const VISIBLE_FOR_AUTH = 1;
const VISIBLE_FOR_UNAUTH = 2;

const NavBarItems = [
    {
        text: 'Home page',
        url: '/',
        visible: VISIBLE_ALWAYS
    },
    {
        text: 'Sign in',
        url: '/sign-in',
        visible: VISIBLE_FOR_UNAUTH
    },
    {
        text: 'Sign up',
        url: '/sign-up',
        visible: VISIBLE_FOR_UNAUTH
    },
    {
        text: 'Logout',
        url: '/logout',
        visible: VISIBLE_FOR_AUTH
    }
];

class Index extends Component {
    state = {
        hamburgerIsOpen: false,
        loggedIn: false,
    };

    componentDidMount() {
        this.setState(() => ({
            loggedIn: auth.isLogged()
        }));
    }

    render() {
        return (
            <nav
                className={"navbar is-primary"}
                role={"navigation"}
                aria-label={"main navigation"}
            >
                <div className={"navbar-brand"}>
                    <Link className={"navbar-item"} to={"/"}>
                        <img src={logo}  alt={""} />
                    </Link>

                    <a
                        role={"button"}
                        className={`navbar-burger ${this.state.hamburgerIsOpen ? 'is-active' : ''}`}
                        aria-label={"menu"}
                        aria-expanded={"false"}
                        onClick={() => this.setState(state => ({ hamburgerIsOpen: !state.hamburgerIsOpen}))}
                    >
                        <span aria-hidden={"true"}></span>
                        <span aria-hidden={"true"}></span>
                        <span aria-hidden={"true"}></span>
                    </a>
                </div>

                <div className={`navbar-menu ${this.state.hamburgerIsOpen ? 'is-active' : ''}`}>
                    <div className={"navbar-end"}>
                        {
                            NavBarItems
                                .filter(item => (item.visible === VISIBLE_ALWAYS) || (item.visible === VISIBLE_FOR_AUTH && this.state.loggedIn) || (item.visible === VISIBLE_FOR_UNAUTH && !this.state.loggedIn))
                                .map(item => (
                                    <NavLink exact={true} to={item.url} key={item.text} activeClassName={"is-active"} className={"navbar-item"}>
                                        {item.text}
                                    </NavLink>
                            ))
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Index);