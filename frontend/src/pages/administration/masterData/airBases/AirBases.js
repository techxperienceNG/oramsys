import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import CountriesCard from '../../../../component/CountriesCard'
import { countrieAction } from '../../../../redux/actions/countrieAction';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Fade, Modal, TextField } from '@material-ui/core';
import axios from 'axios';
import { ApiPost, BaseURL } from '../../../../helper/API/ApiData';
import { airPortsAction } from '../../../../redux/actions/portsAction';
import { toast } from 'react-toastify'


const AirBases = ({ showSidebar, setSidebar }) => {


  const [show, setShow] = useState(false)
  const [airPortData, setAirPortData] = useState()
  const [airPortForEdit, setAirPortForEdit] = useState()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(airPortsAction(search ? search : "all"))
    // console.log('search===============??', search)
  }, [search])

  const airPort = useSelector(state => state.airPorts.airPort)
  useEffect(() => {
    // console.log('countryData.country=================', country);
  }, [airPort])

  useEffect(() => {
    setAirPortData(airPort)
  }, [airPort])

  const editAirBase = () => {
    ApiPost(`airBase/edit`, airPortForEdit).then(res => {
      if (res.status === 200) {
        dispatch(airPortsAction(search ? search : "all"))
        setShow(false)
        airPortForEdit(null)
        toast.success(res.message)
      }
    })
  }

  const navigate = useNavigate()

  return (
    <>
      {/* <div className='authheader_main'>
        <img src='../../assets/img/about/more.png' className='sidebar_img' onClick={() => { }} />
        <h1>Countries</h1>
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
          <h2 className='m-0'> Air ports</h2>
          {/* <button className='add_btn me-3' onClick={() => navigate('/add-product')}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button> */}
        </div>
        <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Country', field: 'country' },
            { title: 'Ref. code', field: 'refcode' },
            // { title: 'Flag', render: rowData => <Col xs={2} className="mt-auto p-0"><img className="img-fluid" src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${rowData.code}.svg`} alt="" /></Col> }
          ]}
          data={airPortData?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit AirBase',
              // onClick: (event, rowData) => { setShow(true);console.log('rowData', rowData)}
              onClick: (event, rowData) => { setShow(true); setAirPortForEdit(airPortData?.data?.find(item => item._id === rowData._id)) }
            },
            // {
            //   icon: 'preview',
            //   tooltip: 'View User',
            //   onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
            // }
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false
          }}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='model'
        open={show}
        onClose={() => setShow(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className='modal-content'>
            <div className='d-flex justify-content-end'>
              <img src='../../assets/img/my-img/Close.png' onClick={() => setShow(false)} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter name"
                      variant="standard"
                      color="warning"
                      name='name'
                      value={airPortForEdit?.name}
                      onChange={(e) => setAirPortForEdit({ ...airPortForEdit, name: e.target.value })}
                    />
                  </Col>
                  <Col lg={6} className="mb-4">
                    <TextField
                      label="Enter code"
                      variant="standard"
                      color="warning"
                      name='refcode'
                      value={airPortForEdit?.refcode}
                      onChange={(e) => setAirPortForEdit({ ...airPortForEdit, refcode: e.target.value })}
                    /> 
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <div>
                  <button onClick={() => setShow(false)} className="footer_cancel_btn">cancel</button>
                </div>
                <button onClick={() => editAirBase() } className={`footer_next_btn`}>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default AirBases