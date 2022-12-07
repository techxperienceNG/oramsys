import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CounterpartiesModal from '../../../component/Modal/CounterpartiesModal'
import InternationalCreditStandingModal from '../../../component/Modal/InternationalCreditStandingModal'
import LoanPurposeRiskModal from '../../../component/Modal/LoanPurposeRiskModal'
import { riskAssessmentAction } from '../../../redux/actions/riskAssessmentAction'

const PerformanceRisk = ({ hendelNext, hendelCancel }) => {

    const navigate = useNavigate()
    const [internationalCreditStandingModal, setInternationalCreditStandingModal] = useState(false)
    const [sameModal, setSameModal] = useState(false)
    const [showSameModal, setShowSameModal] = useState(false)
    const [acceptableJurisdictionModal, setAcceptableJurisdictionModal] = useState(false)
    const [showTextEditer, setShowTextEditer] = useState(false)
    const [selected, setSelected] = useState('')
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()
    const [performanceRisk, setPerformanceRisk] = useState({
        goodCreditStanding: "",
        acceptableJurisdiction: "",
        cashCollateral: "",
        coverageOnStock: "",
        acceptableCMA: "",
    })

    const riskAssessment = useSelector(state => state.riskAssessmentData.riskAssessment)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)
    console.log('getTransactionByIdData.data', getTransactionByIdData.data.keyParties[0].parties[0].type.roleName)

    
    useEffect(() => {
        if (riskAssessment) {
            setPerformanceRisk(riskAssessment)
        }
    }, [riskAssessment])

    const getData = (e) => {
        if (e.name === 'cashCollateral') {
            setPerformanceRisk({
                ...performanceRisk,
                cashCollateral: e.value
            })
        }
        else if (e.name === 'coverageOnStock') {
            setPerformanceRisk({
                ...performanceRisk,
                coverageOnStock: e.value
            })
        }
    }

    const modalData = (e) => {
        if (e.name === 'goodCreditStanding') {
            setPerformanceRisk({
                ...performanceRisk,
                goodCreditStanding: e.value
            })
        } else if (e.name === 'acceptableCMA') {
            setPerformanceRisk({
                ...performanceRisk,
                acceptableCMA: e.value
            })
        }
    }

    const modalGetData = (e) => {
        if (e.name === 'acceptableJurisdiction') {
            setPerformanceRisk({
                ...performanceRisk,
                acceptableJurisdiction: e.value
            })
        }
    }

    const nextStep = () => {
        // if (performanceRisk.goodCreditStanding || performanceRisk.acceptableJurisdiction || performanceRisk.cashCollateral || performanceRisk.coverageOnStock || performanceRisk.acceptableCMA) {
            let body = {
                ...riskAssessment,
                goodCreditStanding: {type:performanceRisk.goodCreditStanding?.type ?? '',party:performanceRisk.goodCreditStanding?.party ?? ''},
                acceptableJurisdiction:performanceRisk.acceptableJurisdiction?.justification,
                cashCollateral: {type:performanceRisk.cashCollateral?.type ?? '',instrument:performanceRisk.cashCollateral?.instrument ?? '',evidence:performanceRisk.cashCollateral?.evidence ?? '',},
                coverageOnStock:{ type:performanceRisk.coverageOnStock?.type ?? '',instrument:performanceRisk.coverageOnStock?.instrument ?? '',evidence:performanceRisk.coverageOnStock?.evidence ?? ''},
                acceptableCMA: {type:performanceRisk.acceptableCMA?.type ?? '',party:performanceRisk.acceptableCMA?.party ?? '',}
            }

            dispatch(riskAssessmentAction(body))
            hendelNext()
        // }
    }

    const cashCollateralOption = [
        'cashCollateral'
    ]

    const coverageOnStock = [
        'Proceeds from Insurance over Stock'
    ]


    return (
        <>
            <>
                <div className='add-edit-product'>
                    <div className='d-flex align-items-center justify-content-center error-info mb-3'>
                        <img src={`../../../assets/img/about/${performanceRisk.goodCreditStanding || performanceRisk.acceptableJurisdiction || performanceRisk.cashCollateral || performanceRisk.coverageOnStock || performanceRisk.acceptableCMA ? "error-info-success.png" : "error-info.png"}`} className='me-3' />
                        {performanceRisk.goodCreditStanding || performanceRisk.acceptableJurisdiction || performanceRisk.cashCollateral || performanceRisk.coverageOnStock || performanceRisk.acceptableCMA ?
                            <p className='success'>Risks are acceptable due to mitigants</p> :
                            <p className='error'>The below risks require your attention</p>
                        }
                    </div>
                    <div className='form'>
                        <h2 className='mb-3'>Performance Risk</h2>
                        <div>
                            {performanceRisk.goodCreditStanding && performanceRisk.acceptableJurisdiction && performanceRisk.cashCollateral && performanceRisk.coverageOnStock && performanceRisk.acceptableCMA ? <p>No risk</p> :
                                <div>
                                    <div className='risk-tab' onClick={() => { setShowSameModal(true); setSelected('goodCreditStanding') }}>
                                        <h3>Transfer risk to an entity with good credit standing (e.g the government, a Bank etc)</h3>
                                        <img src={`../../../assets/img/about/${performanceRisk.goodCreditStanding ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setShowTextEditer(true); setSelected('acceptableJurisdiction') }}>
                                        <h3>Charge over marketable assets of the company, located in an acceptable jurisdiction</h3>
                                        <img src={`../../../assets/img/about/${performanceRisk.acceptableJurisdiction ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setSameModal(true); setSelected('cashCollateral'); setOptions(cashCollateralOption) }}>
                                        <h3>Cash Collateral</h3>
                                        <img src={`../../../assets/img/about/${performanceRisk.cashCollateral ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    <div className='risk-tab' onClick={() => { setSameModal(true); setSelected('coverageOnStock'); setOptions(coverageOnStock) }}>
                                        <h3>Take Insurance coverage on stock (in the case of theft and other related issues)</h3>
                                        <img src={`../../../assets/img/about/${performanceRisk.coverageOnStock ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>
                                    { getTransactionByIdData.data.keyParties[0].parties[0].type.roleName !=="CMA" && <div className='risk-tab' onClick={() => { setShowSameModal(true); setSelected('acceptableCMA') }}>
                                        <h3>Appoint an acceptable CMA</h3>
                                        <img src={`../../../assets/img/about/${performanceRisk.acceptableCMA ? "correct-success.png" : "correct (1).png"}`} />
                                    </div>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => hendelCancel()} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { nextStep() }} className='footer_next_btn'> Next</button>
                </div>
                {showSameModal && <InternationalCreditStandingModal show={showSameModal} onHide={() => setShowSameModal(false)} getModalData={(e) => modalData(e)} type={selected} />}
                {sameModal && <CounterpartiesModal show={sameModal} onHide={() => setSameModal(false)} getModalData={(e) => { console.log('e', e); getData(e) }} type={selected} modalOption={options} />}
                {showTextEditer && <LoanPurposeRiskModal show={showTextEditer} onHide={() => setShowTextEditer(false)} getModalData={(e) => { console.log('e', e); modalGetData(e) }} types={selected} />}
            </>
        </>
    )
}

export default PerformanceRisk