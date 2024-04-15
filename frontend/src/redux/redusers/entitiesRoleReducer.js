import {
    ENTITYROLE,
    ENTITYROLE_ADD,
    ENTITYROLE_UPDATE,
    ENTITYROLE_ADD_ERROR,
    ENTITYROLE_ERROR,
    ENTITYROLE_LOADING, ENTITYROLE_UPDATE_ERROR, ENTITYROLE_DELETE, ENTITYROLE_DELETE_ERROR
} from "../types";


const initialState = {
    entityRoleLoading: false,
    entityRole: [],
    entityRoleError: [],
    entityRoleAddError: [],
    entityRoleAdd: [],
    entityRoleUpdateError: [],
    entityRoleUpdate: [],
    entityRoleDeleteError: [],
    entityRoleDelete: [],
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

        case ENTITYROLE_UPDATE:
            return {
                ...state,
                entityRoleUpdate: action.payload,
            };

        case ENTITYROLE_UPDATE_ERROR:
            return {
                ...state,
                entityRoleUpdateError: action.payload,
            };
        case ENTITYROLE_DELETE:
            return {
                ...state,
                entityRoleDelete: action.payload,
            }
            ;

        case ENTITYROLE_DELETE_ERROR:
            return {
                ...state,
                entityRoleDeleteError: action.payload,
            };


        default:
            return state;
    }
};