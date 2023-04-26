import React, { useEffect, useState, useCallback } from "react"
import { ButtonGroup, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Transactionscard from "../../component/Transactionscard"
import MaterialTable from "material-table"
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"
import { getAllTransaction } from "../../redux/actions/transactionDataAction"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getRiskAssessment, riskAssessmentAction } from "../../redux/actions/riskAssessmentAction"
import ExcelModal from "../../component/Modal/ExcelModal"
import { ApiGet, ApiGet2 } from "../../helper/API/ApiData"
import { Button, Icon } from "@material-ui/core"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { GET_TRANSACTION_BY_ID } from "../../redux/types"
import Skeleton from "react-loading-skeleton"
import { MdAssessment, MdEdit, MdPreview, MdVisibility } from "react-icons/md"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Tooltip } from "react-tooltip"
import Paginate from './Pagination'
import { FaSearch } from "react-icons/fa"

const Transactions = () => {
  const dispatch = useDispatch()
  const [showspan, setShowspan] = useState(false)
  const [selected, setSelected] = useState("")
  const [showExcelModal, setShowExcelModal] = useState(false)
  const [sendId, setSendId] = useState()

  const navigate = useNavigate()
  const [showSubData, setShowSubData] = useState(false)
  const [transaction, setTransaction] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)

  const getAlltransactionData = useSelector(
    (state) => state.transactionData.getAllTransaction
  )
  const riskAssessment = useSelector(
    (state) => state.riskAssessmentData.getRiskAssessment
  )

  useEffect(() => {
    let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin"
      ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
    dispatch(getAllTransaction(id))
  }, [])

  const refreshPage = useCallback(() => {
    if (
      getAlltransactionData &&
      getAlltransactionData.data &&
      getAlltransactionData.data.length > 0
    ) {
      setTransaction(
        getAlltransactionData.data?.map((item) => {
          return {
            ...item,
            details: {
              ...item?.details,
              shippingOptions: {
                ...item?.details?.shippingOptions,
                portOfOrigin:
                  item?.details?.shippingOptions?.portOfOrigin ??
                  item?.details?.shippingOptions?.airbaseOfOrigin,
                destinationPort:
                  item?.details?.shippingOptions?.destinationPort ??
                  item?.details?.shippingOptions?.destinationAirbase,
              },
            },
          }
        })
      )
    }
  }, [getAlltransactionData])

  useEffect(() => {
    dispatch(() => refreshPage())
    //eslint-disable-next-line
  }, [])

  // const cllickOnRiskAssessment = (id) => {
  //     dispatch(getRiskAssessment(id))
  //     setSelected(id)
  // }
  useEffect(() => {
    if (riskAssessment.status === 200 && selected) {
      // if (riskAssessment && riskAssessment.data && riskAssessment.data.transactionId   ) {
      navigate(`/risk-assessment?id=${selected}`)
      // }
    }
  }, [riskAssessment, selected])

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
  
  const handleRefresh = () => {
    dispatch({
      type: GET_TRANSACTION_BY_ID,
      payload: {},
    })
    navigate("/edit-transactions", {
      state: [{ type: "Export" }, { type: "Physical" }],
    })
  }
  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return value
    } else {
      return data
    }
  }
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const indexOfLastTrans = currentPage * postsPerPage
  const indexOfFirstTrans = indexOfLastTrans - postsPerPage
  const currentTrans = getAlltransactionData?.data?.slice(indexOfFirstTrans, indexOfLastTrans)
  //page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>


      <div class='mx-5 d-flex flex-column flex-lg-row h-lg-full'>
        <div id='dash' class='h-screen flex-grow-1'>
          {/* <!-- Header --> */}
          <header class='bg-surface-primary border-bottom pt-6'>
            <div class='container-fluid'>
              <div id='dash' class='mb-npx'>
                <div class='row align-items-center mb-3'>
                  <div class='col-sm-6 col-12 mb-4 mb-sm-0'>
                    {/* <!-- Title --> */}
                    <h1 class='h2 mb-0 fw-bold fs-4 ls-tight'>Transaction</h1>
                  </div>
                  {/* <!-- Actions --> */}
                  <div class='col-sm-6 col-12 text-sm-end'>
                    <div class='mx-n1 me-5 d-flex align-items-center justify-content-end gap-2'>

                      {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? (
                        <Dropdown className="me-2" autoClose="outside">
                          <Dropdown.Toggle variant="light" className="btn btn-md items-center" id="dropdown-autoclose-outside" key='start'>
                            <i class="bi bi-plus pe-2 "></i><span className="fs-6 fw-bold">Add</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="mt-3">
                            <Dropdown.Item onClick={() => navigate("/edit-transactions", { state: [{ type: "Import" }], })}>Import</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowSubData(!showSubData)}>Export <MdOutlineKeyboardArrowDown size={42} className='ps-3' /></Dropdown.Item>
                            {(showSubData && (
                              <>
                                <Dropdown.Item className='ps-3' onClick={handleRefresh}>Physical commodities</Dropdown.Item>
                                <Dropdown.Item className='ps-3' onClick={() => navigate("/edit-transactions", { state: [{ type: "Export" }, { type: "Non-physical" }], })}>Non-physical commodities</Dropdown.Item>
                              </>
                            ))}

                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <></>
                      )}

                      <div class="input-group w-50">
                          <input type="search" placeholder="Search transaction..." class="form-control" />
                        <button type="button" class="btn btn-primary btn-sm">
                          <FaSearch />
                        </button>
                      </div>


                      <Link to='/transactions' style={{ borderColor: '#9E3E65' }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                        <span class=' pe-2'>
                          <i class='bi bi-pencil'></i>
                        </span>
                        <span className='fw-bold'>Edit</span>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Main --> */}
          <main class='py-2'>
            <div class='container-fluid'>
              <div class='row g-6 mb-4'></div>

              <div class='card rounded-4 shadow border-0'>
              <div class='card-header'>
                  <h5 class='mb-0'>Transactions</h5>
                </div>

                <div class='table-responsive'>

                  <table class='table table-bordered border-light caption-top border-2 table-hover table-nowrap'>
                   
                    <thead class='thead-light'>
                      <tr className='text-center'>
                        <th className='fw-bold' scope='col'>Transaction Date</th>
                        <th className='fw-bold' scope='col'>Transaction Number</th>
                        <th className='fw-bold' scope='col'>Applicant</th>
                        <th className='fw-bold' scope='col'>Lender</th>
                        <th className='fw-bold' scope='col'>Product</th>
                        <th className='fw-bold' scope='col'>Value</th>
                        <th className='fw-bold' scope='col'>Termsheet</th>
                        <th className='fw-bold' scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentTrans &&
                        currentTrans?.map((data) => (
                          <tr className='text-center'>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              {new Date(data.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}
                            </td>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              {data._id}
                            </td>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              <Link className='py-6 fst-normal text-decoration-none text-heading font-semibold' to='/'>
                                {data.borrower_Applicant}
                              </Link>
                            </td>

                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              <Link className='text-decoration-none  text-heading font-semibold' to='/'>
                                {data.lenders}
                              </Link>
                            </td>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              {formateCurrencyValue(data?.details?.contractDetails?.value)}
                            </td>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal'>
                              {data?.details?.productDetails?.name?.name}
                            </td>
                            <td style={{ fontSize: "1.1rem" }} className='py-6 fst-normal cursor-pointer'>
                              <p onClick={() => { data.termSheet === "Not Signed" && setShowExcelModal(true); setSendId(data._id) }}>
                                {data.termSheet}
                                {data.termSheet === "Signed" ? (
                                  <Button onClick={() => { downloadTermSheet(data._id) }}><FileDownloadIcon /></Button>
                                ) : (<></>)
                                }
                              </p>
                            </td>

                            <td class='text-end'>
                              <div className='container '>
                                <div className='d-flex py-3 justify-content-center gap-3'>
                                  <div class=''>
                                    <MdEdit onClick={() => { navigate(`/edit-transactions?id=${data?._id}`, { state: [{ type: data.type }, { type: data?.details?.productDetails?.nature ? data.details.productDetails.nature : "" }, { isView: false },], }) }}
                                      data-tooltip-id='edit-id'
                                      data-tooltip-content='Edit Transaction'
                                      className='cursor-pointer'
                                      size={25} />
                                    <Tooltip id='edit-id' place='top' effect='solid' />
                                  </div>
                                  <div class=''>
                                    <MdPreview data-tooltip-id='preview-id' data-tooltip-content='Preview Transaction'
                                      onClick={() => navigate(`/edit-transactions?id=${data?._id}`, { state: [{ type: data.type }, { type: data?.details?.productDetails?.nature ? data.details.productDetails.nature : "", }, { isView: true },], })}
                                      className='cursor-pointer'
                                      size={25}
                                    />
                                    <Tooltip id='preview-id' place='top' effect='solid' />
                                  </div>
                                  <div class=''>
                                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" ? <MdAssessment data-tooltip-id='riskassesment-id' data-tooltip-content='Risk Assesment' onClick={() => {
                                      dispatch(getRiskAssessment(data._id)); setSelected(data._id)}} className='cursor-pointer'
                                      size={25}
                                    />  : ""}

                                    <Tooltip id='riskassesment-id' place='top' effect='solid' />
                                  </div>
                                  <div class=''>
                                    <Link className='link-dark' to='#' onClick={() => { data.termSheet === "Not Signed" ? downloadTermSheet(data._id, "view") : ViewRiskAssessment() }}>
                                      <MdVisibility data-tooltip-id='viewriskassesment' data-tooltip-content='View Risk Assesment' size={25} />
                                      <Tooltip id='viewriskassesment' place='top' effect='solid' />
                                    </Link>
                                  </div>
                                  <div class=''>
                                    <FileDownloadIcon data-tooltip-id='termsheet' data-tooltip-content='Download Termsheet' onClick={() => { data.termSheet === "Not Signed" ? downloadTermSheet(data._id, "download") : converBase64toBlob(data.termSheetUrl) }}
                                      className='cursor-pointer'
                                      size={25}
                                    />
                                    <Tooltip id='termsheet' place='top' effect='solid' />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    {!currentTrans < 0 && <p className='text-center mx-auto container my-5 m-5'> No records were found</p> }

                  </table>
                </div>
                <div class="card-footer border-0 py-2">

                  <span class="text-muted text-sm"><Paginate postsPerPage={postsPerPage} totalPosts={getAlltransactionData?.data?.length} paginate={paginate} prevPagefunc={() => setCurrentPage(prev => prev - 1)} nextPagefunc={() => setCurrentPage(prev => prev + 1)} currentPage={currentPage} /> </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showExcelModal && (<ExcelModal refreshpage={() => dispatch(() => refreshPage())} show={showExcelModal} onHide={() => setShowExcelModal(false)}
          getId={sendId}
        />
      )}
    </>
  )
}

export default Transactions
