import React, { useState } from 'react'
import { FaPowerOff } from "react-icons/fa";
import { HiOutlineLogout } from 'react-icons/hi';
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import LogoutModal from '../../component/Modal/LogoutModal'

const AuthHeader = ({ showSidebar, setSidebar }) => {
  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  const [showModal, setshowModal] = useState(false)
  return (
    <>
      {/* <div className='authheader_main'>
        <img src='../../assets/img/about/more.png' className='sidebar_img' onClick={() => setSidebar(!showSidebar)} />
        <h1>Transactions</h1>
        <div className='btn_input_content'>
          <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
          {
            showspan &&
            <div className='add_content'>
              <p>Import</p>
              
              <div >
                <p onClick={() => setShowSubData(!showSubData)} className='d-flex justify-content-between align-items-center'>Export
                  <img className={`${showSubData && "imgrotet"}`} src='../../assets/img/about/down-filled-triangular-arrow.png' />
                </p>
              </div>
              {
                showSubData &&
                <>
                  <p className="ps-3">Physical commodities</p>
                  <p className="ps-3">Non-physical commodities</p>
                </>
              }
            </div>
          }
          <div className='search_content'>
            <input className='serch_input' id='search' />
            <label htmlFor='search'>
              <img src='../../assets/img/about/search.png' />
            </label>
          </div>
        </div>
      </div> */}
      <div className='open-sidebar d-flex align-items-center' style={{ backgroundColor: "#f1f1f1", padding: "15px" }}>
        <div className="d-flex align-items-center">
          <img src='./assets/img/my-img/barmanu.svg' alt='' width="30px" onClick={() => setSidebar(!showSidebar)} />
          <span className="ms-2 fw-bold fs-5">Oramsys</span>
        </div>
        <div className="d-flex align-items-center me-5 ms-auto">
          <div className='me-2'>
            <IoSettingsOutline className='me-1' size={15} />
            <span>Settings</span>
          </div>

          <div className='ms-2 mx-auto'>
           
            <Link onClick={() => setshowModal(true)} className="nav-link" href="#">
            <HiOutlineLogout className='me-1' size={15} />
            <span>Logout</span>
              {/* <HiOutlineLogout className='text-white' size={22} /><span className='ps-3 fw-semibold text-danger'>Logout</span> */}
            </Link>
          </div>

        </div>
        
      </div>
      {showModal && <LogoutModal show={showModal} onHide={() => setshowModal(false)} />}
    </>
  )
}

export default AuthHeader