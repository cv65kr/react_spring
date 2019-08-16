import request from "../../utils/request";
import * as Constants from "../../utils/constants";
import {saveMe} from "../../services/account";
import auth from "../../utils/auth";

export const userSignIn = (user) => {
    return dispatch => {

        let data = new FormData();
        data.append("grant_type", "password");
        data.append("username", user.email);
        data.append("password", user.password);

        let requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': Constants.TOKEN_BASIC
            },
            body: data
        };

        request(Constants.URL_ACCOUNT_TOKEN, requestOptions, false).then(response => {
            auth.setCurrentToken(
                response.access_token,
                response.refresh_token,
                new Date(new Date().getTime() + (1000 * response.expires_in)).getTime().toString()
            );

            saveMe().then(me => {
                dispatch(signInUser({
                    isSuccess: true,
                    error: ''
                }));
            }).catch(err => {
                dispatch(signInUser({
                    isSuccess: false,
                    error: 'Account data is invalid'
                }));
            });

        }).catch(err => {
            dispatch(signInUser({
                isSuccess: false,
                error: 'Account data is invalid'
            }));
        });
    }
};

const signInUser = userObj => ({
    type: 'SIGN_IN',
    payload: userObj
});