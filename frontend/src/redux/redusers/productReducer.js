import { PRODUCT, PRODUCTADD, PRODUCTADD_ERROR, PRODUCT_ERROR, PRODUCT_GET_BY_ID, PRODUCT_GET_BY_ID_ERROR, PRODUCT_LOADING, PRODUCT_UPDATE, PRODUCT_UPDATE_ERROR } from "../types";

const initialState = {
    productLoading: false,
    product: [],
    productError: [],
    productAdd: [],
    productUpdate:[],
    productUpdateError:[],
    productAddError: [],
    productGetId: [],
    productGetIdError: [],
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                productLoading: action.payload,
            };

        case PRODUCT:
            return {
                ...state,
                product: action.payload,
            };

        case PRODUCT_ERROR:
            return {
                ...state,
                productError: action.payload,
            };

        case PRODUCTADD:
            return {
                ...state,
                productAdd: action.payload,
            };

        case PRODUCTADD_ERROR:
            return {
                ...state,
                productAddError: action.payload,
            };
        case PRODUCT_GET_BY_ID:
            return {
                ...state,
                productGetId: action.payload,
            };

        case PRODUCT_GET_BY_ID_ERROR:
            return {
                ...state,
                productGetIdError: action.payload,
            };
        case PRODUCT_UPDATE:
            return {
                ...state,
                productUpdate: action.payload,
            };

        case PRODUCT_UPDATE_ERROR:
            return {
                ...state,
                productUpdateError: action.payload,
            };

        default:
            return state;
    }
};
