import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserCard from '../../../component/UserCard';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { userGetAction } from '../../../redux/actions/userAction';

const Users = () => {
  const [showspan, setShowspan] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [getUserDatas, setGetUserDatas] = useState()

  const userData = useSelector(state => state.userData?.getUserData)

  // console.log('userData==================', userData)

  useEffect(() => {
    setGetUserDatas(userData)
  }, [userData])

  // console.log('getUserData====================', getUserDatas)

  useEffect(() => {
    dispatch(userGetAction())
  }, [])


  // const ratingSchemesCard = [
  //   {
  //     name:"joony",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"abc",

  //   },
  //   {
  //     name:"joni",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"def",

  //   },
  //   {
  //     name:"jonty",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"ghi",

  //   },
  //   {
  //     name:"johnny",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"jkl",

  //   },
  //   {
  //     name:"john",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"mno",

  //   },
  //   {
  //     name:"leonardo",
  //     lastname:'vinci',
  //     department: "TIMBUKTU",
  //     profile:"pqr",

  //   }
  // ]

  return (
    <>
      {/* <div className='authheader_main'>
        <h1>Users</h1>
        <div className='d-flex'>
          <button className='add_btn me-3' onClick={() => navigate('/add-edit-user')}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>          
          <div className='search_content'>
            <input className='serch_input' id='search' />
            <label htmlFor='search'>
              <img src='../assets/img/about/search.png' />
            </label>
          </div>
        </div>
      </div>
      <div className='product'>
        <Row>
          <Col xxl={3} xl={6} lg={6} md={6} sm={6}>
            <UserCard />
          </Col>
          <Col xxl={3} xl={6} lg={6} md={6} sm={6}>
            <UserCard />
          </Col>
          <Col xxl={3} xl={6} lg={6} md={6} sm={6}>
            <UserCard />
          </Col>
          <Col xxl={3} xl={6} lg={6} md={6} sm={6}>
            <UserCard />
          </Col>
        </Row>
      </div> */}

      <div className='product'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Users</h2>
          <button className='add_btn me-3' onClick={() => navigate("/add-user")}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
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
        {/* <div className='container mx-auto'>
          <div className='table-responsive'>
            <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        class="rounded-circle"
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">John Doe</p>
                        <p class="text-muted mb-0">john.doe@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Software engineer</p>
                    <p class="text-muted mb-0">IT department</p>
                  </td>
                  <td>
                    <span class="badge badge-success rounded-pill d-inline">Active</span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button type="button" class="btn btn-link btn-sm btn-rounded">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                        class="rounded-circle"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Alex Ray</p>
                        <p class="text-muted mb-0">alex.ray@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Consultant</p>
                    <p class="text-muted mb-0">Finance</p>
                  </td>
                  <td>
                    <span class="badge badge-primary rounded-pill d-inline"
                    >Onboarding</span
                    >
                  </td>
                  <td>Junior</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                        class="rounded-circle"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Kate Hunington</p>
                        <p class="text-muted mb-0">kate.hunington@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">Designer</p>
                    <p class="text-muted mb-0">UI/UX</p>
                  </td>
                  <td>
                    <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}

        <MaterialTable
          title=""
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Department', field: 'department' },
            { title: 'Profile', field: 'profile' },
          ]}
          data={getUserDatas?.data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Users',
              onClick: (e, rowData) => navigate(`/edit-user?id=${rowData?._id}`)
            },
            {
              icon: 'preview',
              tooltip: 'View Users',
              onClick: (e, rowData) => navigate(`/add-user?id=${rowData?._id}`, { state: { isView: true } })
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

export default Users