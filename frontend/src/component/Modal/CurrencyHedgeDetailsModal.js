import { Backdrop, Modal, Fade, FormControl, InputLabel, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrencyHedgeDetailsModal = ({ show, onHide, getModalData, editRowData }) => {

    const [currencyHedgeDetails, setCurrencyHedgeDetails] = useState({
        hedgingMethod: "",
        counterParty: "",
    })
    const [id, setId] = useState('')

    const dispatch = useDispatch()
    const [counterpartyOption, setCounterpartyOption] = useState([])

    const counterpartyOptions = useSelector(state => state.entityData.entity)

    useEffect(() => {
        if (counterpartyOptions?.data) {
            setCounterpartyOption(counterpartyOptions?.data)
        }
    }, [counterpartyOptions])

    useEffect(() => {
        dispatch(entityGetAction('Company'))
    }, [])

    useEffect(() => {
        if (editRowData) {
            console.log("editRowData===", editRowData)
            setId(editRowData.tableData.id)
            setCurrencyHedgeDetails({
                hedgingMethod: editRowData?.hedgingMethod,
                counterParty: { value: editRowData?.counterParty?.value, label: editRowData?.counterParty?.label }
            })
        }
    }, [editRowData])

    const hedgingMethodOptions = [
        'Futures',
        'Options',
        'SWAPS',
        'Forwards',
        'Other',
    ]

    const saveData = () => {
        if (editRowData) {
            console.log('id', id)
            getModalData(currencyHedgeDetails, id)
            onHide()
        } else {
            getModalData(currencyHedgeDetails)
            onHide()
        }
    }

    useEffect(() => {
        console.log('currencyHedgeDetails===', currencyHedgeDetails)
        console.log('counterpartyOption==', counterpartyOption)
    }, [currencyHedgeDetails, counterpartyOption])

    return (
        <>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className='model'
                    open={show}
                    onClose={() => onHide()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={show}>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-between'>
                                <h2 id="transition-modal-title" className='modal-title'>Add currency hedge</h2>
                                <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                            </div>
                            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                                <div className='form'>
                                    <Row>
                                        <Col lg={6}>
                                            <Autocomplete
                                                options={hedgingMethodOptions}
                                                getOptionLabel={(option) => option}
                                                id="disable-clearable"
                                                label="Hedging method"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Hedging method" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setCurrencyHedgeDetails({ ...currencyHedgeDetails, hedgingMethod: newValue });
                                                }}
                                                disableClearable
                                                value={currencyHedgeDetails.hedgingMethod}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Autocomplete
                                                options={counterpartyOption}
                                                getOptionLabel={(option) => option?.details?.name}
                                                id="disable-clearable"
                                                label="Counterparty"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Counterparty" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setCurrencyHedgeDetails({ ...currencyHedgeDetails, counterParty: { value: newValue?._id, label: newValue?.details?.name } });
                                                    console.log('newValue._id==', newValue._id)
                                                }}
                                                disableClearable
                                                value={(currencyHedgeDetails.counterParty && counterpartyOption.length > 0) && counterpartyOption.find((elem) => elem._id === currencyHedgeDetails.counterParty?.value)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    <button onClick={() => saveData()} className='footer_next_btn'>{editRowData ? "Edit" : "Save"}</button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default CurrencyHedgeDetailsModal