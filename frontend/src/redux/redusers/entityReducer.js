import { EDIT_ENTITY, EDIT_ENTITY_ERROR, ENTITY, ENTITY_ADD, ENTITY_ADD_ERROR, ENTITY_ERROR, ENTITY_GET_BY_ID, ENTITY_GET_BY_ID_ERROR, ENTITY_LOADING, GET_WAREHOUSE, GET_WAREHOUSE_ERROR } from "../types";

const initialState = {
    entityLoading: false,
    entity: [],
    entityError: [],
    entityAdd: [],
    entityUpdate: [],
    entityUpdateError: [],
    entityAddError: [],
    entityGetId: [],
    entityGetIdError: [],
    getWarehouse: [],
    getWarehouseError: [],
    getEntityById: [],
    getEntityByIdError: [],
};

export const entityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTITY_LOADING:
            return {
                ...state,
                entityLoading: action.payload,
            };

        case ENTITY:
            return {
                ...state,
                entity: action.payload,
            };

        case ENTITY_ERROR:
            return {
                ...state,
                entityError: action.payload,
            };

        case ENTITY_ADD:
            return {
                ...state,
                entityAdd: action.payload,
            };

        case ENTITY_ADD_ERROR:
            return {
                ...state,
                entityAddError: action.payload,
            };

        case GET_WAREHOUSE:
            return {
                ...state,
                getWarehouse: action.payload,
            };

        case GET_WAREHOUSE_ERROR:
            return {
                ...state,
                getWarehouseError: action.payload,
            };


        case ENTITY_GET_BY_ID:
            return {
                ...state,
                getEntityById: action.payload,
            };

        case ENTITY_GET_BY_ID_ERROR:
            return {
                ...state,
                getEntityByIdError: action.payload,
            };


        case EDIT_ENTITY:
            return {
                ...state,
                editEntity: action.payload,
            };

        case EDIT_ENTITY_ERROR:
            return {
                ...state,
                getEntityError: action.payload,
            };
        default:
            return state;
    }
};
