import 'whatwg-fetch';
import auth, {TOKEN_EXPIRE_TIME, TOKEN_REFRESH_KEY} from './auth';
import {refreshToken} from "../services/account";

function parseJSON(response) {
    return response.text().then(function(text) {
        return text ? JSON.parse(text) : {}
    });
}

/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
function formatQueryParams(params) {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(
    url,
    options = {},
    stringify = true
) {
    // Set headers
    if (stringify) {

        options.headers = Object.assign(
            {
                'Content-Type': 'application/json',
            },
            options.headers,
            {}
        );
    }

    let token = auth.getToken();

    if (token) {

        // If token expire
        const tokenExpireTimestamp = auth.get(TOKEN_EXPIRE_TIME);
        if (new Date() > new Date().setTime(tokenExpireTimestamp)) {
            refreshToken(auth.get(TOKEN_REFRESH_KEY));
            token = auth.getToken();
        }

        options.headers = Object.assign(
            {
                Authorization: `Bearer ${token}`,
            },
            options.headers
        );
    }

    if (options && options.params) {
        const params = formatQueryParams(options.params);
        url = `${url}?${params}`;
    }

    // Stringify body object
    if (options && options.body && stringify) {
        options.body = JSON.stringify(options.body);
    }

    function checkStatus(response) {
        if (response.ok) {
            return response;
        }

        let error = new Error(response.statusText);
        error.response = response;

        throw error;
    }

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}
