import { Backdrop, Fade, FormControl, InputLabel, Modal, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { entitiesRoleAction } from '../../redux/actions/entitiesRoleAction';
import { entityGetAction } from '../../redux/actions/entityAction';
import AddEntityModal from './AddEntityModal';

const PartiesEditModal = ({ show, onHide, getModalData, isView, editData }) => {

    const dispatch = useDispatch()
    const [parties, setParties] = useState({
        name: "",
        type: ""
    })
    const [types, setTypes] = useState([])
    const [names, setNames] = useState([])
    const [error, setError] = useState({})
    const [addentity, setAddentity] = useState(false)

    const typeOptions = useSelector(state => state.entityRoleData.entityRole)
    const nameOption = useSelector(state => state.entityData.entity)

    useEffect(() => {
        dispatch(entitiesRoleAction())
        dispatch(entityGetAction('Company'))
    }, [])

    useEffect(() => {
        if (typeOptions?.data) {
            setTypes(typeOptions?.data)
        }
    }, [typeOptions])

    useEffect(() => {
        if (nameOption?.data) {
            setNames(nameOption?.data)
        }
    }, [nameOption])

    useEffect(() => {
        if (editData) {
            setParties({
                name: { value: editData.name.value, label: editData.name.label },
                type: { value: editData.type.value, label: editData.type.label },
            })
        }
    }, [editData])


    const validation = () => {
        let flag = false
        let error = {}

        if (!parties.type) {
            flag = true
            error.type = 'Please enter type!'
        }

        if (!parties.name) {
            flag = true
            error.name = 'Please enter name!'
        }
        setError(error)
        return flag
    }

    useEffect(() => {
        console.log('isView', isView)
        console.log('editData', editData)
        console.log('names', names)
    }, [isView, editData, names])


    const saveData = () => {
        if (validation()) {
            return
        }
        if (editData) {
            let id = editData.tableData.id
            getModalData(parties, id)
            onHide()
        } else {
            getModalData(parties)
            onHide()
        }
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
                        <div className='d-flex justify-content-end'>
                            {/* <h2 id="transition-modal-title" className='modal-title'>Edit Licence</h2> */}
                            <img src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={12} className="mb-4">
                                        <Autocomplete
                                            options={types}
                                            getOptionLabel={(option) => option.roleName}
                                            id="disable-clearable"
                                            label="Type"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            disabled={isView}
                                            onChange={(event, newValue) => {
                                                setParties({ ...parties, type: { value: newValue._id, label: newValue.roleName } });
                                            }}
                                            value={(types && parties.type) && types.find((ele) => ele._id === parties.type?.value)}
                                            disableClearable
                                        />
                                        {error && error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.type}</span>}
                                    </Col>
                                    <Col lg={12} className="mb-4">
                                        <Autocomplete
                                            options={names}
                                            getOptionLabel={(option) => option.details ? option.details?.name : ""}
                                            id="disable-clearable"
                                            label="Party"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Name" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setParties({ ...parties, name: { value: newValue._id, label: newValue.details?.name } });
                                            }}
                                            disabled={isView}
                                            value={(names && parties.name) && names.find((ele) => ele._id === parties.name?.value)}
                                            disableClearable
                                        />
                                        {error && error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    {!names.length && <button button onClick={() => setAddentity(true)} className="footer_next_btn ms-2">Add entity</button>}
                                </div>
                                <button onClick={() => saveData()} className={`footer_next_btn ${isView && 'd-none'}`}>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {addentity && <AddEntityModal show={addentity} onHide={() => setAddentity(false)} />}
        </div >
    )
}

export default PartiesEditModal