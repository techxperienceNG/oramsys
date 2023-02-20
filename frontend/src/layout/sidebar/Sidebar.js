import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import STORAGEKEY from '../../config/APP/app.config';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { LOGIN } from '../../redux/types';
import { toast } from 'react-toastify'

const Sidebar = ({ showSidebar, setSidebar }) => {

  const navigate = useNavigate();
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
      img: "./assets/img/my-img/Entities.png",
      text: 'Dashboard',
      path: "homeLanding"
    },
    {
      img: "./assets/img/my-img/Administration.png",
      text: 'Administration',
      path: "",
      subItem: [
        {
          img: "./assets/img/my-img/Entities.png",
          text: 'Entities',
          path: "entities"
        },
        {
          img: "./assets/img/my-img/Entities.png",
          text: 'Entities Role',
          path: "entities-role"
        },
        {
          img: "./assets/img/my-img/MasterData.png",
          text: 'Master Data',
          path: "",
          subData: [
            {
              img: "./assets/img/my-img/Products.png",
              text: 'Products',
              path: "products",
            },
            {
              img: "./assets/img/my-img/Countries.png",
              text: 'Countries',
              path: "countries",
            },
            {
              img: "./assets/img/my-img/Countries.png",
              text: 'Ports',
              path: "ports",
            },
            {
              img: "./assets/img/my-img/Countries.png",
              text: 'Airports',
              path: "airports",
            },
            {
              img: "./assets/img/my-img/RatingAgencies.png",
              text: 'Rating Agencies',
              path: "rating-agencies",
            },
          ]
        },
        {
          img: "./assets/img/my-img/Users.png",
          text: 'Users',
          path: "users"
        },
      ]
    },
    {
      img: './assets/img/my-img/Transactions.png',
      text: 'Transactions',
      path: "transactions"
    },

  ]

  const navbarDataForAdmin = [
    {
      img: "./assets/img/my-img/Administration.png",
      text: 'Administration',
      path: "",
      subItem: [
        {
          img: "./assets/img/my-img/Entities.png",
          text: 'Entities',
          path: "entities"
        },
        {
          img: "./assets/img/my-img/Entities.png",
          text: 'Entities Role',
          path: "entities-role"
        },
      ]
    }
  ]

  const navbarDataForUser = [
    {
      img: "./assets/img/my-img/Entities.png",
      text: 'Dashboard',
      path: "homeLanding"
    },
    
    {
      img: './assets/img/my-img/Transactions.png',
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

  const Logout = (e) => {
    dispatch({
      type: LOGIN,
      payload: []
    })
    e.preventDefault();
    AuthStorage.deauthenticateUser()
    navigate('/');
  }

  useEffect(() => {
    setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)) ?? {})
  }, [AuthStorage.getStorageData(STORAGEKEY.userData)])

  // useEffect(() => {
  //   setUserData(JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData)))
  // }, [])



  return (
    <>
         {/* <!-- Vertical Navbar --> */}
    
      <div className={`${showSidebar ? ' sidebar-main' : 'sidebar-main '}`}>
        <img src="../../../assets/img/about/close.png" className="close_sidebar" onClick={() => setSidebar(!showSidebar)} />
          <div className='profile-content'>
            <img src='../../../assets/img/about/logo.png' alt="" className='profile-img' />
            <img src='../../../assets/img/about/bg.png' className='user_img' />
            <div className='profile-name text-center'>
              <h1>{userData?.name}</h1>
              <img src='../../../assets/img/about/logout.png' onClick={(e) => Logout(e)} className='mt-2' style={{ cursor: "pointer" }} />
            </div>
          </div>

        <div className='sidebar-nav'>
          <Navbar>
            <div style={{ 'width': "100%",'zIndex':'11111' }}>
              {
                navbarData.map((item, i) => (
                  <div key={i} className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'}`}>
                    <div className='d-flex align-items-center ps-3 gap-5 mx-2 my-4'>
                      <img src={item.img} className="" alt="" width="16px" />
                      <Nav.Link className='sidebar-link p-0' onClick={() => ShowSubItem({ text: item.text, path: item.path })}>{item.text} {item.text === "Administration" ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showItem === "Administration" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                    </div>
                    {
                      showItem === item.text && "subItem" in item &&
                      item.subItem?.map((subItem) => {
                        return <>
                          <div className='d-flex align-items-center ps-3 gap-5 mx-4 my-4'>
                            <img src={subItem.img} className="" alt="" width="16px" />
                            <Nav.Link className='sidebar-link p-0 ' onClick={() => ShowSubItem({ text: subItem.text, path: subItem.path })}>{subItem.text} {subItem.text === 'Master Data' ? <img src='../../../../../assets/img/about/down-filled-triangular-arrow.png' className={`${showSubItem === "Master Data" ? 'img-roted' : 'img-roted_unset'}`} /> : ""}</Nav.Link>
                          </div>
                          {
                            showSubItem === subItem.text && "subData" in subItem &&
                            subItem.subData?.map((subSubItem) => (
                              <div className='d-flex align-items-center gap-5 ms-2 my-4 mx-4 ps-5'>
                                <img src={subSubItem.img} className="" alt="" width="16px" />
                                <NavLink className='sidebar-link text-decoration-none' to={subSubItem.path} style={{ display: "block" }}>{subSubItem.text}</NavLink>
                              </div>
                            ))
                          }
                        </>
                      })
                    }
                  </div>
                ))
              }
            </div>
          </Navbar>
        </div>
      </div> 



      <div className="sidebar_responsive">

      </div>

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
       
      //         <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                
      //             <div class="container-fluid">
                
      //                 <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      //                     <span class="navbar-toggler-icon"></span>
      //                 </button>
                      
                    
      //                 <div class="navbar-user d-lg-none">
                      
      //                     <div class="dropdown">
                          
      //                         <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //                             <div class="avatar-parent-child">
      //                                 <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar- rounded-circle" />
      //                                 <span class="avatar-child avatar-badge bg-success"></span>
      //                             </div>
      //                         </a>
                            
      //                         <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
      //                             <a href="#" class="dropdown-item">Profile</a>
      //                             <a href="#" class="dropdown-item">Settings</a>
      //                             <a href="#" class="dropdown-item">Billing</a>
      //                             <hr class="dropdown-divider" />
      //                             <a href="#" class="dropdown-item">Logout</a>
      //                         </div>
      //                     </div>
      //                 </div>
      //                 <div class="collapse navbar-collapse" id="sidebarCollapse">
                      
      //                     <ul class="navbar-nav">
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