import { AIR_PORT, AIR_PORT_ERROR, AIR_PORT_LOADING, PORT, PORT_ERROR, PORT_LOADING } from "../types";

const initialState = {
    portLoading: false,
    port: [],
    portError: []
};

const initialAirPortState = {
    airPortLoading: false,
    airPort: [],
    airPortError: []
};

export const portsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PORT_LOADING:
            return {
                ...state,
                portLoading: action.payload,
            };

        case PORT:
            return {
                ...state,
                port: action.payload,
            };

        case PORT_ERROR:
            return {
                ...state,
                portError: action.payload,
            };

        default:
            return state;
    }
}

export const airPortsReducer = (state = initialAirPortState, action) => {
    switch (action.type) {
        case AIR_PORT_LOADING:
            return {
                ...state,
                airPortLoading: action.payload,
            };

        case AIR_PORT:
            return {
                ...state,
                airPort: action.payload,
            };

        case AIR_PORT_ERROR:
            return {
                ...state,
                airPortError: action.payload,
            };

        default:
            return state;
    }
}