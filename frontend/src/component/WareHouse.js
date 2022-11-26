import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const WareHouse = () => {

    const [moreDeteil, setMoreDeteil] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    {/* {!product?.isApproved ? */}
                        {/* <button className='status-button'>New</button>
                        : */}
                        <button className='status-button private-btn'>PRIVATE</button>
                    {/* } */}
                </div>
                <div className='entities-card-body'>
                    <Row>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <h1>Warehouse 1</h1>
                                </div>
                                <div className='text-type'>
                                    <p>City: <span>Surat</span></p>
                                </div>
                                <div className='text-type'>
                                    {/* <p> </p> */}
                                    <p>Country: <span>India</span> </p>
                                </div>
                                <div className='text-type'>
                                    {/* <p> </p> */}
                                    <p>Type: <span>FIELD</span> </p>
                                    {/* <p>Type: <span>Terminal</span> </p> */}
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto">
                            <img src="./assets/img/my-img/WarehouseCard.png" className="" alt="" />
                        </Col>
                    </Row>
                </div>
               
            </div>
        </>
    )
}

export default WareHouse