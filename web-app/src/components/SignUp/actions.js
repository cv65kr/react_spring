import request from "../../utils/request";
import {URL_SIGN_UP} from "./../../utils/constants";
import * as Constants from "../../utils/constants";

export const userSignUp = user => {
    return dispatch => {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': Constants.TOKEN_BASIC
            },
            body: JSON.stringify({
                "email": user.email,
                "password": user.password
            })
        };

        return request(URL_SIGN_UP, requestOptions, false).then(data => {
            dispatch(signUpUser({
                isSuccess: true,
                error: ''
            }));
        }).catch(err => {
            if (err.response.status === 409) {
                dispatch(signUpUser({
                    isSuccess: false,
                    error: 'Account already exists'
                }));
            } else {
                dispatch(signUpUser({
                    isSuccess: false,
                    error: 'Data is invalid'
                }));
            }
        });
    }
};

const signUpUser = userObj => ({
    type: 'SIGN_UP',
    payload: userObj
});