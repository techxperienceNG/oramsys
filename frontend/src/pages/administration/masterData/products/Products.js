import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CountriesCard from '../../../../component/CountriesCard';
import ProductCard from '../../../../component/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productGetAction } from '../../../../redux/actions/productAction';
import MaterialTable from 'material-table';

const Products = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [productGetData, setProductGetData] = useState()
  const [search, setSearch] = useState('')

  const productGetDatas = useSelector(state => state.product.product)



  useEffect(() => {
    setProductGetData(productGetDatas)
  }, [productGetDatas])


  useEffect(() => {
    dispatch(productGetAction(search ? search : "all"))
  }, [search])


  return (
    <>
      {/* <div className='authheader_main'>
        <h1>Products</h1>
        <div className='d-flex'>
        <div className='search_content'>
        <input className='serch_input' id='search' value={search} onChange={(e) => setSearch(e.target.value)} />
        <label htmlFor='search'>
        <img src='../assets/img/about/search.png' />
        </label>
        </div>
        </div>
      </div> */}
      <div className='product'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'> Products</h2>
          <button className='add_btn me-3' onClick={() => navigate('/add-product')}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
        </div>
        {/* <Row>
          {
            productGetData?.data?.map((item) => (
              <Col xxl={3} xl={6} lg={6} md={6}>
                <ProductCard product={item} />
              </Col>
            ))
          }
        </Row> */}
        <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Nature', field: 'nature' },
            { title: 'Category', field: 'category' },
            { title: 'Expiry Date', field: 'expiryDate', type: 'date', },
            { title: 'Family', field: 'family' },
            { title: 'Type', field: 'type' },
            { title: 'Status', field: 'status' },
          ]}
          data={productGetData?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Product',
              onClick: (event, rowData) => navigate({ pathname: '/edit-product', search:`?id=${rowData?._id}` })
            },
            {
              icon: 'preview',
              tooltip: 'View Product',
              onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
            }
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false,
          }}
        />
      </div>
    </>
  )
}

export default Products