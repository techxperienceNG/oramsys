import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import STORAGEKEY from '../../config/APP/app.config';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { LOGIN } from '../../redux/types';
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
import LogoutModal from '../../component/Modal/LogoutModal';
import { BiHomeAlt2 } from "react-icons/bi";
import { BsAirplane, BsFillBarChartFill, BsFillPeopleFill, BsFlag } from 'react-icons/bs';
import { GrClose, GrDatabase, GrUserAdmin } from 'react-icons/gr';
import { FaBoxOpen, FaPeopleCarry } from 'react-icons/fa';
import { HiOutlineUsers } from "react-icons/hi";
import { GiCargoShip } from "react-icons/gi";
import { ImOffice } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import Fade from 'react-reveal/Fade';


const Sidebar = ({ showSidebar, setSidebar }) => {

  const navigate = useNavigate();
  const [showModal, setshowModal] = useState(false)
  const [showItem, setShowItem] = useState('')
  const [showSubItem, setShowSubItem] = useState('')
  const [userData, setUserData] = useState('')
  const ShowSubItem = (item) => {
    const { text, path } = item
    if (text === "Administration") {
      if (text !== showItem) {
        setShowItem(text)
      } else {
        setShowItem('')
      }
    } else {
      if (text === "Master Data") {
        if (text !== showSubItem) {
          setShowSubItem(text)
        } else {
          setShowSubItem('')
        }
      } else {
        navigate(`/${path}`)
      }
    }
  }
  const dispatch = useDispatch()
  let navbarData = [];

  const navbarDataForSuperAdmin = [
    {
      img: BiHomeAlt2,
      text: 'Dashboard',
      path: "homeLanding"
    },
    {
      img: GrUserAdmin,
      text: 'Administration',
      path: "",
      subItem: [
        {
          img: BsFillPeopleFill,
          text: 'Entities',
          path: "entities"
        },
        {
          img: FaPeopleCarry,
          text: 'Entities Role',
          path: "entities-role"
        },
        {
          img: GrDatabase,
          text: 'Master Data',
          path: "",
          subData: [
            {
              img: FaBoxOpen,
              text: 'Products',
              path: "products",
            },
            {
              img: BsFlag,
              text: 'Countries',
              path: "countries",
            },
            {
              img: GiCargoShip,
              text: 'Ports',
              path: "ports",
            },
            {
              img: BsAirplane,
              text: 'Airports',
              path: "airports",
            },
            {
              img: ImOffice,
              text: 'Rating Agencies',
              path: "rating-agencies",
            },
          ]
        },
        {
          img: HiOutlineUsers,
          text: 'Users',
          path: "users"
        },
      ]
    },
    {
      img: BsFillBarChartFill,
      text: 'Transactions',
      path: "transactions"
    },

  ]

  const navbarDataForAdmin = [
    {
      img: GrUserAdmin,
      text: 'Administration',
      path: "",
      subItem: [
        {
          img:  BsFillPeopleFill,
          text: 'Entities',
          path: "entities"
        },
        {
          img: FaPeopleCarry,
          text: 'Entities Role',
          path: "entities-role"
        },
      ]
    }
  ]

  const navbarDataForUser = [
    {
      img: BiHomeAlt2,
      text: 'Dashboard',
      path: "homeLanding"
    },
    
    {
      img: BsFillBarChartFill,
      text: 'Transactions',
      path: "transactions"
    },
  ]

  if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    navbarData = navbarDataForUser
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    navbarData = navbarDataForAdmin
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    navbarData = navbarDataForSuperAdmin
  }
  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
      setShowItem("Administration")
    }
  },[AuthStorage.getStorageData(STORAGEKEY.roles)])

  

  useEffect(() => {
    setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {})
  }, [AuthStorage.getStorageData(STORAGEKEY.userData)])

  // useEffect(() => {
  //   setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)))
  // }, [])



  return (
    <>
    

         {/* <!-- Vertical Navbar --> */}
        <Fade left>
      <div className={`${showSidebar ? ' sidebar-main' : 'sidebar-main '}`}>
        <GrClose size={30} className="close_sidebar" onClick={() => setSidebar(!showSidebar)} />
        {/* <img src="../../../assets/img/about/close.png" className="close_sidebar" onClick={() => setSidebar(!showSidebar)} /> */}
          <div className='profile-content'>
            <img src='../../../assets/img/lgo-red.png' alt="" className='align-items-center m-2 mt-3 mx-auto profile-img' />
            <img src='../../../assets/img/profile.png' className='user_img' />
            <div className='profile-name text-center'>
              <h1>{userData?.name}</h1>
              {/* <img src='../../../assets/img/about/logout.png' onClick={(e) => Logout(e)} className='mt-2' style={{ cursor: "pointer" }} /> */}
            </div>
          </div>

        <div className='sidebar-nav'>
          <Navbar>
            <div style={{ 'width': "100%",'zIndex':'11111' }} className='navbar-light bg-white' >
              {
                navbarData.map((item, i) => (
                  <div key={i} className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'}`}>
                    <div className='d-flex align-items-center ps-3 gap-3 mx-2 my-4'>
                      <item.img size={20} />
                      <Nav.Link className=' p-0' onClick={() => ShowSubItem({ text: item.text, path: item.path })}>{item.text} {item.text === "Administration" ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showItem === "Administration" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                    </div>
                    {
                      showItem === item.text && "subItem" in item &&
                      item.subItem?.map((subItem) => {
                        return <>
                          <div className='d-flex align-items-center gap-3 mx-4 my-4 ps-2'>
                          <subItem.img size={16} />
                            <Nav.Link className=' p-0 ' onClick={() => ShowSubItem({ text: subItem.text, path: subItem.path })}>{subItem.text} {subItem.text === 'Master Data' ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showSubItem === "Master Data" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                          </div>
                          {
                            showSubItem === subItem.text && "subData" in subItem &&
                            subItem.subData?.map((subSubItem) => (
                              <div className='d-flex align-items-center gap-2 my-4 mx-4 ps-3'>
                                <subSubItem.img size={16} />
                                <NavLink className='text-dark text-decoration-none' to={subSubItem.path} style={{ display: "block" }}>{subSubItem.text}</NavLink>
                              </div>
                            ))
                          }
                        </>
                      })
                    }
                  </div>
                ))
              }
               {/* <!-- Divider --> */}
               <hr className="navbar-divider my-2 opacity-20" />
                {/* <!-- Navigation --> */}
             
                <div className="d-flex flex-column mx-3 ps-2 gap-3  my-4">
                    <div className="">
                        {/* <Link className="nav-link">
                            <i className="bi bi-person-square"></i> <span className='ps-5'>Account</span>
                        </Link> */}
                    </div>
                    <div className="">
                        <Link onClick={() => setshowModal(true)} className="nav-link" href="#">
                            <IoMdLogOut size={22} /><span className='ps-3 fw-semibold text-danger'>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
          </Navbar>
        </div>
      </div> 



      <div className="sidebar_responsive">

      </div>
      </Fade>
      {showModal && <LogoutModal show={showModal} onHide={() => setshowModal(false)} />}
    </>
  )
}

export default Sidebar

      
      //  <div className={`${showSidebar ? ' sidebar-main' : 'sidebar-main '}`}>
      //     <img src="../../../assets/img/about/close.png" className="close_sidebar" onClick={() => setSidebar(!showSidebar)} />
      //     <div className='profile-content'>
      //       <img src='../../../assets/img/about/logo.png' alt="" className='profile-img' />
      //       <img src='../../../assets/img/about/bg.png' className='user_img' />
      //       <div className='profile-name text-center'>
      //         <h1>{userData?.name}</h1>
      //         <img src='../../../assets/img/about/logout.png' onClick={(e) => Logout(e)} className='mt-2' style={{ cursor: "pointer" }} />
      //       </div>
      //     </div>
       
      //         <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                
      //             <div className="container-fluid">
                
      //                 <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      //                     <span className="navbar-toggler-icon"></span>
      //                 </button>
                      
                    
      //                 <div className="navbar-user d-lg-none">
                      
      //                     <div className="dropdown">
                          
      //                         <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //                             <div className="avatar-parent-child">
      //                                 <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar- rounded-circle" />
      //                                 <span className="avatar-child avatar-badge bg-success"></span>
      //                             </div>
      //                         </a>
                            
      //                         <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
      //                             <a href="#" className="dropdown-item">Profile</a>
      //                             <a href="#" className="dropdown-item">Settings</a>
      //                             <a href="#" className="dropdown-item">Billing</a>
      //                             <hr className="dropdown-divider" />
      //                             <a href="#" className="dropdown-item">Logout</a>
      //                         </div>
      //                     </div>
      //                 </div>
      //                 <div className="collapse navbar-collapse" id="sidebarCollapse">
                      
      //                     <ul className="navbar-nav">
      //                       {
      //                         navbarData.map((item, i) => (
      //                           <div key={i} className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'}`}>
      //                             <div className='d-flex align-items-center ps-3 gap-5 mx-2 my-4'>
      //                               <img src={item.img} className="" alt="" width="16px" />
      //                               <Nav.Link className='sidebar-link p-0' onClick={() => ShowSubItem({ text: item.text, path: item.path })}>{item.text} {item.text === "Administration" ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showItem === "Administration" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
      //                             </div>
      //                             {
      //                               showItem === item.text && "subItem" in item &&
      //                               item.subItem?.map((subItem) => {
      //                                 return <>
      //                                   <div className='d-flex align-items-center ps-3 gap-5 mx-4 my-4'>
      //                                     <img src={subItem.img} className="" alt="" width="16px" />
      //                                     <Nav.Link className='sidebar-link p-0 ' onClick={() => ShowSubItem({ text: subItem.text, path: subItem.path })}>{subItem.text} {subItem.text === 'Master Data' ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showSubItem === "Master Data" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
      //                                   </div>
      //                                   {
      //                                     showSubItem === subItem.text && "subData" in subItem &&
      //                                     subItem.subData?.map((subSubItem) => (
      //                                       <div className='d-flex align-items-center gap-5 ms-2 my-4 mx-4 ps-5'>
      //                                         <img src={subSubItem.img} className="" alt="" width="16px" />
      //                                         <NavLink className='sidebar-link text-decoration-none' to={subSubItem.path} style={{ display: "block" }}>{subSubItem.text}</NavLink>
      //                                       </div>
      //                                     ))
      //                                   }
      //                                 </>
      //                               })
      //                             }
      //                           </div>
      //                         ))
      //                       }
                              
      //                     </ul>
                        
      //                 </div>
      //             </div>
      //         </nav>
      //     </div>