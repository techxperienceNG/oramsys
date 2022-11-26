import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import RatingModal from './Modal/RatingModal'

const RatingsCard = () => {

    const [moreDeteil, setMoreDeteil] = useState(false)
    const [editModal, setEditModal] = useState(false)


    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    <button className='status-button' style={{ backgroundColor: "#b95f89" }}>IMPORT</button>
                    {/* <button className='status-button approved-btn'>APPROVED</button> */}
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{zIndex:'1'}}>
                                <p className='mb-2' >Delete</p>
                                <p className='mb-2' onClick={()=> setEditModal(true)}>Edit</p>
                                <p className='mb-0'>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body'>
                    <Row style={{width:"100%"}}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <h1>124</h1>
                                </div>
                                <div className='text-type'>
                                    <p>EXPIRES: <span>01/06/2022</span> </p>
                                </div>
                                <div className='text-type'>
                                    {/* <p> </p> */}
                                    <p>AUTHORITY: <span>TE</span> </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto p-lg-0">
                            {/* <img src="./assets/img/my-img/building.png" className="" alt="" /> */}
                            <div className='user-short-name'>AAA</div>
                        </Col>
                    </Row>
                </div>
            </div>
            {
                editModal && <RatingModal show={editModal} onHide={()=> setEditModal(false)}/>
            }
        </>
    )
}

export default RatingsCard