import { Backdrop, Fade, Modal, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import TextEditerModal from './TextEditerModal';

const LoanPurposeRiskModal = ({ show, onHide, getModalData, types }) => {

    const [loanPurposeRisk, setLoanPurposeRisk] = useState({
        justification: ""
    })

    const [commentModal, setCommentModal] = useState(false)
    const [type, setType] = useState('')
    const [selectedName, setSelectedName] = useState('')


    const hadleChangeModal = (e) => {
        setLoanPurposeRisk({ ...loanPurposeRisk, justification: e.value })
    }

    const save = (data) => {

        let newData = {
            value: data,
            name: types
        }
        getModalData(newData)
        onHide()
    }

    const handleChnage = (e) => {
        setLoanPurposeRisk({
            ...loanPurposeRisk,
            [e.target.name]: e.target.value
        })
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
                            <h2 id="transition-modal-title" className='modal-title'>Provide a Justification</h2>
                            <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col>
                                        <TextField
                                            label="Justification"
                                            variant="standard"
                                            color="warning"
                                            name='justification'
                                            value={loanPurposeRisk.justification}
                                            multiline
                                            maxRows={3}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setCommentModal(true); setType('Justification'); setSelectedName('justification') }}
                                        />
                                        {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => save(loanPurposeRisk)} className='footer_next_btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />}
        </div>
    )
}

export default LoanPurposeRiskModal