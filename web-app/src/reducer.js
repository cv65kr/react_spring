const initialState = {
    signUp: {},
    signIn: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGN_UP':
            return {...state, signUp: action.payload};
        case 'SIGN_IN':
            return {...state, signIn: action.payload};
        default:
            return state;
    }
}