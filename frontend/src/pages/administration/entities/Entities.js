import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entityGetAction } from '../../../redux/actions/entityAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../../helper/AuthStorage';
import STORAGEKEY from '../../../config/APP/app.config';
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_GET_BY_ID } from '../../../redux/types';
import { Dropdown } from 'react-bootstrap';
import  { Tooltip } from 'react-tooltip'
import { MdEdit, MdOutlineKeyboardArrowDown, MdPreview } from 'react-icons/md';
import Paginate from './entityPag';

const Entities = () => {

  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  const [entityTableData, setEntityTableData] = useState()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const entityData = useSelector(state => state.entityData.entity)
  console.log('entities====', entityData)
  let userId = AuthStorage.getStorageData(STORAGEKEY.roles) === 'admin' ? AuthStorage.getStorageData(STORAGEKEY.userId) : ""

  useEffect(() => {
    if (userId) {
      dispatch(entityGetAction(userId))
    } else {
      dispatch(entityGetAction("all"))
    }
  }, [userId])

  useEffect(() => {
    dispatch({
      type: EDIT_ENTITY,
      payload: []
    })
    dispatch({
      type: ENTITY_GET_BY_ID,
      payload: []
    })
    dispatch({
      type: COMPANY_DATA,
      payload: [],
    });
  }, [])

  useEffect(() => {
    if (entityData.data) {
      setEntityTableData(entityData.data?.map(item => {
        return {
          ...item,
          name: item?.details?.name ?? item?.details?.givenName,
          type: item.type,
          email: item.email,
          country: item?.details?.country?.name,
        }
      }))
    }
  }, [entityData])

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const getAllEntity = entityTableData?.slice(indexOfFirstItem, indexOfLastItem)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log('SHOW DATA', entityTableData)
  return (
    <>
      <div className='product'>
       

        <div class='container-fluid'>
          <div id='dash' class='mb-npx'>
            <header class='bg-surface-primary border-bottom pt-6'>
              <div class='row align-items-center mb-3'>
                <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                  <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Entities</h1>
                </div>

                <div class='col-sm-6 col-12 text-sm-end'>
                  <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>
                    
                  {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" ? (
                        <Dropdown className="me-2" autoClose="outside">
                          <Dropdown.Toggle variant="light" className="btn btn-md items-center" id="dropdown-autoclose-outside" key='start'>
                            <i class="bi bi-plus pe-2 "></i><span className="fs-6 fw-bold">Add</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="mt-3">
                            <Dropdown.Item onClick={() => navigate('/add-edit-entities', { state: [{ type: "Individual" }] })}>Individual</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSubData(!showSubData)}>Company<MdOutlineKeyboardArrowDown size={42} className='ps-3' /></Dropdown.Item>
                            {(showSubData && (
                              <>
                                <Dropdown.Item className='ps-3' onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Corporation</Dropdown.Item>
                                <Dropdown.Item className='ps-3' onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Financial Institution</Dropdown.Item>
                                <Dropdown.Item className='ps-3' onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Sovereign</Dropdown.Item>
                              </>
                            ))}

                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <></>
                      )}

                  </div>
                </div>
              </div>
            </header>

          </div>
        </div>

        <div className='container mx-auto'>
          <div class='row g-6 mb-4'></div>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white border-light border-5">
              <thead class="bg-light">
                <tr>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {!getAllEntity ? <div class="d-flex justify-content-center">
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div> : getAllEntity.length > 0 && getAllEntity?.map((data, index) => (
                  <tr key={index} className='text-center'>
                    <td>
                      <div class="d-flex align-items-center">

                        <div class="">
                          <p class="fw-normal m-2">{data?.type}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="">
                          <p class="fw-normal m-2">{data?.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                        <p class="fw-bold m-2">{data?.details?.name}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">

                        <div class="align-items-center">
                          <p class="fw-bold m-2">{data?.details?.country?.name}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center m-2">

                        <div class="align-items-center">
                          <MdEdit onClick={() => { navigate(`/add-edit-entities?id=${data._id}`, { state: [{ type: `${data.type}` }, { isView: false }] }) }}
                            data-tooltip-id='edit-id'
                            data-tooltip-content='Edit Entity'
                            className='cursor-pointer'
                            size={18} />
                          <Tooltip id='edit-id' place='top' effect='solid' />
                        </div>
                        <div class="align-items-center ms-3">
                          <MdPreview data-tooltip-id='preview-id' data-tooltip-content='Preview Entity'
                            onClick={() => navigate(`/add-edit-entities?id=${data._id}`, { state: [{ type: `${data.type}` }, { isView: true }] })}
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
            {entityTableData?.length < 1 && <div className='text-center mx-auto container py-5 my-5 m-5'> No records were found</div>}
            <div class="card-footer border-0 py-2 mb-5">

              <span class="text-muted text-sm">
                <Paginate postsPerPage={postsPerPage} totalPosts={entityData?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} getAllEntity={getAllEntity} /> </span>
            </div>
          </div>
        </div>

        {/* <MaterialTable
          title=""
          columns={[
            { title: 'Type', field: 'type' },
            { title: 'Email', field: 'email' },
            { title: 'Name', field: 'name' },
            { title: 'Country', field: 'country' },
          ]}
          data={entityTableData}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Entities',
              onClick: (e, rowData) => navigate(`/add-edit-entities?id=${rowData._id}`, { state: [{ type: `${rowData.type}` }, { isView: false }] })
            },
            {
              icon: 'preview',
              tooltip: 'View Entities',
              onClick: (e, rowData) => navigate(`/add-edit-entities?id=${rowData._id}`, { state: [{ type: `${rowData.type}` }, { isView: true }] })
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

export default Entities