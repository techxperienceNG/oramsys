import { Backdrop, Fade, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CurrencyOptions } from '../../helper/common';

const FinancingSufficientlyModal = ({ show, onHide, getModalData }) => {

  const [financingSufficiently, setFinancingSufficiently] = useState({
    contracCurrency: "",
    contractValue: "",
    facilityCurrency: "",
    facilityAmount: "",
  })

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
              <h2 id="transition-modal-title" className='modal-title'>Justification</h2>
              <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option?.label}
                      id="disable-clearable"
                      label="Contract currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Contract currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, contracCurrency: newValue });
                      }}
                      disableClearable
                      value={financingSufficiently.contracCurrency}
                      name='contracCurrency'
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
                        setFinancingSufficiently({ ...financingSufficiently, facilityCurrency: newValue });
                      }}
                      disableClearable
                      name='facilityCurrency'
                      value={financingSufficiently.facilityCurrency}
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