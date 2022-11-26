import { TERM_SHEET, TERM_SHEET_ERROR, TERM_SHEET_LOADING } from "../types";


const initialState = {
    termSheetLoading: false,
    termSheet: [],
    termSheetError: []
}

export const termSheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case TERM_SHEET_LOADING:
            return {
                ...state,
                termSheetLoading: action.payload,
            };

        case TERM_SHEET:
            return {
                ...state,
                termSheet: action.payload,
            };

        case TERM_SHEET_ERROR:
            return {
                ...state,
                termSheetError: action.payload,
            };

        default:
            return state;
    }
}