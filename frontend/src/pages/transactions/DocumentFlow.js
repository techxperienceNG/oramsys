import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { transactionDataAction } from '../../redux/actions/transactionDataAction';
import { useLocation } from 'react-router-dom';

const DocumentFlow = ({ hendelCancel, hendelNext }) => {

    const dispatch = useDispatch()

    const [documentFlow, setdocumentFlow] = useState({
        _id: "",
        documentRemittance: "",
        details: ""
    })
    const [error, setError] = useState({})
    const location = useLocation()
    const isView = location?.state[2]?.isView

    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    const disableClearableOptions = [
        "Approved electronic method",
        "Courier",
        "Hand delivery",
        "Other",
    ];

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setdocumentFlow({
                _id: getTransactionByIdData.data?.documentFlow?._id,
                documentRemittance: getTransactionByIdData.data?.documentFlow?.documentRemittance,
                details: getTransactionByIdData.data?.documentFlow?.details,
            })
        }
    }, [getTransactionByIdData])

    const validation = () => {
        let flag = false
        let error = {}

        if (!documentFlow.documentRemittance) {
            flag = true
            error.documentRemittance = 'Please enter document remittance'
        }

        if (documentFlow.documentRemittance === "Approved electronic method" && !documentFlow.details) {
            flag = true
            error.details = 'Please enter details'
        }
        setError(error)
        return flag
    }



    const next = () => {
        if (validation()) {
            return
        }
        let body = {
            ...transactionData,
            documentFlow
        }
        dispatch(transactionDataAction(body))
        hendelNext()
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h5 className="title-color">Document flow</h5>
                    <Row>
                        <Col lg={documentFlow.documentRemittance === "Approved electronic method" ? 6 : 12}>
                            <Autocomplete
                                options={disableClearableOptions}
                                getOptionLabel={(option) => option}
                                id="disable-clearable"
                                label="Document remittance"
                                renderInput={(params) => (
                                    <TextField {...params} label="Document remittance" variant="standard" />
                                )}
                                onChange={(event, newValue) => {
                                    setdocumentFlow({ ...documentFlow, documentRemittance: newValue });
                                }}
                                disableClearable
                                disabled={isView}
                                value={(disableClearableOptions.length > 0 && documentFlow.documentRemittance) && disableClearableOptions.find((ele) => ele === documentFlow.documentRemittance)}
                            />
                            {error && error?.documentRemittance && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.documentRemittance}</span>}
                        </Col>
                        {
                            documentFlow.documentRemittance === "Approved electronic method" &&
                            <Col lg={6}>
                                <TextField
                                    label="Details"
                                    variant="standard"
                                    color="warning"
                                    value={documentFlow.details}
                                    name="details"
                                    disabled={isView}
                                    onChange={(e) => setdocumentFlow({ ...documentFlow, details: e.target.value })}
                                />
                                {error && error?.details && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.details}</span>}
                            </Col>
                        }
                         {
                            documentFlow.documentRemittance === "Other" &&
                            <Col lg={6}>
                                <TextField
                                    label="Details"
                                    variant="standard"
                                    color="warning"
                                    value={documentFlow.details}
                                    name="details"
                                    disabled={isView}
                                    onChange={(e) => setdocumentFlow({ ...documentFlow, details: e.target.value })}
                                />
                                {error && error?.details && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.details}</span>}
                            </Col>
                        }
                    </Row>
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
        </>
    )
}

export default DocumentFlow