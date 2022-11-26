import { Backdrop, Fade, FormControl, InputLabel, Modal, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { entityGetAction } from '../../redux/actions/entityAction';
import { useSelector, useDispatch } from 'react-redux';

const LCPartiesModal = ({ show, onHide, addParties, data }) => {

    const [lcParties, setLcParties] = useState({
        applicant: "",
        issuingBank: "",
        beneficiary: "",
        advisingBank: "",
        conformingBank: "",
        negotiatingBank: "",
        secondBeneficiary: "",
        reimbursingBank: "",
    })

    const dispatch = useDispatch()
    const [applicant, setApplicant] = useState([])

    const applicants = useSelector(state => state.entityData.entity)

    useEffect(() => {
        if (applicants && applicants.data) {
            setApplicant(applicants.data)
        }
    }, [applicants])

    useEffect(() => {
        if (data) {
            setLcParties({
                applicant: data.applicant,
                issuingBank: data.issuingBank,
                beneficiary: data.beneficiary,
                advisingBank: data.advisingBank,
                conformingBank: data.conformingBank,
                negotiatingBank: data.negotiatingBank,
                secondBeneficiary: data.secondBeneficiary,
                reimbursingBank: data.reimbursingBank,
            })
        }
    }, [data])

    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [])

    const saveData = () => {
        addParties(lcParties)
        onHide()
    }

    return (
        <>
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
                                <h2 id="transition-modal-title" className='modal-title'>Add letter of credit</h2>
                                <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                            </div>
                            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                                <div className='form pt-2'>
                                    <h2>Contract value</h2>
                                    <Row>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Applicant"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Applicant" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, applicant: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.applicant?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Issuing bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Issuing bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, issuingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.issuingBank?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Beneficiary"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Beneficiary" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, beneficiary: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.beneficiary?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Advising bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Advising bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, advisingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.advisingBank?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Conforming bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Conforming bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, conformingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.conformingBank?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Negotiating bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Negotiating bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, negotiatingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.negotiatingBank?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Second beneficiary"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Second beneficiary" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, secondBeneficiary: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.secondBeneficiary?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={applicant}
                                                getOptionLabel={(option) => option.details?.name}
                                                id="disable-clearable"
                                                label="Reimbursing bank"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Reimbursing bank" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setLcParties({ ...lcParties, reimbursingBank: { value: newValue._id, label: newValue.details?.name } });
                                                }}
                                                disableClearable
                                                value={(applicant.length && lcParties?.reimbursingBank?.value) && applicant.find(item => item._id === lcParties.applicant.value)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    <button onClick={() => saveData()} className='footer_next_btn'>Save</button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default LCPartiesModal