import { REGISTER, REGISTER_ERROR, REGISTER_LOADING, } from "../types";

const initialState = {
    registerLoading: false,
    register: [],
    registerError: []
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return {
                ...state,
                registerLoading: action.payload,
            };

        case REGISTER:
            return {
                ...state,
                register: action.payload,
            };

        case REGISTER_ERROR:
            return {
                ...state,
                registerError: action.payload,
            };

        default:
            return state;
    }
};
