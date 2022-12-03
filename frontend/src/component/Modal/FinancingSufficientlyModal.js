import { Backdrop, Fade, Modal, TextField, InputAdornment } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from 'react-redux'
import { CurrencyOptions } from '../../helper/common';
import { useLocation } from 'react-router-dom'

const FinancingSufficientlyModal = ({ show, onHide, getModalData }) => {

  const [financingSufficiently, setFinancingSufficiently] = useState({
    contractCurrency: "",
    contractValue: "",
    facilityCurrency: "",
    facilityAmount: "",
  })
  const location = useLocation()
  const isView = location.state?.isView
  
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")

  const transactionData = useSelector((state) => state.transactionData.transactionData)
  const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

//   useEffect(() => {
//     console.log('transactionData', transactionData)
//     setFinancingSufficiently({
//         ...financingSufficiently,
//         contractCurrency: transactionData?.details?.contractDetails?.currency,
//         contractValue: transactionData?.details?.contractDetails?.value,
//         facilityCurrency: transactionData.data.facility.currency,
//         facilityAmount: transactionData.data.facility.amount
//     })
// }, [transactionData])

  useEffect(() => {
    if (getTransactionByIdData && getTransactionByIdData.data) {
        console.log("getTransactionByIdData=====", getTransactionByIdData.data)
        setFinancingSufficiently({
          ...financingSufficiently,
          contractCurrency: getTransactionByIdData.data?.details?.contractDetails?.currency,
          contractValue: getTransactionByIdData.data?.details?.contractDetails?.value,
          facilityCurrency: getTransactionByIdData.data.facility.currency,
          facilityAmount: getTransactionByIdData.data.facility.amount
      })
    }
}, [getTransactionByIdData])

  const handleChange = (e) => {
    setFinancingSufficiently({
      ...financingSufficiently,
      [e.target.name]: e.target.value
    })
  }

  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data.replace(
        /\D/g,
        '',
      ).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ',',
      );
      // let prefix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.prefix
      // let suffix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.suffix
      // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
      return value
    } else {
      return data
    }
  }

  const save = (data) => {
    getModalData(data)
    onHide()
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='model'
        open={show}
        onClose={onHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className='modal-content'>
            <div className='d-flex justify-content-between'>
              <h2 id="transition-modal-title" className='modal-title'>Margin the financing sufficiently</h2>
              <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option.label}
                      id="disable-clearable"
                      label="Contract currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Contract currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, contractCurrency: newValue.label });
                      }}
                      disableClearable
                      disabled={isView || financingSufficiently.contractCurrency?.length > 0}
                      value={(CurrencyOptions.length > 0 && financingSufficiently.contractCurrency) && CurrencyOptions.find((ele) => ele.label === financingSufficiently.contractCurrency)}

                    />
                    {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Contract Value"
                      variant="standard"
                      color="warning"
                      name='contractValue'
                      value={formateCurrencyValue(financingSufficiently.contractValue)}
                      onChange={handleChange}
                      disabled={isView || financingSufficiently.contractValue?.length > 0}
                    />
                  </Col>

                  <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option?.label}
                      id="disable-clearable"
                      label="Facility currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Facility currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, facilityCurrency: newValue.label });
                      }}
                      disableClearable
                      name='facilityCurrency'
                      disabled={isView || financingSufficiently.facilityCurrency?.length > 0}
                      value={(CurrencyOptions.length > 0 && financingSufficiently.facilityCurrency) && CurrencyOptions.find((ele) => ele.label === financingSufficiently.facilityCurrency)}
                    />
                    {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Facility Amount"
                      variant="standard"
                      color="warning"
                      name='facilityAmount'
                      value={formateCurrencyValue(financingSufficiently.facilityAmount)}
                      onChange={handleChange}
                      disabled={isView || financingSufficiently.facilityAmount?.length > 0}
                    />
                  </Col>

                  {/* <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option?.label}
                      id="disable-clearable"
                      label="Facility currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Facility currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, facilityCurrency: newValue });
                      }}
                      disableClearable
                      name='facilityCurrency'
                      value={financingSufficiently.facilityCurrency}
                    />
                    {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>}
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Facility Amount"
                      variant="standard"
                      color="warning"
                      name='facilityAmount'
                      value={formateCurrencyValue(financingSufficiently.facilityAmount)}
                      onChange={handleChange}
                    />
                  </Col> */}
                  
                  <Col lg={3}>
                      <TextField
                          label="Loan to collateral value"
                          id="standard-start-adornment"
                          name=''
                          value={((parseInt(financingSufficiently.facilityAmount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, ''))) * 100).toFixed(2)}
                          InputProps={{
                              endAdornment: <InputAdornment position="start">%</InputAdornment>,
                          }}
                  
                      />
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => save(financingSufficiently)} className='footer_next_btn'>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {/* {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />} */}
    </div>
  )
}

export default FinancingSufficientlyModal