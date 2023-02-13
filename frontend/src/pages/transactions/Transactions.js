import React, { useEffect, useState, useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Transactionscard from '../../component/Transactionscard'
import MaterialTable from 'material-table';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { getAllTransaction } from '../../redux/actions/transactionDataAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getRiskAssessment, riskAssessmentAction } from '../../redux/actions/riskAssessmentAction';
import ExcelModal from '../../component/Modal/ExcelModal';
import { ApiGet, ApiGet2 } from '../../helper/API/ApiData';
import { Button, Icon } from '@material-ui/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GET_TRANSACTION_BY_ID } from '../../redux/types';
import Skeleton from 'react-loading-skeleton'
const Transactions = () => {

    const dispatch = useDispatch()
    const [showspan, setShowspan] = useState(false)
    const [selected, setSelected] = useState('')
    const [showExcelModal, setShowExcelModal] = useState(false)
    const [sendId, setSendId] = useState()

    const navigate = useNavigate()
    const [showSubData, setShowSubData] = useState(false)
    const [transaction, setTransaction] = useState([])

    const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
    const riskAssessment = useSelector((state) => state.riskAssessmentData.getRiskAssessment)

    useEffect(() => {
        let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
        dispatch(getAllTransaction(id))
    }, [])

    const refreshPage = useCallback(() => {
        if (getAlltransactionData && getAlltransactionData.data && getAlltransactionData.data.length > 0) {
            setTransaction(getAlltransactionData.data?.map(item => {
                return {
                    ...item,
                    details: {
                        ...item?.details,
                        shippingOptions: {
                            ...item?.details?.shippingOptions,
                            portOfOrigin: item?.details?.shippingOptions?.portOfOrigin ?? item?.details?.shippingOptions?.airbaseOfOrigin,
                            destinationPort: item?.details?.shippingOptions?.destinationPort ?? item?.details?.shippingOptions?.destinationAirbase
                        }
                    }
                }
            }))
        }
    }, [getAlltransactionData])

    useEffect(() => {
        dispatch(() => refreshPage())
        //eslint-disable-next-line
    }, [])

    // const cllickOnRiskAssessment = (id) => {
    //     dispatch(getRiskAssessment(id))
    //     setSelected(id)
    // }
    useEffect(() => {
        if (riskAssessment.status === 200 && selected) {
            // if (riskAssessment && riskAssessment.data && riskAssessment.data.transactionId   ) {
            navigate(`/risk-assessment?id=${selected}`)
            // }
        }
    }, [riskAssessment, selected])

    const downloadTermSheet = (id, name) => {
        ApiGet(`transaction/termSheet/${id}`).then(res => {
            let data = res.data.data
            if (name === 'view') {
                ViewRiskAssessment(data)
            } else if (name === 'download') {
                converBase64toBlob(data);
            }
        }
        ).catch(e => console.log(e))
    }

    const converBase64toBlob = (content, contentType) => {
        const linkSource = `data:application/pdf;base64,${content}`;
        const downloadLink = document.createElement("a");
        const fileName = "TermSheet.pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

    }
    const ViewRiskAssessment = (contents) => {
        const linkSources = `data:application/pdf;base64,${contents}`;
        let pdfWindow = window.open("")
        pdfWindow.document.write(`<iframe width='100%' height='100%' src=${linkSources}></iframe>`)
    }

    const userTableAction = [
        {
            icon: 'edit',
            tooltip: 'Edit transaction',
            onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
        },
        {
            icon: 'download',
            tooltip: 'Download term sheet',
            // onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
            onClick: (event, rowData) => { downloadTermSheet(rowData._id) }
            // onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet() : converBase64toBlob(rowData.termSheetUrl) }
        },
    ]
    const tableAction = [
        {
            icon: 'edit',
            tooltip: 'Edit transaction',
            onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
        },
        {
            icon: 'preview',
            tooltip: 'View transaction',
            onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: true }] })
        },
        {
            icon: 'assessment',
            tooltip: 'Risk Assessment',
            onClick: (event, rowData) => { dispatch(getRiskAssessment(rowData._id)); setSelected(rowData._id) }
        },
        {
            icon: 'visibilityIcon',
            tooltip: 'view term sheet',
            onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet(rowData._id, 'view') : ViewRiskAssessment() }
        },
        {
            icon: 'download',
            tooltip: 'Download term sheet',
            // onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
            // onClick: (event, rowData) => { downloadTermSheet(rowData._id) }
            onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet(rowData._id, 'download') : converBase64toBlob(rowData.termSheetUrl) }
        },
    ]
    const handleRefresh = () => {
        dispatch({
            type: GET_TRANSACTION_BY_ID,
            payload: {}
        })
        navigate('/edit-transactions', { state: [{ type: "Export" }, { type: "Physical" }] })
    }
    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // let prefix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.prefix
            // let suffix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.suffix
            // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
            return value
        } else {
            return data
        }
    }

    return (
        <>
            <div className='product'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <h2 className='m-0'>Transactions</h2>
                    {AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button> : <></>}
                    {
                        showspan &&
                        <div className='add_content' style={{ right: "50px", top: "131px" }}>
                            <p onClick={() => navigate('/edit-transactions', { state: [{ type: "Import" }] })}>Import</p>
                            <p className='d-flex justify-content-between align-items-center' onClick={() => setShowSubData(!showSubData)}>Export
                                <img src='../assets/img/about/down-filled-triangular-arrow.png' />
                            </p>
                            {
                                showSubData &&
                                <>
                                    <p className="ps-3" onClick={handleRefresh}>Physical commodities</p>
                                    <p className="ps-3" onClick={() => navigate('/edit-transactions', { state: [{ type: "Export" }, { type: "Non-physical" }] })}>Non-physical commodities</p>
                                </>
                            || <Skeleton /> }
                        </div>
                    }
                </div>
                <MaterialTable
                    title=""
                    columns={[
                        { title: 'Transaction Date', field: 'createdAt', type: 'date' },
                        { title: 'Transaction Number', field: '_id' },
                        { title: 'Applicant', field: 'borrower_Applicant' },
                        { title: 'Lenders', field: 'lenders' },
                        { title: 'Product', field: 'details.productDetails.name.name' },
                        { title: 'Value', render: rowData => formateCurrencyValue(rowData.details.contractDetails.value) },
                        // { title: 'Origination Port', field: 'details.shippingOptions.portOfOrigin.name' },
                        // { title: 'Destination Port', field: 'details.shippingOptions.destinationPort.name' },
                        // { title: 'Term Sheet', field: 'termSheet' },
                        { title: 'Term Sheet', render: rowData => <p onClick={() => { rowData.termSheet === 'Not Signed' && setShowExcelModal(true); setSendId(rowData._id) }}>{rowData.termSheet}{rowData.termSheet === 'Signed' ? <Button onClick={() => { downloadTermSheet(rowData._id) }}><FileDownloadIcon /></Button> : <></>}</p> },
                        // { title: 'Entities Involved', render: rowData => { return rowData?.keyParties.map(item => item?.parties.map(partyItem => partyItem?.name?.details?.name))?.map(data => <p>{data}</p>) } },
                        // { title: 'Entities Involved', render: rowData => { return rowData?.keyParties.map(item => item?.parties.map(partyItem => partyItem?.name?.details?.name))?.map(data => <p>{data}</p>) } },
                    ]}
                    data={transaction || <Skeleton />}
                    // actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? tableAction.splice(2, 1) : tableAction.slice(1, 2)}
                    // actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? ( tableAction.splice(2, 1),tableAction) : AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? tableAction : tableAction.slice(1, 2)}


                    // actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? (tableAction) : AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? tableAction : tableAction.slice(1, 2)}

                    // actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? ( tableAction.splice(2, 1), tableAction) : AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? tableAction : tableAction.slice(1, 2)}

                    actions={AuthStorage.getStorageData(STORAGEKEY.roles) === 'superAdmin' ? (tableAction.splice(2, 1), tableAction) : AuthStorage.getStorageData(STORAGEKEY.roles) === 'user' ? tableAction : tableAction.slice(1, 2)}


                    options={{
                        filtering: true,
                        actionsColumnIndex: -1,
                        sorting: true,
                        pageSize: 10,
                        search: false,
                    }}
                />
            </div>

            {showExcelModal && <ExcelModal refreshpage={() => dispatch(() => refreshPage())} show={showExcelModal} onHide={() => setShowExcelModal(false)} getId={sendId} />}
        </>
    )
}

export default Transactions