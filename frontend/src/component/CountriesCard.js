import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const CountriesCard = ({countricode , contriesData}) => {

    const [moreDeteil, setMoreDeteil] = useState(false)

    return (
        <>
            <div className='entities-card'>
                {/* <div className='entities-card-header'>
                    <button className='status-button'>New</button>
                    <button className='status-button approved-btn'>APPROVED</button>
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                    </button>
                </div> */}
                <div className='entities-card-body'>
                    <Row>
                        <Col xs={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type countries-name'>
                                    <p>{contriesData.name}</p>
                                </div>
                                <div className='text-type'>
                                    <p>abbreviation:<span>{contriesData.code}</span> </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={2} className="mt-auto p-0">
                            <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${contriesData.code}.svg`} className="" alt=""/>
                        </Col>
                    </Row>
                </div>
                {/* {
                    moreDeteil &&
                    <div className='more-popup'>
                        <p className='mb-2'>Edit</p>
                        <p className='mb-0'>View</p>
                    </div>
                } */}
            </div>
        </>
    )
}

export default CountriesCard