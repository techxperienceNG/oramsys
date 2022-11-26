import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CurrencyHedgeModal from '../../../component/Modal/CurrencyHedgeModal'
import FinancingSufficientlyModal from '../../../component/Modal/FinancingSufficientlyModal'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { getRiskAssessment, riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'

const ExchangeRateRisk = ({ hendelNext, hendelCancel }) => {

    const navigate = useNavigate()

    // const [showModal, setshowModal] = useState(false)
    const [currencyHedgeModal, setcurrencyHedgeModal] = useState(false)
    const [financingSufficientlyModal, setfinancingSufficientlyModal] = useState(false)
    const [selected, setSelected] = useState('')
    const [data, setData] = useState({
        currencyHedge: "",
        marginFinancing: ""
    })

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const dispatch = useDispatch()
    const modalGetData = (e) => {
        if (e.name === 'currencyHedge') {
            setData({
                ...data,
                currencyHedge: e.value
            })
        }
    }


    useEffect(() => {
        if (riskAssessment) {
            setData(riskAssessment)
        }
    }, [riskAssessment])

    const nextStep = () => {
        if (data.currencyHedge && data.marginFinancing) {

            let body = {
                ...riskAssessment,
                currencyHedge: data.currencyHedge,
                marginFinancing: data.marginFinancing
                // exchangeRateRisk: {
                //     currencyHedge: data.currencyHedge,
                //     financingSufficiently: data.financingSufficiently
                // }
            }
            dispatch(riskAssessmentAction(body))
            hendelNext()
        }
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    <img src={`../../../assets/img/about/${data.currencyHedge && data.marginFinancing ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                    {data.currencyHedge && data.marginFinancing ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <h2 className='mb-3'>Exchange rate risk</h2>
                    {data.currencyHedge && data.marginFinancing ? <p>No risk</p> :
                        <div>
                            <div className='risk-tab' onClick={() => { setcurrencyHedgeModal(true); setSelected("currencyHedge") }}>
                                <h3>Enter a currency hedge</h3>
                                <img src={`../../../assets/img/about/${data.currencyHedge ? "correct-success.png" : "correct (1).png"}`} />
                            </div>
                            <div className='risk-tab' onClick={() => { setfinancingSufficientlyModal(true); setSelected("marginFinancing")}}>
                                <h3>Margin the financing sufficiently</h3>
                                <img src={`../../../assets/img/about/${data.marginFinancing ? "correct-success.png" : "correct (1).png"}`} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
            </div>
            {currencyHedgeModal && <CurrencyHedgeModal show={currencyHedgeModal} onHide={() => setcurrencyHedgeModal(false)} getModalData={(e) => modalGetData(e)} type={selected} />}
            {financingSufficientlyModal && <FinancingSufficientlyModal show={financingSufficientlyModal} onHide={() => setfinancingSufficientlyModal(false)} getModalData={(e) => setData({ ...data, marginFinancing: e })} />}
        </>
    )
}

export default ExchangeRateRisk