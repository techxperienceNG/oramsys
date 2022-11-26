import { ApiGet } from '../../helper/API/ApiData'
import { IS_LOADING, SECTOR, SECTOR_ERROR, SECTOR_LOADING } from '../types'

export const sectorAction = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: SECTOR_LOADING,
            payload: true
        })
        await ApiGet(`entities/get-sectors`)
            .then((res) => {
                dispatch({
                    type: SECTOR,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: SECTOR_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: SECTOR_ERROR,
            payload: err
        })

        dispatch({
            type: SECTOR_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}