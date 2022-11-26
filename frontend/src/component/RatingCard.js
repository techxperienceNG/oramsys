import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RatingCard = () => {

    const navigate = useNavigate()
    const [moreDeteil, setMoreDeteil] = useState(false)

    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    {/* <button className='status-button'>New</button> */}
                    <button style={{ border: "none", background: 'none', marginLeft: "auto" }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{zIndex:'1'}}>
                                <p className='mb-2' onClick={() => navigate("/rating-agencies-edit")}>Edit</p>
                                <p className='mb-0' onClick={() => navigate("/rating-agencies-edit")}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{width:"100%"}}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <h1>S&P</h1>
                                </div>
                                <div className='text-type'>
                                    <p>city:  <span>TImbuktu</span> </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto">
                            {/* <img src="./assets/img/my-img/building.png" className="" alt="" /> */}
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default RatingCard