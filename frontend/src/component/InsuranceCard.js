import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AddInsuranceModal from './Modal/AddInsuranceModal'

const InsuranceCard = () => {

    const navigate = useNavigate()
    const [showEditModal, setShowEditModal] = useState(false)
    const [viewInsuranceModal, setViewInsuranceModal] = useState(false)
    const [moreDeteil, setMoreDeteil] = useState(false)
    return (
        <>
            <div className='insurances_available position-relative'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4>Insurance Type: PROPERTY</h4>
                        <p>Value: $234,234.00</p>
                    </div>
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{ zIndex: '1' }}>

                                <p className='mb-2' onClick={() => navigate()}>Delete</p>
                                <p className='mb-2' onClick={() => setShowEditModal(!showEditModal)}>Edit</p>
                                <p className='mb-0' onClick={() => setViewInsuranceModal(!viewInsuranceModal)}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <Row>
                    <Col lg={2}>
                        <div className='entities-card  m-0'>
                            <div className='entities-card-header'>
                                <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>BROKER</button>

                            </div>
                            <div className='entities-card-body d-flex'>
                                <div className='entities-card-body-text'>
                                    <div className='text-type'>
                                        <h5>Bank Two</h5>
                                        <h6>Type: <span> COMPANY</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className='entities-card  m-0'>
                            <div className='entities-card-header'>
                                <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>INSURED BODY</button>

                            </div>
                            <div className='entities-card-body d-flex'>
                                <div className='entities-card-body-text'>
                                    <div className='text-type'>
                                        <h5>Centaur Bank</h5>
                                        <h6>Type: <span> COMPANY</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className='entities-card  m-0'>
                            <div className='entities-card-header'>
                                <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>INSURER</button>

                            </div>
                            <div className='entities-card-body d-flex'>
                                <div className='entities-card-body-text'>
                                    <div className='text-type'>
                                        <h5>Bank One</h5>
                                        <h6>Type: <span> COMPANY</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className='entities-card  m-0'>
                            <div className='entities-card-header'>
                                <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>REINSURER</button>

                            </div>
                            <div className='entities-card-body d-flex'>
                                <div className='entities-card-body-text'>
                                    <div className='text-type'>
                                        <h5>Bank Four</h5>
                                        <h6>Type: <span> COMPANY</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className='entities-card  m-0'>
                            <div className='entities-card-header'>
                                <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>UNDERWRITER</button>

                            </div>
                            <div className='entities-card-body d-flex'>
                                <div className='entities-card-body-text'>
                                    <div className='text-type'>
                                        <h5></h5>
                                        <h6>Type: <span> </span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {showEditModal && <AddInsuranceModal show={showEditModal} onHide={() => setShowEditModal(false)} />}
            {viewInsuranceModal && <AddInsuranceModal show={viewInsuranceModal} onHide={() => setViewInsuranceModal(false)} />}
        </>
    )
}

export default InsuranceCard