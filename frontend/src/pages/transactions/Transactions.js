import React, { useEffect, useState } from 'react'
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
import { ApiGet } from '../../helper/API/ApiData';
import { Button, Icon } from '@material-ui/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GET_TRANSACTION_BY_ID } from '../../redux/types';
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
    console.log('getAll', getAlltransactionData)
    const riskAssessment = useSelector((state) => state.riskAssessmentData.getRiskAssessment)

    useEffect(() => {
        let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
        dispatch(getAllTransaction(id))
    }, [])

    useEffect(() => {
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

    const cllickOnRiskAssessment = (id) => {
        dispatch(getRiskAssessment(id))
        setSelected(id)
    }
    useEffect(() => {
        console.log('riskAssessment', riskAssessment)
        if (riskAssessment.status === 200 && selected) {
            navigate(`/risk-assessment?id=${riskAssessment?.data?.transactionId ?? selected}`)
        }
    }, [riskAssessment, selected])



    const downloadTermSheet = (id) => {
        ApiGet(`transaction/termSheet/${id}`).then(res => {
            let data = res.data.data
            var blob;
            blob = converBase64toBlob(data, 'application/pdf');
            console.log(blob)

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
        // contentType = contentType || '';
        // var sliceSize = 512;
        // var byteCharacters = window.atob(content); //method which converts base64 to binary
        // var byteArrays = [
        // ];
        // for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     var slice = byteCharacters.slice(offset, offset + sliceSize);
        //     var byteNumbers = new Array(slice.length);
        //     for (var i = 0; i < slice.length; i++) {
        //         byteNumbers[i] = slice.charCodeAt(i);
        //     }
        //     var byteArray = new Uint8Array(byteNumbers);
        //     byteArrays.push(byteArray);
        // }
        // var blob = new Blob(byteArrays, {
        //     type: contentType
        // }); //statement which creates the blob

        // var blobURL = URL.createObjectURL(blob);

        // let link = document.createElement('a');
        // link.download = 'TermSheet.docx';
        // link.href = blobURL; // data url  
        // link.click();
        // }
        //     var blob = new Blob(byteArrays, {
        //         type: contentType
        //     }); //statement which creates the blob

        //     var blobURL = URL.createObjectURL(blob);

        //     let link = document.createElement('a');
        //     link.download = 'TermSheet.docx';
        //     link.href = blobURL; // data url  
        //     link.click();
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
            onClick: (event, rowData) => cllickOnRiskAssessment(rowData._id)
        },
        {
            icon: 'download',
            tooltip: 'Download term sheet',
            // onClick: (event, rowData) => navigate(`/edit-transactions?id=${rowData?._id}`, { state: [{ type: rowData.type }, { type: rowData?.details?.productDetails?.nature ? rowData.details.productDetails.nature : '' }, { isView: false }] })
            // onClick: (event, rowData) => { downloadTermSheet(rowData._id) }
            onClick: (event, rowData) => { rowData.termSheet === 'Not Signed' ? downloadTermSheet(rowData._id) : converBase64toBlob(rowData.termSheetUrl) }
        },
    ]
    const handleRefresh = () => {
        dispatch({
            type: GET_TRANSACTION_BY_ID,
            payload: {}
        })
        navigate('/edit-transactions', { state: [{ type: "Export" }, { type: "Physical" }] })
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
                            }
                        </div>
                    }
                </div>
                {console.log(tableAction)}
                <MaterialTable
                    title=""
                    columns={[
                        { title: 'Transaction Date', field: 'createdAt', type: 'date' },
                        { title: 'Transaction Number', field: '_id' },
                        { title: 'Applicant', field: 'borrower_Applicant' },
                        { title: 'Lenders', field: 'lenders' },
                        { title: 'Product', field: 'details.productDetails.name.name' },
                        { title: 'Value', field: 'details.contractDetails.value' },
                        // { title: 'Origination Port', field: 'details.shippingOptions.portOfOrigin.name' },
                        // { title: 'Destination Port', field: 'details.shippingOptions.destinationPort.name' },
                        // { title: 'Term Sheet', field: 'termSheet' },
                        { title: 'Term Sheet', render: rowData => <p onClick={() => { rowData.termSheet === 'Not Signed' && setShowExcelModal(true); setSendId(rowData._id) }}>{rowData.termSheet}{rowData.termSheet === 'Signed' ? <Button onClick={ () => { downloadTermSheet(rowData._id) }}><FileDownloadIcon /></Button> : <></>}</p> },
                        // { title: 'Entities Involved', render: rowData => { return rowData?.keyParties.map(item => item?.parties.map(partyItem => partyItem?.name?.details?.name))?.map(data => <p>{data}</p>) } },
                        // { title: 'Entities Involved', render: rowData => { return rowData?.keyParties.map(item => item?.parties.map(partyItem => partyItem?.name?.details?.name))?.map(data => <p>{data}</p>) } },
                    ]}
                    data={transaction}
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

            {showExcelModal && <ExcelModal show={showExcelModal} onHide={() => setShowExcelModal(false)} getId={sendId} />}
        </>
    )
}

export default Transactions