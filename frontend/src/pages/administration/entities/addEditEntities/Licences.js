import MaterialTable from 'material-table'
import { TextField } from "@material-ui/core"
import React, {useEffect, useState} from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete"
import LicencesEditModal from '../../../../component/Modal/LicencesEditModal'
import {useSelector, useDispatch} from 'react-redux'
import {companydataAction} from '../../../../redux/actions/companydataAction'
import moment from 'moment';
import {Col, Row} from "react-bootstrap"
import {useLocation} from 'react-router-dom'

const Licences = ({ hendelNext, hendelCancel }) => {

    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const dispatch = useDispatch()
    const [licenceTable, setLicenceTable] = useState([])
    const [editData, setEditData] = useState('')
    const location = useLocation()
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)
    const countryData = useSelector((state) => state.countryData.country)

    useEffect(() => {
        if (companyData && companyData.licenses && countryData?.data) {
            setLicenceTable(companyData.licenses.map((ele) => {
                return {
                    type: ele.type,
                    number: ele.number,
                    authority: ele.authority,
                    country: countryData.data.find((item) => item._id === ele.country)?.name,
                    dateofrating: moment(ele.dateOfRating).format("YYYY-MM-DD"),
                    expirydate: moment(ele.expiryDate).format("YYYY-MM-DD"),
                }
            }))
        }
    }, [companyData, countryData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            licenses: companyData.licenses.filter((ele, i) => i !== data.tableData.id)
        }
        dispatch(companydataAction(body))
    }

    const handleOption = (value) => {
        let body = {
            ...companyData,
            isLicense: value,
        }
        dispatch(companydataAction(body))
    }

    let options = [
        { label: "Select option", value: "" },
        { label: "Yes", value: true },
        { label: "No", value: false },
    ]

    return (
        <>
            <div className='add-edit-product'>
                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h2 className='m-0'>Licences</h2>
                        {companyData.isLicense && <button className={`add_btn me-3 ${isView ? 'd-none' : 'd-block'}`} onClick={() => {
                            setEditModal(true);
                            setMode("Add")
                        }}><img src='../../assets/img/about/plus.png' className='me-2'/>Add</button>}
                    </div>
                    <div className='drop-down-container'>
                        <div className='form'>
                            <Row>
                                <Col lg={3}>
                                    <Autocomplete
                                        label='Do you want to add licenses?'
                                        id='disable-clearable'
                                        onChange={(e, newVal) => {
                                            handleOption(newVal?.value)
                                        }}
                                        getOptionLabel={(option) => option.label || ""}
                                        options={options}
                                        value={
                                            ((options.length > 0 &&
                                                    companyData.isLicense === true) ||
                                                companyData.isLicense === false) ?
                                                options.find(
                                                    (ele) => ele.value === companyData.isLicense
                                                ) : options = ''
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label='Do you want to add licenses?'
                                                variant='standard'
                                            />
                                        )}
                                    />
                                </Col>

                            </Row>
                        </div>
                    </div>
                    {companyData.isLicense && <MaterialTable
                        title=""
                        columns={[
                            {title: 'Type', field: 'type'},
                            {title: 'Number', field: 'number'},
                            {title: 'Authority', field: 'authority'},
                            {title: 'Country', field: 'country'},
                            {title: 'Date Of Rating', field: 'dateofrating'},
                            {title: 'Expiry Date', field: 'expirydate'},
                        ]}
                        data={licenceTable}
                        actions={isView ? [{
                            icon: 'preview',
                            tooltip: 'View Licences',
                            onClick: (e, data) => {
                                setEditModal(true);
                                setEditData(data.tableData.id);
                                setMode("View")
                            }
                        },] : [
                            {
                                icon: 'edit',
                                tooltip: 'Edit Licences',
                                onClick: (e, data) => {
                                    setEditModal(true);
                                    setEditData(data.tableData.id);
                                    setMode("Edit")
                                }
                            },
                            {
                                icon: 'preview',
                                tooltip: 'View Licences',
                                onClick: (e, data) => {
                                    setEditModal(true);
                                    setEditData(data.tableData.id);
                                    setMode("View")
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Licences',
                                onClick: (e, data) => {
                                    Delete(data)
                                }
                            }
                        ]}
                        options={{
                            filtering: true,
                            actionsColumnIndex: -1,
                            sorting: true,
                            pageSize: 10,
                            search: false,
                        }}
                    />}
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { ((companyData?.licenses?.length > 0 && companyData.isLicense) || companyData.isLicense === false) && hendelNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
            {
                editModal && <LicencesEditModal show={editModal} onHide={() => { setEditModal(false); setEditData(''); setMode('') }} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Licences