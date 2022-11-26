import { ApiGet } from '../../helper/API/ApiData'
import { COUNTRIES, COUNTRIES_ERROR, COUNTRIES_LOADING, IS_LOADING } from '../types'

export const countrieAction = (search) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: COUNTRIES_LOADING,
            payload: true
        })
        await ApiGet(`country/get/${search}`)
            .then((res) => {
                dispatch({
                    type: COUNTRIES,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: COUNTRIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: COUNTRIES_ERROR,
            payload: err
        })

        dispatch({
            type: COUNTRIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}