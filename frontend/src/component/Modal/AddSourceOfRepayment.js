import { Backdrop, Fade, FormControl, InputLabel, Modal, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
import { Col, Row } from 'react-bootstrap';
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddSourceOfRepayment = ({ show, onHide, getModalData, data, getEditData, isView }) => {

    const [sourceOfRepayment, setSourceOfRepayment] = useState({
        type: "",
        instrument: "",
        evidence: "",
    })
    const [error, setError] = useState({})

    const typeOptions = [
        'Primary',
        'Secondary',
        'Tertiary',
    ]

    const options = [
        'Borrower Cash-flow',
        'Assigned Receivables',
        'Proceeds from L/Cs',
        'Guarantees',
        'SBLCs',
        'Proceeds Performance Bonds',
        'Credit Insurance proceeds',
        'Proceeds from Assigned Contracts',
        'Pledged Cash Deposits',
        'Pledged Bonds/Treasury Deposits'
    ]

    useEffect(() => {
        if (data) {
            setSourceOfRepayment({
                type: data.type,
                instrument: data.instrument,
                evidence: data.evidence,
            })
        }
        console.log('data', data)
    }, [data])

    const validation = () => {
        let flag = false
        let error = {}

        if (!sourceOfRepayment.type) {
            flag = true
            error.type = 'Please enter type'
        }

        if (!sourceOfRepayment.instrument) {
            flag = true
            error.instrument = 'Please enter instrument'
        }

        if (!sourceOfRepayment.evidence) {
            flag = true
            error.evidence = 'Please enter evidence'
        }
        setError(error)
        return flag

    }
    const handleChangeFile = (file) => {
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }).then((res) => setSourceOfRepayment({ ...sourceOfRepayment, evidence: res }));
        }
    }


    const saveData = () => {
        if (validation()) {
            return
        }

        if (data) {
            getEditData({ value: sourceOfRepayment, id: data.tableData.id })
            onHide()
        } else {
            getModalData(sourceOfRepayment)
            onHide()
        }
    }

    // const editData = () => {
    //     console.log('data', data)
    // }

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
                            <h2 id="transition-modal-title" className='modal-title'>Source of Repayment</h2>
                            <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={6}>
                                        <Autocomplete
                                            options={typeOptions}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Type"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setSourceOfRepayment({ ...sourceOfRepayment, type: newValue });
                                            }}
                                            disableClearable
                                            value={sourceOfRepayment.type}
                                            disabled={isView}
                                        />
                                        {error && error.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                    </Col>
                                    <Col lg={6}>
                                        <Autocomplete
                                            // options={sourceOfRepayment.type ? options : [] || data.type && sourceOfRepayment.type}
                                            // options={sourceOfRepayment.type ? options : []}
                                            options={ sourceOfRepayment.type === 'Primary' ? (options.splice(3, 2), options) : options }
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Instrument"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Instrument" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setSourceOfRepayment({ ...sourceOfRepayment, instrument: newValue });
                                            }}
                                            disableClearable
                                            disabled={isView}
                                            value={sourceOfRepayment.instrument}
                                        />
                                        {error && error.instrument && <span style={{ color: 'red' }}>{error.instrument}</span>}
                                    </Col>
                                    {/* <Col lg={4}>
                                        <Autocomplete
                                            // options={sourceOfRepayment.instrument ? options : []}
                                            options={ options }
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Evidence"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Evidence" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setSourceOfRepayment({ ...sourceOfRepayment, evidence: newValue });
                                            }}
                                            disableClearable
                                            disabled={isView}
                                            value={sourceOfRepayment.evidence}
                                        />
                                        {error && error.evidence && <span style={{ color: 'red' }}>{error.evidence}</span>}
                                    </Col> */}
                                    <Col lg={12}>
                                    <div className='drag-and-drop'>
                                                    <label>Upload Evidence</label>
                                                    <DropzoneArea
                                                        Icon="none"
                                                        filesLimit={1}
                                                        showPreviews={true}
                                                        showPreviewsInDropzone={false}
                                                        useChipsForPreview
                                                        previewGridProps={{ container: { spacing: 1, } }}
                                                        dropzoneText='Drop file here'
                                                        previewText=""
                                                        onChange={(file) => handleChangeFile(file[0])}
                                                    />
                                                </div>
                                    {error && error.evidence && <span style={{ color: 'red' }}>{error.evidence}</span>}
                                    </Col>
                                       
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => { saveData() }} className={`footer_next_btn ${isView && 'd-none'}`}>{data ? 'Edit' : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AddSourceOfRepayment