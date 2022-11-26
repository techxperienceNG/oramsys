import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import RatingModal from '../../../../component/Modal/RatingModal'
import { useSelector, useDispatch } from 'react-redux';
import { companydataAction } from '../../../../redux/actions/companydataAction';
import { ratingAgenciesAction } from '../../../../redux/actions/ratingAgenciesAction';
import { useLocation } from 'react-router-dom';

const Ratings = ({ hendelNext, hendelCancel }) => {

    const dispatch = useDispatch()
    const [editModal, setEditModal] = useState(false)
    const [mode, setMode] = useState("")
    const [rating, setRating] = useState([])
    const [editData, setEditData] = useState('')
    const location = useLocation()
    const isView = location.state[1]?.isView

    const companyData = useSelector((state) => state.companydata.companydata)
    const agencyData = useSelector((state) => state.ratingAgenciesData.ratingAgencies)

    useEffect(() => {
        dispatch(ratingAgenciesAction())
    }, [ratingAgenciesAction])

    useEffect(() => {
        if (companyData && companyData.ratings && agencyData?.data) {
            setRating(companyData.ratings.map((ele) => {
                return {
                    agency: agencyData.data.find((item) => item._id === ele.agency)?.name,
                    rating: agencyData.data.find((item) => item._id === ele.agency)?.ratingSchema?.find((elem) => elem._id === ele.rating)?.grade,
                    dateOfRating: ele.dateOfRating,
                    expiryDate: ele.expiryDate,
                }
            }))
        }
    }, [companyData, agencyData])

    const Delete = (data) => {
        let body = {
            ...companyData,
            ratings: companyData.ratings.filter((e, i) => i !== data.tableData.id)
        }
        dispatch(companydataAction(body))
    }

    return (
        <>
            <div className='add-edit-product'>
                <div className='product'>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h2 className='m-0'>Entities</h2>
                        <button className={`add_btn me-3 ${isView ? 'd-none' : 'd-block'}`} onClick={() => { setEditModal(true); setMode("Add") }}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                    </div>
                    <MaterialTable
                        title=""
                        columns={[
                            { title: 'Agency', field: 'agency' },
                            { title: 'Rating', field: 'rating' },
                            { title: 'Date of rating', field: 'dateOfRating', type: "date" },
                            { title: 'Expiry date', field: 'expiryDate', type: "date" },
                        ]}
                        data={rating}
                        actions={isView ? [
                            {
                                icon: 'preview',
                                tooltip: 'View Rating',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                        ] : [
                            {
                                icon: 'edit',
                                tooltip: 'Edit Rating',
                                onClick: (e, data) => { setEditModal(true); setMode("Edit"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'preview',
                                tooltip: 'View Rating',
                                onClick: (e, data) => { setEditModal(true); setMode("View"); setEditData(data.tableData.id) }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Rating',
                                onClick: (e, data) => { Delete(data) }
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
                    <button onClick={() => { companyData?.ratings?.length > 0 && hendelNext() }} className='footer_next_btn'> Next</button>
                </div>
            </div>
            {
                editModal && <RatingModal show={editModal} onHide={() => setEditModal(false)} mode={mode} editData={editData} />
            }
        </>
    )
}

export default Ratings