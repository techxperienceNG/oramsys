import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LCPartiesModal from './Modal/LCPartiesModal'

const LCPartiesCard = () => {

    const navigate = useNavigate()
    const [showEditModal, setShowEditModal] = useState(false)
    const [viewInsuranceModal, setViewInsuranceModal] = useState(false)
    const [moreDeteil, setMoreDeteil] = useState(false)

    const cardData = [
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
        {
            title: "APPLICANT",
            name: "Centaur Bank",
            country: "NIGERIA",
            type: "COMPANY"
        },
    ]
    return (
        <>
            <div className='insurances_available position-relative'>
                <div className='d-flex justify-content-between mb-3 mt-2'>
                    <div>
                        <h4>LC Parties</h4>
                        {/* <p>Value: $234,234.00</p> */}
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
                    {
                        cardData.map((item) => (
                            <Col lg={3}>
                                <div className='entities-card '>
                                    <div className='entities-card-header'>
                                        <button className='status-button approved-btn' style={{ whiteSpace: "nowrap" }}>{item.title}</button>

                                    </div>
                                    <div className='entities-card-body d-flex'>
                                        <div className='entities-card-body-text'>
                                            <div className='text-type'>
                                                <h5>{item.name}</h5>
                                                <h6>COUNTRY: <span>{item.country}</span></h6>
                                                <h6>Type: <span> {item.type}</span></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
            {showEditModal && <LCPartiesModal show={showEditModal} onHide={() => setShowEditModal(false)}/>}
        </>
    )
}

export default LCPartiesCard