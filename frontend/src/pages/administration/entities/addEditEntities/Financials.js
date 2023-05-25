import { InputAdornment, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { companydataAction } from '../../../../redux/actions/companydataAction';

const Financials = ({ hendelNext, hendelCancel }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)

    const [financials, setFinancials] = useState({
        _id: '',
        netProfitMargin: '',
        ROE: '',
        ROA: '',
        operatingCashFlow: '',
        debtServiceCoverageRatio: '',
        interestCoverageRatio: '',
        netGearingRatio: '',
        totalDebtToTotalCapital: '',
        currentRatio: '',
        quickRatio: '',
        cashFlowBeforeFinancingSales: ''
    })
    const [formErrors, setFormErrors] = useState()

    useEffect(() => {
        if (companyData && companyData.financial) {
            setFinancials({
                _id: companyData.financial?._id,
                netProfitMargin: companyData.financial?.netProfitMargin,
                ROE: companyData.financial?.ROE,
                ROA: companyData.financial?.ROA,
                operatingCashFlow: companyData.financial?.operatingCashFlow,
                debtServiceCoverageRatio: companyData.financial?.debtServiceCoverageRatio,
                interestCoverageRatio: companyData.financial?.interestCoverageRatio,
                netGearingRatio: companyData.financial?.netGearingRatio,
                totalDebtToTotalCapital: companyData.financial?.totalDebtToTotalCapital,
                currentRatio: companyData.financial?.currentRatio,
                quickRatio: companyData.financial?.quickRatio,
                cashFlowBeforeFinancingSales: companyData.financial?.cashFlowBeforeFinancingSales
            })
        }
    }, [companyData])


    const handleChange = (e, name) => {
        let numberReg = /\b((100)|[1-9]\d?)\b/
        if (name === "netProfitMargin" || name === "ROE" || name === "ROA" || name === "operatingCashFlow" || name === "debtServiceCoverageRatio" || name === "interestCoverageRatio" || name === "netGearingRatio" || name === "totalDebtToTotalCapital" || name === "currentRatio" || name === "quickRatio" || name === "cashFlowBeforeFinancingSales") {
            if (e.target.value === '' || numberReg.test(e.target.value)) {
                if (e.target.value) {
                    var t = e.target.value;
                    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) < 100 ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3) : t.substr(0, t.indexOf("."))) : t
                }
                setFinancials({ ...financials, [name]: e.target.value })
            }
        }
    }

    const validation = () => {
        let flag = false
        const error = {
            Biling: {},
            Shipping: {},
        };
        if (!financials.netProfitMargin) {
            error.netProfitMargin = "Please enter net profit margin!"
            flag = true
        }
        if (!financials.ROE) {
            error.ROE = "Please enter roe!"
            flag = true
        }
        if (!financials.ROA) {
            error.ROA = "Please enter roa!"
            flag = true
        }
        if (!financials.operatingCashFlow) {
            error.operatingCashFlow = "Please enter operating cash flow!"
            flag = true
        }
        if (!financials.debtServiceCoverageRatio) {
            error.debtServiceCoverageRatio = "Please enter debt service coverage ratio!"
            flag = true
        }
        if (!financials.interestCoverageRatio) {
            error.interestCoverageRatio = "Please enter interest coverage ratio!"
            flag = true
        }
        if (!financials.netGearingRatio) {
            error.netGearingRatio = "Please enter net gearing ratio!"
            flag = true
        }
        if (!financials.totalDebtToTotalCapital) {
            error.totalDebtToTotalCapital = "Please enter total debt to total capital!"
            flag = true
        }
        if (!financials.currentRatio) {
            error.currentRatio = "Please enter current ratio!"
            flag = true
        }
        if (!financials.quickRatio) {
            error.quickRatio = "Please enter quick ratio!"
            flag = true
        }
        if (!financials.cashFlowBeforeFinancingSales) {
            error.cashFlowBeforeFinancingSales = "Please enter cash flow before financing sales!"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    const next = () => {
        if (validation()) {
            return;
        }
        const body = {
            ...companyData,
            financial: financials
        }
        dispatch(companydataAction(body))
        hendelNext()
    }

    return (
        <>
            <div className='add-edit-product'>
                <h1 className=''>Financials</h1>
                <div className='form'>
                    <h2 className='mb-3'>Financials</h2>
                    <div>
                        <Row>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Net profit margin"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.netProfitMargin}
                                    onChange={(e) => handleChange(e, "netProfitMargin")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.netProfitMargin && <span style={{ color: 'red' }}>{formErrors.netProfitMargin}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="ROE"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.ROE}
                                    onChange={(e) => handleChange(e, "ROE")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.ROE && <span style={{ color: 'red' }}>{formErrors.ROE}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="ROA"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.ROA}
                                    onChange={(e) => handleChange(e, "ROA")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.ROA && <span style={{ color: 'red' }}>{formErrors.ROA}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Operating cash flow"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.operatingCashFlow}
                                    onChange={(e) => handleChange(e, "operatingCashFlow")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.operatingCashFlow && <span style={{ color: 'red' }}>{formErrors.operatingCashFlow}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Debt service coverage ratio"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.debtServiceCoverageRatio}
                                    onChange={(e) => handleChange(e, "debtServiceCoverageRatio")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.debtServiceCoverageRatio && <span style={{ color: 'red' }}>{formErrors.debtServiceCoverageRatio}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Interest coverage ratio"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.interestCoverageRatio}
                                    onChange={(e) => handleChange(e, "interestCoverageRatio")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.interestCoverageRatio && <span style={{ color: 'red' }}>{formErrors.interestCoverageRatio}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Net gearing ratio"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.netGearingRatio}
                                    onChange={(e) => handleChange(e, "netGearingRatio")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.netGearingRatio && <span style={{ color: 'red' }}>{formErrors.netGearingRatio}</span>}
                            </Col>
                            <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Total debt to total capital"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.totalDebtToTotalCapital}
                                    onChange={(e) => handleChange(e, "totalDebtToTotalCapital")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.totalDebtToTotalCapital && <span style={{ color: 'red' }}>{formErrors.totalDebtToTotalCapital}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Current ratio"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.currentRatio}
                                    onChange={(e) => handleChange(e, "currentRatio")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.currentRatio && <span style={{ color: 'red' }}>{formErrors.currentRatio}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Quick ratio"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.quickRatio}
                                    onChange={(e) => handleChange(e, "quickRatio")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.quickRatio && <span style={{ color: 'red' }}>{formErrors.quickRatio}</span>}
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                                <TextField
                                    label="Cash flow before financing sales"
                                    variant="standard"
                                    color="warning"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    value={financials.cashFlowBeforeFinancingSales}
                                    onChange={(e) => handleChange(e, "cashFlowBeforeFinancingSales")}
                                    disabled={isView}
                                />
                                {formErrors && formErrors?.cashFlowBeforeFinancingSales && <span style={{ color: 'red' }}>{formErrors.cashFlowBeforeFinancingSales}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
        </>
    )
}

export default Financials