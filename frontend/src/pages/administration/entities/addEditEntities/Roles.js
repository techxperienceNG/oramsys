import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import ApprovalRole from '../../../../component/Modal/ApprovalRole'
import RoleEditModal from '../../../../component/Modal/RoleEditModal'
import { useSelector, useDispatch } from 'react-redux';
import { companydataAction } from '../../../../redux/actions/companydataAction'
import { editEntityAction, entityAddAction } from '../../../../redux/actions/entityAction';
import { COMPANY_DATA, EDIT_ENTITY, ENTITY_ADD, ENTITY_GET_BY_ID } from '../../../../redux/types';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { entitiesRoleAction } from '../../../../redux/actions/entitiesRoleAction';

const Roles = ({ hendelNext, hendelCancel }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const isView = location.state[1]?.isView

    const [editModal, setEditModal] = useState(false)
    const [approval, setApproval] = useState(false)
    const [roles, setRoles] = useState([])
    const [mode, setMode] = useState("")
    const [editData, setEditData] = useState('')
    const [loading, setLoading] = useState(false)

    const companyData = useSelector((state) => state.companydata.companydata)
    const entityAddData = useSelector((state) => state.entityData.entityAdd)
    const editEntityData = useSelector((state) => state.entityData.entityUpdate)
    const rolesData = useSelector(state => state.entityRoleData.entityRole)

    useEffect(() => {
        dispatch(entitiesRoleAction())
    }, [])

    useEffect(() => {
        if (companyData && companyData.roles && rolesData?.data) {
            setRoles(companyData.roles.map((ele) => {
                return {
                    roles: rolesData?.data.find((item) => item._id === ele.roles)?.roleName,
                    justification: ele.justification
                }
            }))
        }
    }, [companyData, rolesData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            roles: companyData.roles.filter((e, i) => i !== data.tableData.id)
        }
        dispatch(companydataAction(body))
    }

    const Save = async () => {
        delete companyData.detail._id
        delete companyData.financial._id
        const body = {
            email: companyData.email,
            password: companyData.password,
            type: companyData.type,
            detail: companyData.detail,
            addresses: companyData.addresses.map((ele) => {
                delete ele._id
                return ele
            }),
            financial: companyData.financial,
            licenses: companyData.licenses.map((ele) => {
                delete ele._id
                return ele
            }),
            ratings: companyData.ratings.map((ele) => {
                delete ele._id
                return ele
            }),
            warehouses: companyData.warehouses.map((ele) => {
                delete ele._id
                return ele
            }),
            roles: companyData.roles.map((ele) => {
                delete ele._id
                return ele
            }),
        }
        setLoading(true)
        await dispatch(entityAddAction(body))
        setLoading(false)
    }

    useEffect(() => {
        if (entityAddData && entityAddData.status === 200) {
            navigate('/entities')
            dispatch({
                type: ENTITY_ADD,
                payload: []
            })
            toast.success(entityAddData.message);
        }
    }, [entityAddData])

    const edit = async () => {
        const body = {
            email: companyData.email,
            password: companyData.password,
            type: companyData.type,
            detail: companyData.detail,
            addresses: companyData.addresses,
            financial: companyData.financial,
            licenses: companyData.licenses,
            ratings: companyData.ratings,
            warehouses: companyData.warehouses,
            roles: companyData.roles,
            isLicense: companyData.isLicense || false,
            isRatings: companyData.isRatings || false,
            isWarehouse: companyData.isWarehouse || false,
        }
        setLoading(true)
        await dispatch(editEntityAction(id, body))
        setLoading(false)
        navigate('/entities')

    }

    useEffect(() => {
        if (editEntityData && editEntityData.status === 200) {
            navigate('/entities')
            dispatch({
                type: EDIT_ENTITY,
                payload: []
            })
            // dispatch({
            //     type: ENTITY_GET_BY_ID,
            //     payload: []
            // })
            // dispatch({
            //     type: COMPANY_DATA,
            //     payload: [],
            // });
            toast.success(editEntityData.message);
        }
    }, [editEntityData])

    return (
        <>
            <div className='add-edit-product'>
                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h2 className='m-0'>Roles</h2>
                        <button className={`add_btn me-3 ${isView ? 'd-none' : 'd-block'}`} onClick={() => { setEditModal(true); setMode("Add") }}> <img src='../../assets/img/about/plus.png' className='me-2' alt='' />Add</button>
                    </div>
                    <MaterialTable
                        title=""
                        columns={[
                            { title: 'Role', field: 'roles' },
                            { title: 'Justification', field: 'justification', render: rowData => <>{ReactHtmlParser(rowData.justification)}</> },
                        ]}
                        data={roles}
                        actions={isView ? [
                            {
                                icon: 'preview',
                                tooltip: 'View Role',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                        ] : [
                            {
                                icon: 'edit',
                                tooltip: 'Edit Role',
                                onClick: (e, data) => { setEditModal(true); setMode("Edit"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'preview',
                                tooltip: 'View Role',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Role',
                                onClick: (e, data) => { Delete(data) }
                            },
                            {
                                icon: 'check',
                                tooltip: 'Approval Role',
                                onClick: () => setApproval(true)
                            }
                        ]}
                        options={{
                            filtering: true,
                            actionsColumnIndex: -1,
                            sorting: true,
                            pageSize: 10,
                            search: false,
                        }}
                    />
                </div>


                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => id ? edit() : Save()} className={`footer_next_btn ${isView ? 'd-none' : 'd-block'}`}>
                    {!loading ? <>{id ? "Edit" : "Save"}</> : null}
                        {loading && <div class="d-flex justify-content-center">
                        <strong className='me-2'>Saving...</strong>
                            <div className="spinner-border spinner-border-sm mt-1" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                    </button>
                </div>
            </div>
            {
                editModal && <RoleEditModal show={editModal} onHide={() => setEditModal(false)} mode={mode} editData={editData} />
            }
            {
                approval && <ApprovalRole show={approval} onHide={() => setApproval(false)} />
            }
        </>
    )
}

export default Roles