import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserCard = () => {

    const [moreDeteil, setMoreDeteil] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header' style={{ justifyContent: "end" }}>
                    {/* <button className='status-button'>New</button> */}
                    {/* <button className='status-button approved-btn'>APPROVED</button> */}
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{zIndex:'1'}}>
                                <p className='mb-2' style={{ cursor: "pointer" }} onClick={() => navigate("/add-edit-user")}>Edit</p>
                                <p className='mb-0' onClick={() => navigate("/add-edit-user")}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{width:"100%"}}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type countries-name'>
                                    <p>Honduras</p>
                                </div>
                                {/* <div className='text-type'>
                                    <p>abbreviation:<span> HN</span> </p>
                                </div> */}
                            </div>
                        </Col>
                        <Col lg={2} className="mt-auto p-lg-0">
                            {/* <img src="./assets/img/Countries/download.svg" className="" alt="" width="40px" /> */}
                            <div className='user-short-name'>Lk</div>
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default UserCard