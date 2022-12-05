import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CounterpartiesModal from '../../../component/Modal/CounterpartiesModal'
import CreditInsurersModal from '../../../component/Modal/CreditInsurersModal'
import InternationalCreditStandingModal from '../../../component/Modal/InternationalCreditStandingModal'
import LocalCreditStandingModal from '../../../component/Modal/LocalCreditStandingModal'
import { riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'

const PaymentBuyerRisk = ({ hendelNext, hendelCancel }) => {


    const navigate = useNavigate()
    const [internationalCreditStandingModal, setInternationalCreditStandingModal] = useState(false)
    const [counterpartiesModal, setCounterpartiesModal] = useState(false)
    const [acceptablePartyModal, setAcceptablePartyModal] = useState(false)
    const [creditInsurersModal, setCreditInsurersModal] = useState(false)
    const [localCreditStandingModal, setLocalCreditStandingModal] = useState(false)
    const [selected, setSelected] = useState('')
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()
    const [paymentBuyesrRisk, setpaymentBuyesrRisk] = useState({
        internationalCreditStanding: "",
        counterparties: "",
        acceptableParty: "",
        creditInsurers: "",
        localCreditStanding: "",
    })

    const getData = (e) => {
        if (e.name === 'counterparties') {
            setpaymentBuyesrRisk({
                ...paymentBuyesrRisk,
                counterparties: e.value
            })
        }
        else if (e.name === 'acceptableParty') {
            setpaymentBuyesrRisk({
                ...paymentBuyesrRisk,
                acceptableParty: e.value
            })
        }
    }

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)

    useEffect(() => {
        if (riskAssessment) {
            setpaymentBuyesrRisk(riskAssessment)
        }
    }, [riskAssessment])

    const modalData = (e) => {
        if (e.name === 'internationalCreditStanding') {
            setpaymentBuyesrRisk({ ...paymentBuyesrRisk, internationalCreditStanding: e.value })
        }
    }

    const counterpartiesOptions = [
        'Guarantees'
    ]

    const acceptablePartyOptions = [
        'Assigned Receivables'
    ]

    useEffect(() => {
        console.log('riskAssessment', riskAssessment)
        console.log('paymentBuyesrRisk', paymentBuyesrRisk)
    }, [riskAssessment, paymentBuyesrRisk])


    const nextStep = () => {
        if (paymentBuyesrRisk.internationalCreditStanding || paymentBuyesrRisk.counterparties || paymentBuyesrRisk.acceptableParty || paymentBuyesrRisk.creditInsurers || paymentBuyesrRisk.localCreditStanding) {
            let body = {
                ...riskAssessment,
                internationalCreditStanding: paymentBuyesrRisk.internationalCreditStanding,
                counterparties: paymentBuyesrRisk.counterparties,
                acceptableParty: paymentBuyesrRisk.acceptableParty,
                creditInsurers: paymentBuyesrRisk.creditInsurers,
                localCreditStanding: paymentBuyesrRisk.localCreditStanding,
            }
            dispatch(riskAssessmentAction(body))

            hendelNext()
        }
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.internationalCreditStanding || paymentBuyesrRisk.counterparties || paymentBuyesrRisk.acceptableParty || paymentBuyesrRisk.creditInsurers || paymentBuyesrRisk.localCreditStanding ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                    {paymentBuyesrRisk.internationalCreditStanding || paymentBuyesrRisk.counterparties || paymentBuyesrRisk.acceptableParty || paymentBuyesrRisk.creditInsurers || paymentBuyesrRisk.localCreditStanding ?
                        <p className='success'>Risks are acceptable due to mitigants</p> :
                        <p className='error'>The below risks require your attention</p>
                    }
                </div>
                <div className='form'>
                    <div>
                        <h2 className='mb-3'>Payment/Buyer risk</h2>
                        {paymentBuyesrRisk.internationalCreditStanding && paymentBuyesrRisk.counterparties && paymentBuyesrRisk.acceptableParty && paymentBuyesrRisk.creditInsurers && paymentBuyesrRisk.localCreditStanding ? <p>No risk</p> :
                            <div>
                                <div className='risk-tab' onClick={() => { setInternationalCreditStandingModal(true); setSelected('internationalCreditStanding') }}>
                                    <h3>If international bank, use an on-lending model with a local bank with acceptable credit standing</h3>
                                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.internationalCreditStanding ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => { setCounterpartiesModal(true); setSelected('counterparties'); setOptions(counterpartiesOptions) }}>
                                    <h3>Take acceptable guarantees (from Central Banks, Corporates, other reliable counterparties</h3>
                                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.counterparties ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => { setCounterpartiesModal(true); setSelected('acceptableParty'); setOptions(acceptablePartyOptions) }}>
                                    <h3>Transfer payment risk to another acceptable party (make loan self-liquidating)</h3>
                                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.acceptableParty ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => setCreditInsurersModal(true)}>
                                    <h3>Use credit insurance issued by acceptable credit insurers</h3>
                                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.creditInsurers ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                                <div className='risk-tab' onClick={() => setLocalCreditStandingModal(true)}>
                                    <h3>Use L/Cs issued by Banks with acceptable credit standing (e.g investment grade rated)</h3>
                                    <img src={`../../../assets/img/about/${paymentBuyesrRisk.localCreditStanding ? "correct-success.png" : "correct (1).png"}`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
            </div>
            {internationalCreditStandingModal && <InternationalCreditStandingModal show={internationalCreditStandingModal} onHide={() => setInternationalCreditStandingModal(false)} getModalData={(e) => modalData(e)} type={selected} />}
            {counterpartiesModal && <CounterpartiesModal show={counterpartiesModal} onHide={() => setCounterpartiesModal(false)} getModalData={(e) => { console.log('e', e); getData(e) }} type={selected} modalOption={options} />}
            {creditInsurersModal && <CreditInsurersModal show={creditInsurersModal} onHide={() => setCreditInsurersModal(false)} getModalData={(e) => setpaymentBuyesrRisk({ ...paymentBuyesrRisk, creditInsurers: e })} />}
            {localCreditStandingModal && <LocalCreditStandingModal show={localCreditStandingModal} onHide={() => setLocalCreditStandingModal(false)} getModalData={(e) => setpaymentBuyesrRisk({ ...paymentBuyesrRisk, localCreditStanding: e })} />}
        </>
    )
}

export default PaymentBuyerRisk