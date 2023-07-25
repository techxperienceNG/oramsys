import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CountriesCard from '../../../../component/CountriesCard';
import ProductCard from '../../../../component/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productGetAction } from '../../../../redux/actions/productAction';
import MaterialTable from 'material-table';
import { Tooltip } from 'react-tooltip';
import { MdEdit, MdPreview } from 'react-icons/md';
import Paginate from './productPagination';

const Products = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [productGetData, setProductGetData] = useState()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const productGetDatas = useSelector(state => state.product.product)



  useEffect(() => {
    setProductGetData(productGetDatas)
  }, [productGetDatas])
  console.log("get products", productGetData)

  useEffect(() => {
    dispatch(productGetAction(search ? search : "all"))
  }, [search])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllProduct = productGetData?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

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
        {/* <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'> Products</h2>
          <button className='add_btn me-3' onClick={() => navigate('/add-product')}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
        </div> */}

        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary border-bottom pt-6'>
              <div class='row align-items-center mb-3'>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Product</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    <Link to='/add-product' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                      <span class=' pe-2'>
                        <i class="bi bi-plus"></i>
                      </span>
                      <span className='fw-bold'>Add Product</span>
                    </Link>

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>

        {/* TABLE */}
        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white border-light border-5">
              <thead class="bg-light">
                <tr className='text-center'>
                  <th className='fw-bold'>Name</th>
                  <th className='fw-bold'>Nature</th>
                  <th className='fw-bold'>Category</th>
                  <th className='fw-bold'>Expiry Date</th>
                  <th className='fw-bold'>Family</th>
                  <th className='fw-bold'>Type</th>
                  <th className='fw-bold'>Status</th>
                  <th className='fw-bold text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>

                {!getAllProduct ? <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div> : getAllProduct.length > 0 && getAllProduct?.map((data, index) => (
                  <tr key={index} className='text-center'>
                    <td>
                      <div class="">

                        <div class="">
                          <p class="fw-normal m-2">{data.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{data.nature}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{data.category}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{new Date(data.expiryDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                          {/* {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)} */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{data.family}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{data.type}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="">
                        <div class="">
                          <p class="fw-normal m-2">{data.status}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex justify-content-end m-2">

                        <div class="align-items-center">
                          <MdEdit onClick={() => {
                            navigate({ pathname: '/edit-product', search: `?id=${data?._id}` })
                          }}
                            data-tooltip-id='edit-id'
                            data-tooltip-content='Edit Product'
                            className='cursor-pointer'
                            size={18} />
                          <Tooltip id='edit-id' place='top' effect='solid' />
                        </div>
                        <div class="align-items-center ms-3">
                          <MdPreview data-tooltip-id='preview-id' data-tooltip-content='Preview Information'
                            onClick={() => navigate(`/edit-product?id=${data?._id}`, { state: { isView: true } })}
                            className='cursor-pointer'
                            size={18}
                          />
                          <Tooltip id='preview-id' place='top' effect='solid' />
                        </div>
                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
            {productGetData?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
            <div class="card-footer border-0 py-2 mb-5">

              <span class="text-muted text-sm">
                <Paginate postsPerPage={postsPerPage} totalPosts={productGetDatas?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} getAllProduct={getAllProduct} /> </span>
            </div>
          </div>
        </div>

        {/* <MaterialTable
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
        /> */}
      </div>
    </>
  )
}

export default Products