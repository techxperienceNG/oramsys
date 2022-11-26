import { CHANGE_LOGIN_STATE, LOGIN, LOGIN_ERROR, LOGIN_LOADING } from '../types';

const initialState = {
    is_loggedin: false,
    loginLoading: false,
    login: [],
    loginError: []
};

export const isUserLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loginLoading: action.payload,
            };

        case LOGIN:
            return {
                ...state,
                login: action.payload.res,
                is_loggedin: action.payload.is_loggedin,
            };
        case CHANGE_LOGIN_STATE:
            return {
                ...state,
                is_loggedin: action.payload.is_loggedin,
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload,
            };

        default:
            return state;
    }
};
