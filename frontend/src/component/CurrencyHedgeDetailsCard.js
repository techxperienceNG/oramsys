import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CurrencyHedgeDetailsModal from './Modal/CurrencyHedgeDetailsModal'
import LCPartiesModal from './Modal/LCPartiesModal'

const CurrencyHedgeDetailsCard = ({ title, country }) => {

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
            <div className='entities-card'>
                <div className='entities-card-header'>

                    {/* <button className='status-button'>New</button> */}

                    <button className='status-button' style={{ backgroundColor: "#E69596" }}>FUTURES</button>

                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{ zIndex: '1' }}>
                                <p className='mb-2' onClick={() => navigate()}>Delete</p>
                                <p className='mb-2' onClick={() => setShowEditModal(!showEditModal)}>Edit</p>
                                <p className='mb-0' onClick={() => navigate()}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{ width: "100%" }}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    {/* <h1>{name}</h1> */}
                                </div>
                                <div className='text-type'>
                                    <p>PURPOSE: <span> CURRENCY</span></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            {showEditModal && <CurrencyHedgeDetailsModal show={showEditModal} onHide={() => setShowEditModal(false)} />}
        </>
    )
}

export default CurrencyHedgeDetailsCard