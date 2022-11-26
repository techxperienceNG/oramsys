import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entityGetAction } from '../../../redux/actions/entityAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../../helper/AuthStorage';
import STORAGEKEY from '../../../config/APP/app.config';
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_GET_BY_ID } from '../../../redux/types';

const Entities = () => {

  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  const [entityTableData, setEntityTableData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const entityData = useSelector(state => state.entityData.entity)
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
    if (entityData && entityData.data) {
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

  return (
    <>
      <div className='product'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Entities</h2>
          {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" && <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>}
          {
            showspan &&
            <div className='add_content'>
              <p onClick={() => navigate('/add-edit-entities', { state: [{ type: "Individual" }] })}>Individual</p>
              <p onClick={() => setShowSubData(!showSubData)} className='d-flex justify-content-between align-items-center'>Company
                <img src='../assets/img/about/down-filled-triangular-arrow.png' />
              </p>
              {
                showSubData &&
                <>
                  <p className="ps-3" onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Corporation</p>
                  <p className="ps-3" onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Financial institution</p>
                  <p className="ps-3" onClick={() => navigate('/add-edit-entities', { state: [{ type: "Company" }] })}>Sovereign</p>
                </>
              }
            </div>
          }
        </div>
        <MaterialTable
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
        />
      </div>
    </>
  )
}

export default Entities