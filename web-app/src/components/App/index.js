import React, {Component} from 'react';
import './styles.css';

import Footer from "../Footer";
import Header from "../Header";
import {withRouter} from "react-router-dom";

class Index extends Component {

  render() {
    return (
        <div>
            <Header />
                <div className="container">
                  <br /><br /><br />
                  Homepage
                    <br /><br /><br />
                </div>
            <Footer />
        </div>
    );
  }
}

export default withRouter(Index)
