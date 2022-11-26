import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PartiesCard = ({ name, title, country, bgColor }) => {
    const navigate = useNavigate()
    const [moreDeteil, setMoreDeteil] = useState(false)
    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>

                    {/* <button className='status-button'>New</button> */}

                    <button className='status-button' style={{ backgroundColor: bgColor  }}>{title}</button>

                    {/* <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{ zIndex: '1' }}>
                                <p className='mb-2' onClick={() => navigate({ pathname: '/edit-product', search: `?id=${product?._id}` })}>Edit</p>
                                <p className='mb-0' onClick={() => navigate(`/edit-product?id=${product?._id}`, { state: { isView: true } })}>View</p>
                            </div>
                        }
                    </button> */}
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{ width: "100%" }}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <h1>{name}</h1>
                                </div>
                                <div className='text-type'>
                                    <p>COUNTRY: <span> {country}</span></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default PartiesCard