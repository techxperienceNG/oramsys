import { ENTITYROLE, ENTITYROLE_ADD, ENTITYROLE_ADD_ERROR, ENTITYROLE_ERROR, ENTITYROLE_LOADING } from "../types";


const initialState = {
    entityRoleLoading: false,
    entityRole:[],
    entityRoleError:[],
    entityRoleAddError:[],
    entityRoleAdd:[],
}

export const entityRoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTITYROLE_LOADING:
            return {
                ...state,
                entityRoleLoading: action.payload,
            };

        case ENTITYROLE:
            return {
                ...state,
                entityRole: action.payload,
            };

        case ENTITYROLE_ERROR:
            return {
                ...state,
                entityRoleError: action.payload,
            };

            case ENTITYROLE_ADD:
            return {
                ...state,
                entityRoleAdd: action.payload,
            };

        case ENTITYROLE_ADD_ERROR:
            return {
                ...state,
                entityRoleAddError: action.payload,
            };

            
        default:
            return state;
    }
};