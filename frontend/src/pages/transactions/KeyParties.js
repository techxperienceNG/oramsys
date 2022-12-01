import { TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import PartiesEditModal from '../../component/Modal/PartiesEditModal'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyOptions } from "../../helper/common"
import { transactionDataAction } from '../../redux/actions/transactionDataAction'

const KeyParties = ({ hendelCancel, hendelNext, transactionType }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [showEditModal, setShowEditModal] = useState(false)
    const [tableData, setTableData] = useState([])
    const [rowEditData, setRowEditData] = useState('')
    const [editId, setEditId] = useState('')
    const location = useLocation()
    const isView = location?.state[2]?.isView
    const [view, setView] = useState()
    const [borrower_Applicant, setBorrower_Applicant] = useState("")
    const [lenders, setLenders] = useState("")
    const [error, setError] = useState({})
    const [keyParties, setkeyParties] = useState({
        documentRemittance: ""
    })

    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setTableData(getTransactionByIdData.data.keyParties[0].parties.map((ele) => {
                return {
                    name: { label: ele.name.details.name, value: ele.name._id },
                    type: { label: ele.type.roleName, value: ele.type._id }
                }
            }))
            setEditId(getTransactionByIdData?.data?.keyParties[0]?._id)
            setBorrower_Applicant(getTransactionByIdData.data?.borrower_Applicant)
            setLenders(getTransactionByIdData.data?.lenders)
            setkeyParties(getTransactionByIdData.data?.documentRemittance)
        }
    }, [getTransactionByIdData])

    const partiesEditData = (data, id) => {
        console.log('id ==', id)
        console.log('data ==', data)

        if (id !== undefined) {
            setTableData(
                tableData.map((ele, i) => {
                    if (id === i) {
                        return data
                    } else {
                        return ele
                    }
                })
            )
            setRowEditData('')
        } else {
            setTableData([...tableData, data])
        }
    }
    

    const next = () => {
        let body = {
            ...transactionData,
            keyParties: {
                _id: editId,
                keyParties: tableData.map((ele) => {
                    return {
                        type: ele.type,
                        name: ele.name
                    }
                })
            },
            type: transactionType
        }
        dispatch(transactionDataAction(body))
        hendelNext()
    }
    // const options = [
    //     "Afghanistan",
    //     "Albania",
    //     "Algeria",
    //     "Andorra",
    //     "Angola",
    //     "Antigua",
    //     "Argentina",
    //     "India",
    // ];

    return (
        <>
            <div className='product'>
           
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <h5 className="title-color">Parties</h5>
                    <button className={`add_btn me-3 ${isView ? 'd-none' : 'd-block'}`} onClick={() => { setShowEditModal(!showEditModal) }}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                </div>
                <MaterialTable
                    title=""
                    columns={[
                        { title: 'Name', field: 'name.label' },
                        { title: 'Label', field: 'type.label' },
                    ]}
                    data={tableData}
                    actions={isView ? [{
                        icon: 'preview',
                        tooltip: 'View Product',
                        onClick: (event, rowData) => { setShowEditModal(!showEditModal); setRowEditData(rowData); setView(isView) }
                    }] : [
                        {
                            icon: 'edit',
                            tooltip: 'Edit Product',
                            onClick: (event, rowData) => { setRowEditData(rowData); setShowEditModal(!showEditModal); console.log('rowData ==', rowData) }
                        },
                        {
                            icon: 'preview',
                            tooltip: 'View Product',
                            onClick: (event, rowData) => { setShowEditModal(!showEditModal); setRowEditData(rowData) }
                        }
                    ]}
                    options={{
                        filtering: true,
                        actionsColumnIndex: -1,
                        sorting: true,
                        pageSize: 10,
                        search: false,
                        emptyRowsWhenPaging: false,
                    }}
                />
            </div>
            <div className='add-edit-product parties_main'>
                <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                    <h5 className="title-color">Related parties</h5>
                    <Row>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Tag.png' />
                                <p className='mb-0 ms-4'>Buyer 1</p>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Deliver.png' />
                                <p className='mb-0 ms-4'>Shipper 1</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='d-flex align-items-center Related_parties'>
                                <p className='mb-0 title-color'>Relation</p>
                                <Autocomplete
                                    className='ms-3 mb-3'
                                    options={CurrencyOptions}
                                    getOptionLabel={(option) => option.label}
                                    id="disable-clearable"
                                    label="Contract currency"
                                    value={CurrencyOptions && setkeyParties?.documentRemittance && CurrencyOptions.find(
                                        (ele) => ele.label === setkeyParties.documentRemittance
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Contract currency" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setkeyParties({ ...keyParties, documentRemittance: newValue.label });
                                    }}
                                    disableClearable
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='drag-and-drop'>
                                <DropzoneArea
                                    Icon="none"
                                    filesLimit={1}
                                    showPreviews={true}
                                    showPreviewsInDropzone={false}
                                    useChipsForPreview
                                    previewGridProps={{ container: { spacing: 1, } }}
                                    dropzoneText='Upload Evidence'
                                    previewText=""
                                    onChange={(files) => console.log('Files:', files)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Deliver.png' />
                                <p className='mb-0 ms-4'>Buyer 1</p>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Deliver.png' />
                                <p className='mb-0 ms-4'>Shipper 1</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='d-flex align-items-center Related_parties'>
                                <p className='mb-0 title-color'>Relation</p>
                                <Autocomplete
                                    className='ms-3 mb-3'
                                    options={CurrencyOptions}
                                    getOptionLabel={(option) => option.label}
                                    id="disable-clearable"
                                    label="Contract currency"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Contract currency" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setkeyParties({ ...keyParties, documentRemittance: newValue.label });
                                    }}
                                    disableClearable
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='drag-and-drop'>
                                <DropzoneArea
                                    Icon="none"
                                    filesLimit={1}
                                    showPreviews={true}
                                    showPreviewsInDropzone={false}
                                    useChipsForPreview
                                    previewGridProps={{ container: { spacing: 1, } }}
                                    dropzoneText='Upload Evidence'
                                    previewText=""
                                    onChange={(files) => console.log('Files:', files)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Tag.png' />
                                <p className='mb-0 ms-4'>Buyer 1</p>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Deliver.png' />
                                <p className='mb-0 ms-4'>Shipper 1</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='d-flex align-items-center Related_parties'>
                                <p className='mb-0 title-color'>Relation</p>
                                <Autocomplete
                                    className='ms-3 mb-3'
                                    options={CurrencyOptions}
                                    getOptionLabel={(option) => option.label}
                                    id="disable-clearable"
                                    label="Contract currency"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Contract currency" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setkeyParties({ ...keyParties, documentRemittance: newValue.label });
                                    }}
                                    disableClearable
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='drag-and-drop'>
                                <DropzoneArea
                                    Icon="none"
                                    filesLimit={1}
                                    showPreviews={true}
                                    showPreviewsInDropzone={false}
                                    useChipsForPreview
                                    previewGridProps={{ container: { spacing: 1, } }}
                                    dropzoneText='Upload Evidence'
                                    previewText=""
                                    onChange={(files) => console.log('Files:', files)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Tag.png' />
                                <p className='mb-0 ms-4'>Buyer 1</p>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className='d-flex'>
                                <img src='../../../assets/img/about/Deliver.png' />
                                <p className='mb-0 ms-4'>Shipper 1</p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='d-flex align-items-center Related_parties'>
                                <p className='mb-0 title-color'>Relation</p>
                                <Autocomplete
                                    className='ms-3 mb-3'
                                    options={CurrencyOptions}
                                    getOptionLabel={(option) => option.label}
                                    id="disable-clearable"
                                    label="Contract currency"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Contract currency" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setkeyParties({ ...keyParties, documentRemittance: newValue.label });
                                    }}
                                    disableClearable
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='drag-and-drop'>
                                <DropzoneArea
                                    Icon="none"
                                    filesLimit={1}
                                    showPreviews={true}
                                    showPreviewsInDropzone={false}
                                    useChipsForPreview
                                    previewGridProps={{ container: { spacing: 1, } }}
                                    dropzoneText='Upload Evidence'
                                    previewText=""
                                    onChange={(files) => console.log('Files:', files)}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='footer_'>
                <button onClick={() => { transactionType === "Export" ? hendelCancel() : navigate('/transactions') }} className="footer_cancel_btn">cancel</button>
                <button onClick={() => { tableData.length > 0 && next() }} className='footer_next_btn'> Next</button>
            </div>

            {showEditModal && <PartiesEditModal show={showEditModal} onHide={() => { setShowEditModal(false); setRowEditData('') }} getModalData={(e, id) => partiesEditData(e, id)} editData={rowEditData} isView={view} />}
        </>
    )
}

export default KeyParties