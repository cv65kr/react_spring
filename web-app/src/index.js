import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App/index";
import SignIn from "./components/SignIn/index";
import SignUp from "./components/SignUp/index";
import Logout from "./components/Logout/index";
import Error from "./components/Error/index";

import * as serviceWorker from "./serviceWorker";
import Reducer from "./reducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/logout" component={Logout} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
