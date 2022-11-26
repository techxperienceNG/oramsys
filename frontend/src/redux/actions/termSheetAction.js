import { ApiPost } from "../../helper/API/ApiData"
import { IS_LOADING, TERM_SHEET, TERM_SHEET_ERROR, TERM_SHEET_LOADING } from "../types"


export const termSheetAction = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: TERM_SHEET_LOADING,
            payload: true
        })
        await ApiPost(`transaction/uploadTermSheet`, body)
            .then((res) => {
                dispatch({
                    type: TERM_SHEET,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: TERM_SHEET_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: TERM_SHEET_ERROR,
            payload: err
        })

        dispatch({
            type: TERM_SHEET_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}