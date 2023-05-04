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

const KeyParties = ({ hendelCancel, hendelNext, transactionType, getLender, getBorrower }) => {
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
    const [names, setNames] = useState([])
    const [buyers, setBuyer] = useState([])
    const nameOption = useSelector(state => state.entityData.entity)
    const [keyParties, setkeyParties] = useState([{
        'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence': ''
    }])
    const [editMode, setEditMode] = useState(false);
    const [relation, setRelation] = useState();

    const [warehouses, setWarehouses] = useState([])
    const parties = [{
        label: 'Subsidiary',
        value: 'subsidiary',
        prefix: ''
    }, {
        label: 'Owners',
        value: 'owners',
        prefix: ''
    }, {
        label: 'Associate',
        value: 'associate',
        prefix: ''
    },
    {
        label: 'None',
        value: 'none',
        prefix: ''
    }
];
    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    useEffect(() => {
        // console.log('getTransactionByIdData.data?.keyparties',getTransactionByIdData.data?.keyParties[0].relatedParties);
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setTableData(getTransactionByIdData.data.keyParties[0].parties.map((ele) => {
                return {
                    name: { label: ele.name.details.name, value: ele.name._id },
                    type: { label: ele.type.roleName, value: ele.type._id }
                }
            }))
            setEditId(getTransactionByIdData?.data?.keyParties[0]?._id)
            setBorrower_Applicant(getLender.borrower_Applicant)
            setLenders(getBorrower.lenders)
            if (getTransactionByIdData.data?.keyParties[0].relatedParties != undefined && getTransactionByIdData.data?.keyParties[0].relatedParties.length > 0) {
                // console.log('keyparties at useEffect', keyParties);
                setkeyParties(getTransactionByIdData.data?.keyParties[0].relatedParties);
                setEditMode(true);
            }
        }
    }, [getTransactionByIdData])

    useEffect(() => {
        if (nameOption?.data) {
            setNames(nameOption?.data)
        }
    }, [nameOption])

    const partiesEditData = (data, id) => {
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
        let relatedParties = keyParties;
        // console.log(relatedParties);
        // return false;
        let body = {
            ...transactionData,
            keyParties: {
                _id: editId,
                keyParties: tableData.map((ele) => {
                    return {
                        type: ele.type,
                        name: ele.name
                    }
                }),
                relatedParties: relatedParties,
            },
            type: transactionType
        }
        dispatch(transactionDataAction(body))
        hendelNext()
    }

    console.log('keyparties at 118', keyParties);
    console.log(names);

    useEffect(() => {
        let buyer_arr = [];
        let warehouses = [];
        if (names) {
            names.forEach(element => {
                // console.log('element ', element);
                element.roles.forEach(roleDetail => {
                    // console.log('roleDetail', roleDetail);
                    // console.log('roleDetail.roleId.roleName', roleDetail.roleId.roleName);
                    if (roleDetail.roleId.roleName == "Buyer") {
                        var temp = {
                            label: element.details.name,
                            value: element.details.name,
                            prefix: ''
                        };
                        buyer_arr.push(temp);

                        element.warehouses.forEach(warehose => {
                            warehouses.push(warehose);
                        })

                    }
                });

            });
        }
        setBuyer(buyer_arr);
        setWarehouses(warehouses);
    }, [names])

    let temp = keyParties;
    const handleRelation = (e, newValue, ind) => {
        console.log('handleRelation keyParties', keyParties);
        temp[ind].party_relation = newValue.label;
        console.log('handleRelation temp ----->', temp);
        setkeyParties(temp);
        console.log(keyParties);
    }

    const handleBuyer = (e, newValue, ind) => {
        let temp = keyParties;
        temp[ind].buyer = newValue.label;
        setkeyParties(temp);
        console.log('handleBuyer keyParties', keyParties);

    }

    const handleShipper = (e, newValue, ind) => {
        var temp = keyParties;
        temp[ind].shipper = newValue.name;
        setkeyParties(temp);
        console.log('handleBuyer keyParties', keyParties);

    }

    const handleChangeFile = (file, ind) => {
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }).then((res) => {
                var temp = keyParties;
                temp[ind].upload_evidence = { type: 'img', name: file.name, file: res };
                setkeyParties(temp);
            });
        }
        console.log('handleChangeFile keyparties', keyParties);
    }

    const buyer_data_loop = [0];

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
                        {
                            title: 'Borrower/Applicant', render: rowData =>
                                <Row>
                                    <Col lg={12} className="mb-4">
                                        <TextField
                                            label='Borrower/Applicant Name'
                                            variant='standard'
                                            color='warning'
                                            name='borrower_Applicant'

                                            // onChange={(e) => setBorrower_Applicant(e.target.value)}
                                            value={getBorrower}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                        },
                        {
                            title: 'Lender', render: rowData =>
                                <Row>
                                    <Col lg={12} className="mb-4">
                                        <TextField
                                            label='Lenders'
                                            variant='standard'
                                            color='warning'
                                            name='lenders'

                                            // onChange={(e) => setLenders(e.target.value)}
                                            value={getLender}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                        },
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

                    {buyer_data_loop.map((val, ind) => (
                      <>
                      <Row>
                          <Col lg={3}>
                              <div className='d-flex'>
                                  <img src='../../../assets/img/about/Tag.png' style={{ "height": "30px", "top": "22px", "position": "relative" }} />
                                  <Autocomplete
                                      className='ms-3 mb-3 w-100'
                                      options={buyers}
                                      getOptionLabel={(option) => option.label || ""}
                                      id={"disable-clearable-buyer" + ind}
                                      label="Buyer"
                                      renderInput={(params) => (
                                          <TextField {...params} label="Buyer" variant="standard" />
                                      )}
              
                                      getOptionSelected={(option) => option.label === 'test'}
                                      onChange={(event, newValue) => handleBuyer(event, newValue, ind)}
                                      disableClearable
                                  />
                              </div>
                          </Col>
                          <Col lg={3}>
                              {warehouses.map((element) => (
                                  <><div className='d-flex'>
                                      <img src='../../../assets/img/about/Deliver.png' style={{ "height": "30px", "top": "22px", "position": "relative" }} />
                                      <Autocomplete
                                          className='ms-3 mb-3 w-100'
                                          options={warehouses}
                                          getOptionLabel={(option) => option.name}
                                          id={"disable-clearable-shipper-" + ind}
                                          label="Shipper"
                                          renderInput={(params) => (
                                              <TextField {...params} label="Shipper" variant="standard" />
                                          )}
                                          getOptionSelected={(option) => option.name === 'test'}
                                          onChange={(event, newValue) => handleShipper(event, newValue, ind)}
                                          disableClearable
                                      />
                                  </div></>
                              ))}
              
                          </Col>
                          <Col lg={4}>
                              <div className='d-flex align-items-center Related_parties'>
                                  <p className='mb-0 title-color'>Party Relation</p>
                                  <Autocomplete
                                      className='ms-3 mb-3'
                                      options={parties}
                                      getOptionLabel={(option) => option.label}
                                      id={"disable-clearable-relation-party" + ind}
                                      label="Party Relation"
                                      renderInput={(params) => (
                                          <TextField {...params} label="Party Relation" variant="standard" />
                                      )}
                                      getOptionSelected={(option) => option.label === 'test'}
                                      onChange={(event, newValue) => {handleRelation(event, newValue, ind); setRelation(parties)}}
                                      disableClearable
                                  />
                              </div>
              
                          </Col>
                          {relation ? <Col lg={2}>
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
                                      onChange={(file) => handleChangeFile(file[0], ind)}
                                  />
                              </div>
                          </Col> : '' }
                        
                      </Row>
                  </>
                    ))}


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
