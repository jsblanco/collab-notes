import { User } from '../../models/User.models';
import * as constants from './auth.constants';

export const signup = {
    request: (email: string, password: string) => {
        return {
            type: constants.SIGNUP_REQUEST,
            payload: {email: email, password: password}
        }
    },
    success: (payload: { user: User, token: string }) => {
        return {
            type: constants.SIGNUP_SUCCESS,
            payload: payload
        }
    },
    failure: (error: any) => {
        return {
            type: constants.SIGNUP_FAILURE,
            payload: error
        }
    }
}

export const login = {
    request: (email: string, password: string) => {
        return {
            type: constants.LOGIN_REQUEST,
            payload: {email: email, password: password}
        }
    },
    success: (payload: { user: User, token: string }) => {
        return {
            type: constants.LOGIN_SUCCESS,
            payload: payload
        }
    },
    failure: (error: any) => {
        return {
            type: constants.LOGIN_FAILURE,
            payload: error
        }
    }
}

export const authenticate = (token: string, userId: string) => {
    return {
        type: constants.VALID_TOKEN_FOUND,
        payload: {token: token, userId: userId}
    }
}

export const logout = {
    request: () => {
        return {
            type: constants.LOGOUT_REQUEST,
        }
    },
    success: () => {
        return {
            type: constants.LOGOUT_SUCCESS,
        }
    },
    failure: (error: any) => {
        return {
            type: constants.LOGOUT_FAILURE,
            payload: error
        }
    }
}

export const triedAutologin = () => {
    return {
        type: constants.TRIED_AUTOLOGIN
    }
}
