import { COMPANY_DATA } from '../types';

const initialState = {
    companydata: [],
};

export const companydataReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_DATA:
            return {
                ...state,
                companydata: action.payload,
            };
        default:
            return state;
    }
};
