import React from 'react';
import { Row,Col } from 'react-bootstrap';
import ProductCard from '../../../component/ProductCard';
const Products = () => {
  return (
    <>
      <div className='product'>
        <Row>
          <Col lg={3}>
            <ProductCard />
          </Col>
          <Col lg={3}>
            <ProductCard />
          </Col>
          <Col lg={3}>
            <ProductCard />
          </Col>
          <Col lg={3}>
            <ProductCard />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Products