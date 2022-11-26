import { COMPANY_DATA } from '../types';

export const companydataAction = (value) => (dispatch) => {
    dispatch({
        type: COMPANY_DATA,
        payload: value,
    });
};