import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const navigate = useNavigate()
    const [moreDeteil, setMoreDeteil] = useState(false)



    return (
        <>
            <div className='entities-card'>
                <div className='entities-card-header'>
                    {!product?.isApproved ?
                        <button className='status-button'>New</button>
                        :
                        <button className='status-button approved-btn'>APPROVED</button>
                    }
                    <button style={{ border: "none", background: 'none' }} onClick={() => setMoreDeteil(!moreDeteil)} onBlur={() => setMoreDeteil(false)}>
                        <img src='./assets/img/my-img/more.png' alt='more' />
                        {
                            moreDeteil &&
                            <div className='more-popup text-start' style={{zIndex:'1'}}>
                                {/* <p className='mb-2' onClick={() => navigate('/add-edit-product')}>Edit</p> */}
                                {/* <p className='mb-2' onClick={() => productEdit(product.id)}>Edit</p> */}
                                <p className='mb-2' onClick={() => navigate({ pathname: '/edit-product', search: `?id=${product?._id}` })}>Edit</p>
                                <p className='mb-0' onClick={() => navigate(`/edit-product?id=${product?._id}`, { state: { isView: true } })}>View</p>
                            </div>
                        }
                    </button>
                </div>
                <div className='entities-card-body d-flex'>
                    <Row style={{width:"100%"}}>
                        <Col lg={10}>
                            <div className='entities-card-body-text'>
                                <div className='text-type'>
                                    <h1>{product?.name}</h1>
                                </div>
                                <div className='text-type'>
                                    <p>nature: <span>{product?.nature}</span></p>
                                </div>
                                <div className='text-type'>
                                    {/* <p> </p> */}
                                    <p>category: <span>{product?.category}</span> </p>
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

export default ProductCard