import React from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { ADD_RISK_ASSESSMENT, ADD_RISK_ASSESSMENT_ERROR, ADD_RISK_ASSESSMENT_LOADING, GET_RISK_ASSESSMENT, GET_RISK_ASSESSMENT_ERROR, GET_RISK_ASSESSMENT_LOADING, IS_LOADING, RISK_ASSESSMENT_DATA } from '../types';

export const riskAssessmentAction = (value) => (dispatch) => {
    dispatch({
        type: RISK_ASSESSMENT_DATA,
        payload: value,
    });
}

export const addRiskAssessment = (body) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: true
        })
        await ApiPost(`riskAssessment/add`, body)
            .then((res) => {
                dispatch({
                    type: ADD_RISK_ASSESSMENT,
                    payload: res
                })
                dispatch({
                    type: RISK_ASSESSMENT_DATA,
                    payload: null,
                });
            })
            .catch((error) => {
                console.log(error.response.data);
            })
        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_RISK_ASSESSMENT_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}


export const getRiskAssessment = (id) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: true
        })
        await ApiGet(`riskAssessment/getByTransactionId/${id}`)
            .then((res) => {
                dispatch({
                    type: GET_RISK_ASSESSMENT,
                    payload: res
                })
                if (res.data) {
                    // let body = {
                    //     ...res.data,
                    //     justification: res.data.justification ? res.data.justification.justification : '',
                    //     priceHedge: res.data.priceHedge ? res.data.priceHedge.justification : '',
                    //     acceptableCMA: { ...res.data.acceptableCMA, party: res.data.acceptableCMA.details ? res.data.acceptableCMA.details.name : '' },
                    //     acceptableJurisdiction: res.data.acceptableJurisdiction ? res.data.acceptableJurisdiction.justification : '',
                    //     contractsBasis: res.data.contractsBasis ? res.data.contractsBasis.justification : '',
                    //     financingSufficiently: res.data.financingSufficiently ? res.data.financingSufficiently.justification : '',
                    //     priceHedge: res.data.priceHedge ? res.data.priceHedge.justification : '',
                    //     creditInsurers: {
                    //         ...res.data.creditInsurers,
                    //         broker: res.data.creditInsurers?.broker?.details ? res.data.creditInsurers?.broker.details.name : '',
                    //         insuredParty: res.data.creditInsurers?.insuredParty?.details ? res.data.creditInsurers?.insuredParty?.details.name : '',
                    //         insurer: res.data.creditInsurers?.insurer?.details ? res.data.creditInsurers?.insurer?.details.name : '',
                    //         reInsurer: res.data.creditInsurers?.reInsurer?.details ? res.data.creditInsurers?.reInsurer?.details.name : '',
                    //         underwriter: res.data.creditInsurers?.underwriter?.details ? res.data.creditInsurers?.underwriter?.details.name : '',
                    //     },
                    //     currencyHedge: {
                    //         ...res.data.currencyHedge,
                    //         counterparty: res.data.currencyHedge?.counterparty?.details ? res.data.currencyHedge?.counterparty?.details.name : ''
                    //     },
                    //     goodCreditStanding: {
                    //         ...res.data.goodCreditStanding,
                    //         party: res.data.goodCreditStanding?.party?.details ? res.data.goodCreditStanding?.party?.details.name : ''
                    //     },
                    //     internationalCreditStandin: {
                    //         ...res.data.internationalCreditStandin,
                    //         party: res.data.internationalCreditStandin?.party?.details ? res.data.internationalCreditStandin?.party?.details.name : ''
                    //     },
                    //     localCreditStanding: {
                    //         ...res.data.localCreditStanding,
                    //         advisingBank: res.data.localCreditStanding?.advisingBank?.details ? res.data.localCreditStanding?.advisingBank?.details.name : '',
                    //         applicant: res.data.localCreditStanding?.applicant?.details ? res.data.localCreditStanding?.applicant?.details.name : '',
                    //         beneficiary: res.data.localCreditStanding?.beneficiary?.details ? res.data.localCreditStanding?.beneficiary?.details.name : '',
                    //         conformingBank: res.data.localCreditStanding?.conformingBank?.details ? res.data.localCreditStanding?.conformingBank?.details.name : '',
                    //         issuingBank: res.data.localCreditStanding?.issuingBank?.details ? res.data.localCreditStanding?.issuingBank?.details.name : '',
                    //         negotiatingBank: res.data.localCreditStanding?.negotiatingBank?.details ? res.data.localCreditStanding?.negotiatingBank?.details.name : '',
                    //         reimbursingBank: res.data.localCreditStanding?.reimbursingBank?.details ? res.data.localCreditStanding?.reimbursingBank?.details.name : '',
                    //         secondBeneficiary: res.data.localCreditStanding?.secondBeneficiary?.details ? res.data.localCreditStanding?.secondBeneficiary?.details.name : '',
                    //     },
                    // }
                    dispatch({
                        type: RISK_ASSESSMENT_DATA,
                        payload: res.data,
                    });
                } else {
                    dispatch({
                        type: RISK_ASSESSMENT_DATA,
                        payload: null,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_RISK_ASSESSMENT_ERROR,
            payload: err
        })

        dispatch({
            type: GET_RISK_ASSESSMENT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
