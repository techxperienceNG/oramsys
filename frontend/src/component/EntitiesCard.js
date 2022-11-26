import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EntitiesCard = () => {

    const [moreDeteil, setMoreDeteil] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    <button className='status-button'>New</button>
                    {/* <button className='status-button approved-btn'>APPROVED</button> */}
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{zIndex:'1'}}>
                                <p className='mb-2' style={{ cursor: "pointer" }} onClick={() => navigate("/add-edit-entities")}>Edit</p>
                                <p className='mb-0' style={{ cursor: "pointer" }} onClick={() => navigate("/add-edit-entities")}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{width:"100%"}}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <p>type: <span>company</span> </p>
                                </div>
                                <div className='text-type'>
                                    <p>role:<span></span> </p>
                                </div>
                                <div className='text-type'>
                                    <p>WAREHOUSE_COMPANY,SHIPPER,BUYER,LAA</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto">
                            <img src="./assets/img/my-img/building.png" className="" alt="" />
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default EntitiesCard