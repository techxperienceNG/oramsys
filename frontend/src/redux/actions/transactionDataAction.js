import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { ADD_TRANSACTION, ADD_TRANSACTION_ERROR, ADD_TRANSACTION_LOADING, EDIT_TRANSACTION, EDIT_TRANSACTION_ERROR, EDIT_TRANSACTION_LOADING, GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_ERROR, GET_ALL_TRANSACTION_LOADING, GET_TRANSACTION_BY_ID, GET_TRANSACTION_BY_ID_ERROR, GET_TRANSACTION_BY_ID_LOADING, IS_LOADING, TRANSACTION_DATA } from '../types';

export const transactionDataAction = (value) => (dispatch) => {
    dispatch({
        type: TRANSACTION_DATA,
        payload: value,
    });
};

export const addTransaction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_TRANSACTION_LOADING,
            payload: true
        })
        await ApiPost(`transaction/add`, body)
            .then((res) => {
                dispatch({
                    type: ADD_TRANSACTION,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_TRANSACTION_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getAllTransaction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ALL_TRANSACTION_LOADING,
            payload: true
        })
        await ApiGet(`transaction/get/${id}`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_TRANSACTION,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_ALL_TRANSACTION_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ALL_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getTransactionById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_TRANSACTION_BY_ID_LOADING,
            payload: true
        })
        await ApiGet(`transaction/getById/${id}`)
            .then((res) => {
                dispatch({
                    type: GET_TRANSACTION_BY_ID,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_TRANSACTION_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_TRANSACTION_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: GET_TRANSACTION_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const editTransaction = (id, body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: EDIT_TRANSACTION_LOADING,
            payload: true
        })

        await ApiPost(`transaction/edit/${id}`, body)
            .then((res) => {
                dispatch({
                    type: EDIT_TRANSACTION,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: EDIT_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: EDIT_TRANSACTION_ERROR,
            payload: err
        })

        dispatch({
            type: EDIT_TRANSACTION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}