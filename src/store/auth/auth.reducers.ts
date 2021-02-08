import * as constants from './auth.constants'

type StateType = {
    isLoggedIn: boolean,
    didTryAutoLogin: boolean,
    token: string,
    userId: string
}

const initialState: StateType = {
    isLoggedIn: false,
    didTryAutoLogin: false,
    token: '',
    userId: ''
}

const authReducer = (state: StateType = initialState, {type, payload}: { type: string, payload: any }) => {
    switch (type) {
        case constants.SIGNUP_SUCCESS:
        case constants.LOGIN_SUCCESS:
        case constants.VALID_TOKEN_FOUND:
            return {
                ...state,
                isLoggedIn: true,
                token: payload.token,
                userId: payload.userId,
            };
        case constants.TRIED_AUTOLOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            };
        case constants.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                userId: ''
            }
        default:
            return {...state};
    }
}

export default authReducer;
