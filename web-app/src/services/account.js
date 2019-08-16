import request from "../utils/request";
import * as Constants from "../utils/constants";
import auth from "../utils/auth";


export const saveMe = async () => {
    await request(Constants.URL_ACCOUNT_ME).then(response => {
        auth.setUserInfo(response.principal);
    }).catch(err => {
        console.log(err);
    });
};

export const getMe = () => {
    return auth.getUserInfo();
};

export const refreshToken = (token) => {
    let data = new FormData();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", token);

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
    });
};