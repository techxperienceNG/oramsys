import React, { useState, useEffect, useCallback } from "react"
import Nav from "react-bootstrap/Nav"
import { FaAngleRight } from "react-icons/fa"
import { BsCheckCircle, BsBox, BsFillPeopleFill } from "react-icons/bs"
import { IoTimerOutline } from "react-icons/io5"
import { FcBusinessman, FcApproval, FcClock } from "react-icons/fc"
import { GrTransaction } from "react-icons/gr"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"
import { useDispatch } from "react-redux"
import { GET_TRANSACTION_BY_ID } from "../../redux/types"
import { productGetAction } from "../../redux/actions/productAction"
import { getAllTransaction } from "../../redux/actions/transactionDataAction"
import { entityGetAction } from "../../redux/actions/entityAction"
import { userGetAction } from "../../redux/actions/userAction"
import { ApiGet, ApiGet2 } from "../../helper/API/ApiData"

const HomeLanding = () => {
  const token = AuthStorage.getToken()
  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)

  const dispatch = useDispatch()
  const cards = [
    {
      title: "Transactions",
      img: "Transact",
      icon: GrTransaction,
      color: "bg-success",
      name: "transactions",
      status: "Completed",
    },
    {
      title: "Available Products",
      img: "Product",
      icon: BsBox,
      color: "bg-primary",
      name: "products",
    },
    {
      title: "Registered Users",
      img: "Users",
      icon: BsFillPeopleFill,
      color: "bg-info",
      name: "users",
    },
    {
      title: "Entities",
      img: "entity",
      icon: FcBusinessman,
      color: "bg-warning",
      name: "entities",
    },
  ]

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  )
  const productGetDatas = useSelector((state) => state.product.product)
  const getAllUsers = useSelector((state) => state.userData.getUserData)
  const getAllEntities = useSelector((state) => state.entityData.entity)
  console.log("alltransactionn", getAlltransactionData)

  //Get data counts on everything
  const getCount = useCallback(
    (name) => {
      switch (name) {
        case "transactions":
          return getAlltransactionData?.data?.length
        case "products":
          return productGetDatas?.data?.length
        case "users":
          return getAllUsers?.data?.length // or the array of users like users.length;
        case "entities":
          return getAllEntities?.data?.length
        default:
          return
      }
    },
    [getAllUsers, getAlltransactionData, productGetDatas, getAllEntities]
  )

  const signedCount = []
  const notSignedCount = []
  //check to geet the number of signed transactions and un-signed transaction
  if (getAlltransactionData?.data) {
    getAlltransactionData.data.map((item) => {
      if (item.termSheet === "Signed") {
        signedCount.push(item)
      }
      if (item.termSheet !== "Signed") {
        notSignedCount.push(item)
      }
      // return alltransCount
    })
  }

  //get all transaction
  const Authsend = useCallback(() => {
    let id =
      AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
        ? AuthStorage.getStorageData(STORAGEKEY.userId)
        : "all"
    dispatch(getAllTransaction(id))
  }, [dispatch])

  const prodAction = useCallback(() => {
    dispatch(productGetAction("all"))
  }, [dispatch])

  const entityAction = useCallback(() => {
    dispatch(entityGetAction("all"))
  }, [dispatch])
  const userAction = useCallback(() => {
    dispatch(userGetAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(() => Authsend())
    dispatch(() => prodAction())
    dispatch(() => entityAction())
    dispatch(() => userAction())
    // console.log(getAlltransactionData)
    // eslint-disable-next-line
  }, [])

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return value
    } else {
      return data
    }
  }
  const downloadTermSheet = (id, name) => {
    ApiGet(`transaction/termSheet/${id}`)
      .then((res) => {
        let data = res.data.data
        if (name === "view") {
          ViewRiskAssessment(data)
        } else if (name === "download") {
          converBase64toBlob(data)
        }
      })
      .catch((e) => console.log(e))
  }
  const converBase64toBlob = (content, contentType) => {
    const linkSource = `data:application/pdf;base64,${content}`
    const downloadLink = document.createElement("a")
    const fileName = "TermSheet.pdf"

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }
  const ViewRiskAssessment = (contents) => {
    const linkSources = `data:application/pdf;base64,${contents}`
    let pdfWindow = window.open("")
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src=${linkSources}></iframe>`
    )
  }

  return (
    <>
      <div class='container d-flex flex-column flex-lg-row h-lg-full'>
        <div id='dash' class='h-screen flex-grow-1'>
          {/* <!-- Header --> */}
          <header class='bg-surface-primary border-bottom pt-6'>
            <div class='container-fluid'>
              <div id='dash' class='mb-npx'>
                <div class='row align-items-center mb-4'>
                  <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                    {/* <!-- Title --> */}
                    <h1 class='h2 mb-0 ls-tight'>Dashboard</h1>
                  </div>
                  {/* <!-- Actions --> */}
                  <div class='col-sm-6 col-12 text-sm-end'>
                    <div class='mx-n1'>
                      <Link
                        to='/transactions'
                        class='btn d-inline-flex btn-sm btn-neutral border-base mx-1'
                      >
                        <span class=' pe-2'>
                          <i class='bi bi-pencil'></i>
                        </span>
                        <span>Edit Transactions</span>
                      </Link>
                      {/* <Dropdown as={ButtonGroup}>
                        <Button variant='primary'>Create</Button>

                        <Dropdown.Toggle
                          split
                          variant='primary'
                          id='dropdown-split-basic'
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item href='#/action-1'>
                            Import
                          </Dropdown.Item>
                          <Dropdown.Item href='#/action-2'>
                            Export{" "}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                      {/* <a href='/' class="btn d-inline-flex btn-sm btn-primary mx-1">
                                    <span class=" pe-2">
                                        <i class="bi bi-plus"></i>
                                    </span>
                                    <span>Create</span>
                                </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Main --> */}
          <main class='py-6'>
            <div class='container-fluid'>
              <div class='row g-6 mb-6'>
                {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" &&
                  cards.map((card, i) => (
                    <div class='col-xl-6 mb-3 col-sm-6 col-12'>
                      <div class='card shadow border-0'>
                        <div class='card-body'>
                          <div class='row'>
                            <div class='col'>
                              <span class='h6 font-semibold text-muted text-sm d-block mb-2'>
                                {card.title}
                              </span>
                              <span class='h3 font-bold mb-0'>
                                {getCount(card.name)}
                              </span>
                            </div>
                            <div class='col-auto'>
                              <div
                                className={`icon icon-shape ${card.color} text-white text-lg rounded-circle`}
                              >
                                <card.icon size={56} />
                              </div>
                            </div>
                          </div>
                          <div class='mt-2 mb-0 text-sm'>
                            {card.status === "Completed" ? (
                              <>
                                {" "}
                                <span className='badge badge-pill bg-soft-success text-success me-2'>
                                  {signedCount.length}
                                </span>
                                <span class='text-nowrap text-xs text-muted'>
                                  Completed
                                </span>
                                <span className='badge mx-2 badge-pill bg-danger text-success-white me-2'>
                                  {notSignedCount.length}
                                </span>
                                <span class='text-nowrap text-xs text-muted'>
                                  In Progress...
                                </span>
                              </>
                            ) : (
                              <>
                                <span class='badge badge-pill bg-soft-success text-success me-2'>
                                  <i class='bi bi-arrow-up me-1'></i>13%
                                </span>
                                <span class='text-nowrap text-xs text-muted'>
                                  {card.title === "Available Products" ? (
                                    <Link
                                      className='text-decoration-none'
                                      to='/products'
                                    >
                                      View Products{" "}
                                      <i class='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : card.title === "Registered Users" ? (
                                    <Link
                                      className='text-decoration-none'
                                      to='/users'
                                    >
                                      View Users{" "}
                                      <i class='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : card.title === "Entities" ? (
                                    <Link
                                      className='text-decoration-none'
                                      to='/entities'
                                    >
                                      View Entities{" "}
                                      <i class='bi bi-arrow-right me-1'></i>
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }


                  { AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&
                  <div class='col-6 mb-3 col-sm-6 col-12'>
                  <div class='card shadow border-0'>
                    <div class='card-body'>
                      <div class='row'>
                        <div class='col'>
                          <span class='h6 font-semibold text-muted text-sm d-block mb-2'>
                            Transactions
                          </span>
                          <span class='h3 font-bold mb-0'>
                            {signedCount.length}
                          </span>
                        </div>
                        <div class='col-auto'>
                          <div
                            className={`icon icon-shape bg-success text-white text-lg rounded-circle`}
                          >
                            <GrTransaction size={56} />
                          </div>
                        </div>
                      </div>
                      <div class='mt-2 mb-0 text-sm'>
                          <>
                            {" "}
                            <span className='badge badge-pill bg-soft-success text-success me-2'>
                              {signedCount.length}
                            </span>
                            <span class='text-nowrap text-xs text-muted'>
                              Completed
                            </span>
                          </>
                      </div>
                    </div>
                  </div>
                </div>
                  }

                  { AuthStorage.getStorageData(STORAGEKEY.roles) === "user" &&
                    <>
                    <div class='col-6 mb-3 col-sm-6 col-12'>
                      <div class='card shadow border-0'>
                        <div class='card-body'>
                          <div class='row'>
                            <div class='col'>
                              <span class='h6 font-semibold text-muted text-sm d-block mb-2'>
                                Completed Transactions
                              </span>
                              <span class='h3 font-bold mb-0'>
                                {notSignedCount.length}
                              </span>
                            </div>
                            <div class='col-auto'>
                              <div
                                className={`icon icon-shape bg-primary text-white text-lg rounded-circle`}
                              >
                                <IoTimerOutline size={56} />
                              </div>
                            </div>
                          </div>
                          <div class='mt-2 mb-0 text-sm'>
                              <>
                                {" "}
                                <span className='badge badge-pill bg-soft-gray text-success me-2'>
                                  {notSignedCount.length}
                                </span>
                                <span class='text-nowrap text-xs text-muted'>
                                  In progress...
                                </span>
                              </>
                          </div>
                        </div>
                      </div>
                      </div>
                    </>
                  }
              </div>

              <div class='card shadow border-0 mb-7'>
                <div class='card-header'>
                  <h5 class='mb-0'>Applications</h5>
                </div>
                <div class='table-responsive'>
                  <table class='table table-hover table-nowrap'>
                    <thead class='thead-light'>
                      <tr>
                        <th scope='col'>Date Created</th>
                        <th scope='col'>Borrower</th>
                        <th scope='col'>Lender</th>
                        <th scope='col'>Value</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAlltransactionData &&
                        getAlltransactionData?.data?.map((data) => (
                          <tr>
                            <td>
                              {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}
                            </td>
                            <td>
                              <img alt='...' src='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80' class='avatar avatar-sm rounded-circle me-2' />
                              <Link class='text-decoration-none text-heading font-semibold' to='/'>
                                {data.borrower_Applicant}
                              </Link>
                            </td>

                            <td>
                              <img alt='...' src='https://preview.webpixels.io/web/img/other/logos/logo-1.png' class='avatar avatar-xs rounded-circle me-2' />
                              <Link class='text-decoration-none  text-heading font-semibold' to='/'>
                                {data.lenders}
                              </Link>
                            </td>
                            <td>
                              {formateCurrencyValue(data.details.contractDetails.value)}
                            </td>
                            <td>
                              {data.termSheet === "Signed" ? (
                                <span className='badge badge-lg text-heading badge-dot'>
                                  <i class='bg-success'></i>Signed
                                </span>
                              ) : (
                                <span className='badge badge-lg text-heading badge-dot'>
                                  <i class='bg-danger'></i>Not Signed
                                </span>
                              )}
                            </td>
                            <td class='text-end'>
                              <Link to='#' onClick={() => {
                                  data.termSheet === 'Not Signed' ? downloadTermSheet(data._id, 'view') : ViewRiskAssessment() 
                              }} class='btn btn-sm btn-neutral'>
                                View Termsheet
                              </Link>
                              <Button variant='outline-dark' class='btn btn-sm btn-square btn-neutral text-danger-hover'
                                onClick={() => {
                                  data.termSheet === "Signed"
                                    ? downloadTermSheet(data._id, "download")
                                    : converBase64toBlob(data.termSheetUrl)
                                }}
                              >
                                <i class='bi bi-arrow-down'></i>
                              </Button>
                            </td>
                          </tr>
                        ))}

                    </tbody>
                  </table>
                </div>
                <div class='card-footer border-0 py-5'>
                  <span class='text-muted text-sm'>
               
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLanding

{
  /* <section className=''>
                 <div className="background-shape6">
                  <img src="./assets/img/figure/figure32.png" alt="figure" width="404" height="216" />
                </div>
            <div className='container dash-head'>
                <h1 className='m-2'>Dashboard</h1>
                <div className='row no-gutters'>

                  {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" && (
                    cards.map((card, i) => (
                        <div key={i} className="col-lg-4 col-md-6 m-2">
                        <div className="financo-activities-box1">
                         
                            <img src={card.img} alt="figure" height="81" width="81" />
                            
                          <h2 className="heading-title"><a href="/" className="text-decoration-none"><p className='heading-title'>{getCount(card.name)}</p> {" "} {card.title}</a>
                          
                          </h2>
                          <p>{card.text}</p>
                      
                        </div>
                      </div>
                      ))
                  )}

                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                      //{getAlltransaction?.data?.termSheet === 'Not Signed' }
                      <div className="col-lg-4 col-md-6 my-4">
                        <div className="financo-activities-box1">
                                <FcApproval size={56} />
                                <h2 className="heading-title my-3"><p className="text-decoration-none"><span className='fw-bold fs-2'>{ signedCount.length}</span> {" "} Completed Transactions</p></h2>
                            <div className="item-button">
                              <Link to='/transactions'className="item-btn text-decoration-none"><FaAngleRight /><span>Go to Transactions</span></Link>
                            </div>
                        </div>
                      </div>
                    )}
                    
                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                      //{getAlltransaction?.data?.termSheet === 'Not Signed' }
                        <div className="col-lg-4 col-md-6 my-4 mx-3">
                            <div className="financo-activities-box1">
                              <FcClock size={56} />
                                <h2 className="heading-title my-3"><p className="text-decoration-none"><span className='fw-bold fs-2'>{ notSignedCount.length}</span> {" "} Transactions in Progress...</p></h2>
                        
                                <div className="item-button">
                            <Link to='/transactions'className="item-btn text-decoration-none"><FaAngleRight /><span>Go to Transactions</span></Link>
                            </div>
                          </div>
                      </div>
                   
                    )}
 
                </div>
               
                <div className="background-shape7">
                  <img src="./assets/img/figure/figure29.png" alt="figure" width="747" height="256" />
                </div>
                <div className="background-shape8">
                  <img src="./assets/img/my-img/figure33.png" alt="figure" width="783" height="439" />
                </div>
            </div>
      </section> */
}
