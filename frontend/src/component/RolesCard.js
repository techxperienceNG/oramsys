import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import RoleEditModal from './Modal/RoleEditModal'

const RolesCard = () => {

    const [moreDeteil, setMoreDeteil] = useState(false)
    const [editModal, setEditModal] = useState(false)


    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    <button className='status-button' style={{ backgroundColor: "#e69597" }}>REQUESTED</button>
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
                                    <h1>warehouse_company</h1>
                                </div>
                                <div className='text-type'>
                                    <p>RISK SCORE: <span>91</span> </p>
                                </div>
                                {/* <div className='text-type'>
                                    <p>AUTHORITY: <span>TE</span> </p>
                                </div> */}
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto p-lg-0">
                            {/* <img src="./assets/img/my-img/building.png" className="" alt="" /> */}
                            <div className='user-short-name'>91</div>
                        </Col>
                    </Row>
                </div>
            </div>
            {
                editModal && <RoleEditModal show={editModal} onHide={()=> setEditModal(false)}/>
            }
        </>
    )
}

export default RolesCard