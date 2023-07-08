import MaterialTable from 'material-table'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import EntitiesRoleAddModal from '../../component/Modal/EntitiesRoleAddModal'
import {entitiesRoleAction, entityRoleDeleteAction} from '../../redux/actions/entitiesRoleAction'

const EntitiesRole = () => {

    const [entityRole, setEntityRole] = useState([])
    const [addEntityModal, setAddEntityModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [formType, setFormType] = useState('add')
    const [rowData, setRowData] = useState({})
    const dispatch = useDispatch()

    const entityRoleData = useSelector(state => state.entityRoleData.entityRole)
    useEffect(() => {
        if (!addEntityModal || isDelete || isAdd) {
            setIsDelete(false)
            setIsAdd(false)
            dispatch(entitiesRoleAction());
        }
    }, [addEntityModal, dispatch, isDelete, isAdd]);

    useEffect(() => {
        setEntityRole(entityRoleData);
    }, [entityRoleData]);

    const handleAdd = () => {
        setRowData({})
        setFormType('add');
        setAddEntityModal(true);
    };

    const handleDelete = (rowData) => {
        dispatch(entityRoleDeleteAction(rowData._id));
        setIsDelete(true);
    };

    const cardData = [
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "EXP. PHYSICAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "IMPORT FINANCIAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "IMPORT FINANCIAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "IMPORT FINANCIAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
        {
            label: "IMPORT FINANCIAL",
            product: "Frozen Concentrated Orange Juice",
            type: "COMMODITY"
        },
    ]
    return (
        <>
            <div className='add-edit-product'>
                {/* <h1 className=''>RatingAgencies</h1> */}
                <div className='product p-0'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h5 className="title-color">Entities Role</h5>
                        <button className='add_btn me-3' onClick={() => handleAdd()}><img
                            src='../../assets/img/about/plus.png' className='me-2' alt=''/>Add
                        </button>
                    </div>
                    {/* <Row>
          {ratingSchemesCard.map((item) => (
            <Col xxl={3} xl={4} lg={6} md={4} sm={6}>
              <RatingSchemesCard value={item.value} />
            </Col>
          ))}
        </Row> */}
                    <MaterialTable
                        title=""
                        columns={[
                            {title: 'Grade', field: 'roleName'},
                            // { title: 'Value', field: 'product' },
                            // { title: 'Acceptable', field: 'type' },
                            // { title: 'Comments', field: 'comments' },
                        ]}
                        data={entityRole?.data}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Role',
                                onClick: (e, rowData) => {
                                    setFormType('edit');
                                    setAddEntityModal(true);
                                    setRowData(rowData)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Role',
                                onClick: (e, rowData) => {
                                    handleDelete(rowData)
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
                    />

                </div>
                {/* <div className='footer_'>
                    <button onClick={() => { }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { }} className='footer_next_btn'>Save</button>
                </div> */}
            </div>
            {addEntityModal &&
            <EntitiesRoleAddModal formType={formType} data={rowData} show={addEntityModal} onHide={() => {
                setAddEntityModal(false);
                if (formType === 'add') {
                    setIsAdd(true)
                }
            }}/>}
        </>
    )
}

export default EntitiesRole