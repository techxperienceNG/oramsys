import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { addRiskAssessment, riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'
import { ADD_RISK_ASSESSMENT } from '../../../redux/types'


const MarketPriceRisk = ({ hendelNext, hendelCancel }) => {

    const location = useLocation()
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get('id')

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch()
    const [marketPriceRisk, setMarketPriceRisk] = useState({
        contractsBasis: "",
        priceHedge: "",
        financingSufficiently: "",
    })

    const modalData = (e) => {
        if (e.name === 'internationalCreditStanding') {
            setMarketPriceRisk({ ...marketPriceRisk, internationalCreditStanding: e.value })
        }
    }

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const addRiskAssessmentData = useSelector(state => state.riskAssessmentData.addRiskAssessment)

    useEffect(() => {
        if (addRiskAssessmentData && addRiskAssessmentData.status === 200) {
            toast.success(addRiskAssessmentData.message)
            navigate('/transactions')
            dispatch({
                type: ADD_RISK_ASSESSMENT,
                payload: []
            })
        }
    }, [addRiskAssessmentData])

    useEffect(() => {
        if (riskAssessment) {
            setMarketPriceRisk(riskAssessment)
        }
    }, [riskAssessment])

    const getModalData = (e) => {
        if (e.name) {
            setMarketPriceRisk({
                ...marketPriceRisk,
                [e.name]: e.value
            })
            // } else if (e.name === 'priceHedge') {
            //     setMarketPriceRisk({
            //         ...marketPriceRisk,
            //         priceHedge: e.value
            //     })
            // } else if (e.name === 'financingSufficiently') {
            //     setMarketPriceRisk({
            //         ...marketPriceRisk,
            //         financingSufficiently: e.value
            //     })
        }
    }

    const saveData = () => {
        if (marketPriceRisk.contractsBasis && marketPriceRisk.priceHedge && marketPriceRisk.financingSufficiently) {

            let body = {
                ...riskAssessment,
                contractsBasis: marketPriceRisk.contractsBasis,
                priceHedge: marketPriceRisk.priceHedge,
                financingSufficiently: marketPriceRisk.financingSufficiently,
                transactionId: id
            }
            console.log('body', body)
            dispatch(addRiskAssessment(body))
        }
    }


    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    <img src={`../../../assets/img/about/${marketPriceRisk.contractsBasis && marketPriceRisk.priceHedge && marketPriceRisk.financingSufficiently ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                    {marketPriceRisk.contractsBasis && marketPriceRisk.priceHedge && marketPriceRisk.financingSufficiently ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <div>
                        <h2 className='mb-3'>Exchange rate risk</h2>
                        {marketPriceRisk.contractsBasis && marketPriceRisk.priceHedge && marketPriceRisk.financingSufficiently ? <p>No risk</p> :
                            <div>
                                <div className='risk-tab' onClick={() => { setShowModal(true); setSelected('contractsBasis') }}>
                                    <h3>Finance only on Firm Fixed Price contracts basis</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk.contractsBasis ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => { setShowModal(true); setSelected('priceHedge') }}>
                                    <h3>Enter a price hedge</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk.priceHedge ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => { setShowModal(true); setSelected('financingSufficiently') }}>
                                    <h3>Margin the financing sufficiently</h3>
                                    <img src={`../../../assets/img/about/${marketPriceRisk.financingSufficiently ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { saveData() }} className='footer_next_btn'>Save</button>
            </div>

            {showModal && <LoanPurposeRiskModal show={showModal} onHide={() => setShowModal(false)} getModalData={(e) => getModalData(e)} types={selected} />}
            {/* {showModal && <LoanPurposeRiskModal show={showModal} onHide={() => setShowModal(false)} getModalData={(e) => console.log('e', e)} types={selected} />} */}
        </>
    )
}

export default MarketPriceRisk