import React from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import { ENTITYROLE, ENTITYROLE_ADD, ENTITYROLE_ADD_ERROR, ENTITYROLE_ADD_LOADING, ENTITYROLE_ERROR, ENTITYROLE_LOADING, IS_LOADING } from '../types'

export const entitiesRoleAction = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_LOADING,
            payload: true
        })
        await ApiGet('entities/get-roles')
            .then((res) => {
                dispatch({
                    type: ENTITYROLE,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const entityRoleAddAction = (entityRoleAdd) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: true
        })
        await ApiPost('entities/add-role', entityRoleAdd)
            .then((res) => {
                dispatch({
                    type: ENTITYROLE_ADD,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ENTITYROLE_ADD_ERROR,
            payload: err
        })

        dispatch({
            type: ENTITYROLE_ADD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
