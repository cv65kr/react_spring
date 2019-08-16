import { isEmpty } from 'lodash';

export const TOKEN_KEY = 'token';
export const TOKEN_REFRESH_KEY = 'token_refresh';
export const TOKEN_EXPIRE_TIME = 'token_expire';

const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
    /**
     * Remove an item from the used storage
     * @param  {String} key [description]
     */
    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    },

    /**
     * Clear all app storage
     */
    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    /**
     * Returns data from storage
     * @param  {String} key Item to get from the storage
     * @return {String|Object}     Data from the storage
     */
    get(key) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },

    getUserInfo(userInfo = USER_INFO) {
        return auth.get(userInfo);
    },

    isLogged() {

        let user = auth.getUserInfo();
        if (null == user) {
            return false;
        }

        return user.enabled === true;
    },

    /**
     * Set data in storage
     * @param {String|Object}  value    The data to store
     * @param {String}  key
     * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
     */
    set(value, key, isLocalStorage) {
        if (isEmpty(value)) {
            return null;
        }

        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }

        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    },

    setCurrentToken(token, refreshToken, expireIn) {
        this.setToken(token, true, TOKEN_KEY);
        this.setToken(refreshToken, true, TOKEN_REFRESH_KEY);
        this.setToken(expireIn, true, TOKEN_EXPIRE_TIME);
    },

    setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
        return auth.set(value, tokenKey, isLocalStorage);
    },

    setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
        return auth.set(value, userInfo, isLocalStorage);
    },
};

export default auth;
