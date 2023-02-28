import { InputAdornment, TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddSourceOfRepayment from '../../component/Modal/AddSourceOfRepayment'
import TextEditerModal from '../../component/Modal/TextEditerModal'
import CurrencyHedgeDetailsModal from '../../component/Modal/CurrencyHedgeDetailsModal'
import { CurrencyOptions } from '../../helper/common'
import { useSelector } from 'react-redux'
import { addTransaction, editTransaction, transactionDataAction } from '../../redux/actions/transactionDataAction'
import { useDispatch } from 'react-redux'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import { ADD_TRANSACTION, EDIT_TRANSACTION, GET_TRANSACTION_BY_ID } from '../../redux/types'
import { toast } from 'react-toastify'
import moment from "moment"
import { productGetAction } from '../../redux/actions/productAction'
import { companydataAction } from '../../redux/actions/companydataAction'

const Facility = ({ hendelCancel, hendelNext }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isView = location?.state[2]?.isView
    const transactionType = location?.state[0]?.type
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    // console.log("transactionType======", transactionType)

    const [facility, setFacility] = useState({
        _id: "",
        interestPeriod: "",
        currency: "",
        interestRate: "",
        interestPaymentDate: "",
        rePaymentCurrency: "",
        tenor: "",
        managementFee: "",
        currencyHedge: "",
        workingCapital: "",
        disbursementMechanism: "",
        securityUndertaking: "",
        controlAccounts: "",
        documentation: "",
        conditionsPrecedent: "",
        conditionsSubsequent: "",
        borrowerAffirmativeCovenants: "",
        financialCovenants: "",
        informationCovenants: "",
        assignments: "",
        taxationDuties: "",
        expenses: "",
        approvals: "",
        governingLaw: "",
        jurisdiction: "",
        forceMajeure: "",
        loanPurposeValidity: "",
        cancellationFee: "",

        drawdownFee: "",
        commitmentFee: "",
        lateInterestCharges: "",
        prePayment: "",
        type: "",
        amount: "",
        loanPurposJustification: "",
        finalMaturity: "",
        availabilityPeriod: "",
        repayment: "",
        transactionStructure: "",
        permittedAccounts: "",
        representations: "",
        eventsOfDefault: "",
        miscellaneousProvisions: "",
        generalUndertakings: "",
        margin: "",
        agencyFee: "",
        defaultInterest: ""
    })

    const [currencyHedgeDetailsModal, setCurrencyHedgeDetailsModal] = useState(false)
    const [addSourceOfRepayment, setAddSourceOfRepayment] = useState(false)
    const [showTextEditor, setShowTextEditor] = useState(false)
    const [type, setType] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [addCurrencyHedge, setAddCurrencyHedge] = useState([])
    const [sourceOfRepayment, setSourceOfRepayment] = useState([])
    const [securityDocuments, setSecurityDocuments] = useState([{
        type: "",
        name: "",
        file: ""
    }])
    const [rowEditData, setRowEditData] = useState('')
    const [error, setError] = useState()
    const [editRowData, setEditRowData] = useState('')
    const [view, setView] = useState()

    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const addTransactionData = useSelector((state) => state.transactionData.addTransaction)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)
    const editTransactionData = useSelector((state) => state.transactionData.editTransaction)
    const productData = useSelector(state => state.product.product)

    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            setFacility({
                _id: getTransactionByIdData.data?.facility?._id,
                interestPeriod: getTransactionByIdData.data?.facility?.interestPeriod,
                currency: getTransactionByIdData.data?.facility?.currency,
                interestRate: getTransactionByIdData.data?.facility?.interestRate,
                interestPaymentDate: getTransactionByIdData.data?.facility?.interestPaymentDate && moment(getTransactionByIdData.data?.facility?.interestPaymentDate).format("YYYY-MM-DD"),
                rePaymentCurrency: getTransactionByIdData.data?.facility?.rePaymentCurrency,
                tenor: getTransactionByIdData.data?.facility?.tenor,
                managementFee: getTransactionByIdData.data?.facility?.managementFee,
                currencyHedge: getTransactionByIdData.data?.facility?.currencyHedge === true ? "Yes" : "No",
                // goods: getTransactionByIdData.data?.facility?.goods,
                // workingCapital: getTransactionByIdData.data?.facility?.workingCapital,
                disbursementMechanism: getTransactionByIdData.data?.facility?.disbursementMechanism,
                securityUndertaking: getTransactionByIdData.data?.facility?.securityUndertaking,
                controlAccounts: getTransactionByIdData.data?.facility?.controlAccounts,
                documentation: getTransactionByIdData.data?.facility?.documentation,
                conditionsPrecedent: getTransactionByIdData.data?.facility?.conditionsPrecedent,
                conditionsSubsequent: getTransactionByIdData.data?.facility?.conditionsSubsequent,
                borrowerAffirmativeCovenants: getTransactionByIdData.data?.facility?.borrowerAffirmativeCovenants,
                financialCovenants: getTransactionByIdData.data?.facility?.financialCovenants,
                informationCovenants: getTransactionByIdData.data?.facility?.informationCovenants,
                assignments: getTransactionByIdData.data?.facility?.assignments,
                taxationDuties: getTransactionByIdData.data?.facility?.taxationDuties,
                expenses: getTransactionByIdData.data?.facility?.expenses,
                approvals: getTransactionByIdData.data?.facility?.approvals,
                governingLaw: getTransactionByIdData.data?.facility?.governingLaw,
                jurisdiction: getTransactionByIdData.data?.facility?.jurisdiction,
                forceMajeure: getTransactionByIdData.data?.facility?.forceMajeure,
                loanPurposeValidity: getTransactionByIdData.data?.facility?.loanPurposeValidity,
                cancellationFee: getTransactionByIdData.data?.facility?.cancellationFee,
                drawdownFee: getTransactionByIdData.data?.facility?.drawdownFee,
                commitmentFee: getTransactionByIdData.data?.facility?.commitmentFee,
                lateInterestCharges: getTransactionByIdData.data?.facility?.lateInterestCharges,
                prePayment: getTransactionByIdData.data?.facility?.prePayment,
                type: getTransactionByIdData.data?.facility?.type,
                amount: getTransactionByIdData.data?.facility?.amount,
                loanPurposJustification: getTransactionByIdData.data?.facility?.loanPurposJustification,
                finalMaturity: getTransactionByIdData.data?.facility?.finalMaturity && moment(getTransactionByIdData.data?.facility?.finalMaturity).format("YYYY-MM-DD"),
                availabilityPeriod: getTransactionByIdData.data?.facility?.availabilityPeriod,
                repayment: getTransactionByIdData.data?.facility?.repayment,
                transactionStructure: getTransactionByIdData.data?.facility?.transactionStructure,
                permittedAccounts: getTransactionByIdData.data?.facility?.permittedAccounts,
                generalUndertakings: getTransactionByIdData.data?.facility?.generalUndertakings,
                miscellaneousProvisions: getTransactionByIdData.data?.facility?.miscellaneousProvisions,
                representations: getTransactionByIdData.data?.facility?.representations,
                eventsOfDefault: getTransactionByIdData.data?.facility?.eventsOfDefault,
                agencyFee: getTransactionByIdData.data?.facility?.agencyFee,
                advisoryFee: getTransactionByIdData.data?.facility?.advisoryFee,
                margin: getTransactionByIdData.data?.facility?.margin,
                defaultInterest: getTransactionByIdData.data?.facility?.defaultInterest,
            })
            setSourceOfRepayment(getTransactionByIdData.data?.facility?.sourceOfRepayment.map((item) => {
                return {
                    _id: item._id,
                    evidence: item.evidence,
                    instrument: item.instrument,
                    type: item.type,
                }
            }))
            setSecurityDocuments(getTransactionByIdData.data?.facility?.securityDocuments)
            setAddCurrencyHedge(getTransactionByIdData.data?.facility?.currencyHedgeDetails.map((item) => {
                return {
                    _id: item._id,
                    hedgingMethod: item.hedgingMethod,
                    counterParty: { value: item?.counterParty?._id, label: item?.counterParty?.details?.name },
                }
            }))
        } else {
            setFacility({
                ...facility,
                currency: transactionData.details.contractDetails.currency
            })
        }
    }, [getTransactionByIdData])

    const counterpartyOptions = useSelector(state => state.entityData.entity)

    useEffect(() => {
        console.log('transactionData===', transactionData)
        if(transactionData && transactionData.facility?.currencyHedgeDetails && counterpartyOptions?.data) {
            setAddCurrencyHedge(transactionData.facility?.currencyHedgeDetails.map((ele) => {
                return {
                    _id: ele._id,
                    hedgingMethod: ele.hedgingMethod,
                    counterParty: counterpartyOptions.data.find((item) => item.counterParty?._id === ele.counterParty)?.name
                }
            }))
        }
        
    }, [transactionData])

    const Delete = (data) => {
        let body = {
            ...transactionData,
            currencyHedgeDetails: transactionData.facility.currencyHedgeDetails.filter((ele, i) => i !== data.tableData.id)
        }
        dispatch(transactionDataAction(body))
    }



    const propsEditData = (e) => {
        let editData = sourceOfRepayment.map((item, i) => i === e.id ? e.value : item)
        setSourceOfRepayment(editData)
    }

    const handleChange = (event) => {
        setFacility({
            ...facility,
            [event.target.name]: event.target.value
        })
    }

    const interestPeriodOptions = [
        'Weekly',
        'Monthly',
        'Quarterly',
        'Bi-annual',
        'Annual',
    ]

    const currencyHedgeOptions = [
        'Yes',
        'No'
    ]

    let loanPurposeValidityOptions = [
       'Is the loan purpose valid?',
       'Yes',
       'No'
    ]

    const hadleChangeModal = (e) => {
        setFacility({
            ...facility,
            [e.name]: e.value
        })
    }

    useEffect(() => {
        if (facility.currencyHedge === 'No') {
            setAddCurrencyHedge([])
        }
    }, [facility.currencyHedge])

    useEffect(() => {
        dispatch(productGetAction('all'))
    }, [])

    useEffect(() => {
        console.log('securityDocuments.length===', securityDocuments)
    }, [securityDocuments])



    const handleChangeNumber = (e, name) => {
        let numberReg = /^[0-9\b]+$/;
        let numberPointReg = /\b((100)|[0-9]\d?)\b/
        console.log('e.target.value', e.target.value)
        if (name === "interestRate" || name === "managementFee" || name === "drawdownFee" || name === "commitmentFee" || name === "lateInterestCharges" || name === "prePayment" || name === "cancellationFee" || name === "agencyFee" || name === "advisoryFee" || name === "defaultInterest") {
            if (e.target.value === "" || numberPointReg.test(e.target.value)) {
                if (e.target.value) {
                    var t = e.target.value;
                    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) < 100 ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3) : t.substr(0, t.indexOf("."))) : t
                }
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "tenor") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "margin") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "defaultInterest") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "advisoryFee") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "agencyFee") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "amount") {
            if (parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, '')) >= parseInt(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            } else {
                setFacility({ ...facility, [name]: '' })
            }
        }
    }

    const validation = () => {
        let params = false
        let error = {}

        if (!facility.interestRate) {
            params = true
            error.interestRate = 'Please enter interest rate!'
        }

        if (!facility.interestPeriod) {
            params = true
            error.interestPeriod = 'Please enter interest period!'
        }

        if (!facility.interestPaymentDate) {
            params = true
            error.interestPaymentDate = 'Please enter interest payment date!'
        }

        if (!facility.tenor) {
            params = true
            error.tenor = 'Please enter tenor of each drawdown!'
        }

        if (!facility.managementFee) {
            params = true
            error.managementFee = 'Please enter annual management fee!'
        }

        if (!facility.drawdownFee) {
            params = true
            error.drawdownFee = 'Please enter drawdown fee!'
        }

        if (!facility.commitmentFee) {
            params = true
            error.commitmentFee = 'Please enter commitment fee!'
        }

        if (!facility.lateInterestCharges) {
            params = true
            error.lateInterestCharges = 'Please enter late interrest charges!'
        }

        if (!facility.prePayment) {
            params = true
            error.prePayment = 'Please enter prepayment!'
        }

        if (!facility.cancellationFee) {
            params = true
            error.cancellationFee = 'Please enter cancellation fee!'
        }

        if (!facility.type) {
            params = true
            error.type = 'Please enter type!'
        }

        if (!facility.currency) {
            params = true
            error.currency = 'Please enter currency!'
        }

        if (!facility.amount) {
            params = true
            error.amount = 'Please enter amount!'
        }

        if (!facility.rePaymentCurrency) {
            params = true
            error.rePaymentCurrency = 'Please enter repayment currency!'
        }

        if (facility.currency !== facility.rePaymentCurrency && !facility.currencyHedge) {
            params = true
            error.currencyHedge = 'Please enter contract currency hedge!'
        }

        if (facility.loanPurposeValidity === '') {
            params = true
            error.loanPurposeValidity = 'Please enter loan purpose validity!'
        }

        if (facility.loanPurposeValidity === 'No' && !facility.loanPurposJustification) {
            params = true
            error.loanPurposJustification = 'Please enter loan purpose justification!'
        }

        // if (!facility.goods) {
        //     params = true
        //     error.goods = 'Please enter goods!'
        // }

        // if (!facility.workingCapital) {
        //     params = true
        //     error.workingCapital = 'Please enter working capital!'
        // }

        if (!facility.disbursementMechanism) {
            params = true
            error.disbursementMechanism = 'Please enter disbursement mechanism!'
        }

        if (!facility.securityUndertaking) {
            params = true
            error.securityUndertaking = 'Please enter security undertaking!'
        }

        if (!facility.controlAccounts) {
            params = true
            error.controlAccounts = 'Please enter control accounts!'
        }

        if (!facility.finalMaturity) {
            params = true
            error.finalMaturity = 'Please enter final maturity!'
        }

        if (!facility.documentation) {
            params = true
            error.documentation = 'Please enter documentation!'
        }

        if (!facility.conditionsPrecedent) {
            params = true
            error.conditionsPrecedent = 'Please enter conditions precedent!'
        }

        if (!facility.conditionsSubsequent) {
            params = true
            error.conditionsSubsequent = 'Please enter conditions subsequent!'
        }

        if (!facility.borrowerAffirmativeCovenants) {
            params = true
            error.borrowerAffirmativeCovenants = 'Please enter borrower affirmative covenants!'
        }

        if (!facility.financialCovenants) {
            params = true
            error.financialCovenants = 'Please enter financial covenants!'
        }

        if (!facility.informationCovenants) {
            params = true
            error.informationCovenants = 'Please enter information covenants!'
        }

        if (!facility.assignments) {
            params = true
            error.assignments = 'Please enter assignments!'
        }

        if (!facility.taxationDuties) {
            params = true
            error.taxationDuties = 'Please enter taxation & duties!'
        }

        if (!facility.expenses) {
            params = true
            error.expenses = 'Please enter expenses!'
        }

        if (!facility.approvals) {
            params = true
            error.approvals = 'Please enter approvals!'
        }

        if (!facility.governingLaw) {
            params = true
            error.governingLaw = 'Please enter governing law!'
        }

        if (!facility.jurisdiction) {
            params = true
            error.jurisdiction = 'Please enter jurisdiction!'
        }

        if (!facility.forceMajeure) {
            params = true
            error.forceMajeure = 'Please enter force majeure!'
        }

        if (!securityDocuments.length) {
            params = true
            error.securityDocuments = 'please select security documents'
        }
        if (!facility.availabilityPeriod) {
            params = true
            error.availabilityPeriod = 'please enter availability period'
        }

        if (!facility.repayment) {
            params = true
            error.repayment = 'please enter repayment'
        }

        if (!facility.transactionStructure) {
            params = true
            error.transactionStructure = 'please enter transaction structure'
        }

        if (!facility.permittedAccounts) {
            params = true
            error.permittedAccounts = 'please enter permitted accounts'
        }

        if (!facility.representations) {
            params = true
            error.representations = 'please enter representations'
        }

        if (!facility.eventsOfDefault) {
            params = true
            error.eventsOfDefault = 'please enter events of default'
        }

        if (!facility.miscellaneousProvisions) {
            params = true
            error.miscellaneousProvisions = 'please enter miscellaneous provisions'
        }

        if (!facility.generalUndertakings) {
            params = true
            error.generalUndertakings = 'please enter general undertakings'
        }

        if (!facility.margin) {
            params = true
            error.margin = 'please enter margin'
        }

        if (!facility.agencyFee) {
            params = true
            error.agencyFee = 'please enter agency fee'
        }

        if (!facility.defaultInterest) {
            params = true
            error.defaultInterest = 'please enter default interest'
        }
        if (!facility.advisoryFee) {
            params = true
            error.advisoryFee = 'please enter Advisory Fee'
        }
        setError(error)
        return params


    }

    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(
                /\D/g,
                '',
            ).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
            );
            // let prefix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.prefix
            // let suffix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.suffix
            // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
            return value
        } else {
            return data
        }
    }

    useEffect(() => {
        console.log('error', error)
    }, [error])

    const save = () => {
        if (validation()) {
            return
        }
        delete transactionData.details?._id
        delete transactionData.keyParties?._id
        delete transactionData.documentFlow?._id
        delete transactionData.fundFlow?._id
        delete facility._id
        let body = {
            detail: transactionType !== "Import" ? {
                ...transactionData.details,
                shippingOptions: {
                    ...transactionData?.details?.shippingOptions,
                    warehouses: transactionData?.details?.shippingOptions?.warehouses?.map((ele) => {
                        return {
                            warehouse: ele?.warehouse?.value,
                            warehouseCompany: ele?.warehouseCompany?.value
                        }
                    })
                }
            } : '',
            keyParties: transactionData.keyParties?.keyParties?.map((ele) => {
                return {
                    type: ele.type.value,
                    name: ele.name.value
                }
            }),
            documentFlow: transactionData.documentFlow,
            fundFlow: {
                ...transactionData.fundFlow,
                lettersOfCredit: transactionData.fundFlow?.lettersOfCredit.map((ele) => {
                    return {
                        applicant: ele?.applicant?.value,
                        issuingBank: ele?.issuingBank?.value,
                        beneficiary: ele?.beneficiary?.value,
                        advisingBank: ele?.advisingBank?.value,
                        conformingBank: ele?.conformingBank?.value,
                        negotiatingBank: ele?.negotiatingBank?.value,
                        secondBeneficiary: ele?.secondBeneficiary?.value,
                        reimbursingBank: ele?.reimbursingBank?.value,
                    }
                })
            },
            facility: {
                ...facility,
                currencyHedge: facility.currencyHedge === "Yes" ? true : false,
                currencyHedgeDetails: addCurrencyHedge.map((item) => {
                    return {
                        counterParty: item?.counterparty?.value,
                        hedgingMethod: item?.hedgingMethod
                    }
                }),
                sourceOfRepayment: sourceOfRepayment.map((ite) => {
                    return {
                        evidence: ite?.evidence,
                        instrument: ite?.instrument,
                        type: ite?.type
                    }
                })
            },
            securityDocuments: securityDocuments,
            type: transactionData.type,
            borrower_Applicant: transactionData.borrower_Applicant,
            lenders: transactionData.lenders,
            userId: AuthStorage.getStorageData(STORAGEKEY.userId)
        }

        console.log('body final===', body)
        dispatch(addTransaction(body))
    }

    useEffect(() => {
        if (addTransactionData && addTransactionData.data && addTransactionData.status === 200) {
            dispatch({
                type: ADD_TRANSACTION,
                payload: []
            })
            navigate("/transactions")
            toast.success(addTransactionData.message)
        }
    }, [addTransactionData])

    const edit = () => {
        if (validation()) {
            return
        }
        let body = {
            detail: transactionType !== "Import" ? {
                ...transactionData.details,
                shippingOptions: {
                    ...transactionData?.details?.shippingOptions,
                    warehouses: transactionData?.details?.shippingOptions?.warehouses?.map((ele) => {
                        return {
                            warehouse: ele?.warehouse?.value,
                            warehouseCompany: ele?.warehouseCompany?.value
                        }
                    })
                }
            } : '',
            keyParties: {
                keyParties: transactionData.keyParties?.keyParties?.map((ele) => {
                    return {
                        type: ele.type.value,
                        name: ele.name.value
                    }
                }),
                _id: transactionData.keyParties._id,
                relatedParties: transactionData.keyParties?.relatedParties
            },
            documentFlow: transactionData.documentFlow,
            fundFlow: {
                ...transactionData.fundFlow,
                lettersOfCredit: transactionData.fundFlow?.lettersOfCredit.map((ele) => {
                    return {
                        applicant: ele?.applicant?.value,
                        issuingBank: ele?.issuingBank?.value,
                        beneficiary: ele?.beneficiary?.value,
                        advisingBank: ele?.advisingBank?.value,
                        conformingBank: ele?.conformingBank?.value,
                        negotiatingBank: ele?.negotiatingBank?.value,
                        secondBeneficiary: ele?.secondBeneficiary?.value,
                        reimbursingBank: ele?.reimbursingBank?.value,
                    }
                })
            },
            facility: {
                ...facility,
                currencyHedge: facility.currencyHedge === "Yes" ? true : false,
                currencyHedgeDetails: addCurrencyHedge.map((item) => {
                    return {
                        counterParty: item?.counterParty?.value,
                        hedgingMethod: item?.hedgingMethod
                    }
                }),
                sourceOfRepayment: sourceOfRepayment.map((ite) => {
                    return {
                        evidence: ite.evidence,
                        instrument: ite.instrument,
                        type: ite.type
                    }
                })
            },
            securityDocuments: securityDocuments,
            type: transactionData.type,
            borrower_Applicant: transactionData.borrower_Applicant,
            lenders: transactionData.lenders,
            userId: AuthStorage.getStorageData(STORAGEKEY.userId)
        }
        console.log('body final===', body)
        dispatch(editTransaction(id, body))
    }

    useEffect(() => {
        if (editTransactionData && editTransactionData.data && editTransactionData.status === 200) {
            dispatch({
                type: EDIT_TRANSACTION,
                payload: []
            })
            dispatch({
                type: GET_TRANSACTION_BY_ID,
                payload: []
            })
            navigate("/transactions")
            toast.success(editTransactionData.message)
        }
    }, [editTransactionData])

    const editModalData = (data, id) => {
        console.log('id==', id)
        console.log('data==', data)
        if (id !== undefined) {
            setAddCurrencyHedge(addCurrencyHedge.map((ele, i) => {
                if (id === i) {
                    return data
                } else {
                    return ele
                }
            }))
            setEditRowData("")
        } else {
            setAddCurrencyHedge([...addCurrencyHedge, data])
        }
    }

    // const Delete = (data) => {
    //     let body = {
    //         ...transactionData,
    //         licenses: transactionData.facility.currencyHedgeDetails.filter((ele, i) => i !== data.tableData.id)
    //     }
    //     dispatch(transactionDataAction(body))
    // }

    const DeleteCurrencyhedgedetails = (rowData) =>{
        let DeleteCurrencyhedge = addCurrencyHedge.filter((ele , i)=>i!==rowData.tableData.id)
        setAddCurrencyHedge(DeleteCurrencyhedge)
    }
    const DeleteSourceOfRepayment = (rowData) => {
        let DeleteRepaymentsource = sourceOfRepayment.filter((ele, i) => i !== rowData.tableData.id)
        setSourceOfRepayment(DeleteRepaymentsource)
    }

    return (
        <>

            <div className='add-edit-product p-0 mb-5'>
                <div className='form'>
                    <h2 className='mb-3'>Pricing</h2>
                    <div>
                        <Row>
                            <Col lg={3}>
                                <TextField
                                    label="Interest rate"
                                    id="standard-start-adornment"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    name='interestRate'
                                    value={facility.interestRate}
                                    onChange={(e) => handleChangeNumber(e, 'interestRate')}
                                    disabled={isView}
                                />
                                {error && error?.interestRate && <span style={{ color: 'red' }}>{error.interestRate}</span>}
                            </Col>
                            <Col lg={3}>
                                <Autocomplete
                                    options={interestPeriodOptions}
                                    getOptionLabel={(option) => option}
                                    id="disable-clearable"
                                    label="Interest period"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Interest period" variant="standard" />
                                    )}
                                    onChange={(event, newValue) => {
                                        setFacility({ ...facility, interestPeriod: newValue });
                                    }}
                                    disabled={isView}
                                    disableClearable
                                    value={facility.interestPeriod}
                                />
                                {error && error?.interestPeriod && <span style={{ color: 'red' }}>{error.interestPeriod}</span>}
                            </Col>
                            <Col lg={3}>
                                <form className="" noValidate>
                                    <TextField
                                        id="date"
                                        label="Interest payment date"
                                        type="date"
                                        name='interestPaymentDate'
                                        value={facility.interestPaymentDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            min: transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""
                                        }}
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                </form>
                                {error && error?.interestPaymentDate && <span style={{ color: 'red' }}>{error.interestPaymentDate}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Tenor of each drawdown"
                                    id="standard-start-adornment"
                                    name=' tenor'
                                    value={facility.tenor}
                                    onChange={(e) => handleChangeNumber(e, 'tenor')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">months</InputAdornment>
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.tenor && <span style={{ color: 'red' }}>{error.tenor}</span>}
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col lg={3}>
                                <TextField
                                    label="Annual management fee"
                                    id="standard-start-adornment"
                                    name='managementFee'
                                    value={facility.managementFee}
                                    onChange={(e) => handleChangeNumber(e, 'managementFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.managementFee && <span style={{ color: 'red' }}>{error.managementFee}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Drawdown fee"
                                    id="standard-start-adornment"
                                    name='drawdownFee'
                                    value={facility.drawdownFee}
                                    onChange={(e) => handleChangeNumber(e, 'drawdownFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.drawdownFee && <span style={{ color: 'red' }}>{error.drawdownFee}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Commitment fee"
                                    id="standard-start-adornment"
                                    name='commitmentFee'
                                    value={facility.commitmentFee}
                                    onChange={(e) => handleChangeNumber(e, 'commitmentFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.commitmentFee && <span style={{ color: 'red' }}>{error.commitmentFee}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Late interest charges"
                                    id="standard-start-adornment"
                                    name='lateInterestCharges'
                                    value={facility.lateInterestCharges}
                                    onChange={(e) => handleChangeNumber(e, 'lateInterestCharges')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.lateInterestCharges && <span style={{ color: 'red' }}>{error.lateInterestCharges}</span>}
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col lg={3}>
                                <TextField
                                    label="prePayment"
                                    id="standard-start-adornment"
                                    name='prePayment'
                                    value={facility.prePayment}
                                    onChange={(e) => handleChangeNumber(e, 'prePayment')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.prePayment && <span style={{ color: 'red' }}>{error.prePayment}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Cancellation fee"
                                    id="standard-start-adornment"
                                    name='cancellationFee'
                                    value={facility.cancellationFee}
                                    onChange={(e) => handleChangeNumber(e, 'cancellationFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.cancellationFee && <span style={{ color: 'red' }}>{error.cancellationFee}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Margin"
                                    id="standard-start-adornment"
                                    name='margin'
                                    value={facility.margin}
                                    onChange={(e) => handleChangeNumber(e, 'margin')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.margin && <span style={{ color: 'red' }}>{error.margin}</span>}
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    label="Agency Fee"
                                    id="standard-start-adornment"
                                    name='agencyFee'
                                    value={facility.agencyFee}
                                    onChange={(e) => handleChangeNumber(e, 'agencyFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.agencyFee && <span style={{ color: 'red' }}>{error.agencyFee}</span>}
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col lg={6}>
                                <TextField
                                    label="Advisory Fee"
                                    id="standard-start-adornment"
                                    name='advisoryFee'
                                    value={facility.advisoryFee}
                                    onChange={(e) => handleChangeNumber(e, 'advisoryFee')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.advisoryFee && <span style={{ color: 'red' }}>{error.advisoryFee}</span>}
                            </Col>
                            <Col lg={6}>
                                <TextField
                                    label="Default Interest"
                                    id="standard-start-adornment"
                                    name='defaultInterest'
                                    value={facility.defaultInterest}
                                    onChange={(e) => handleChangeNumber(e, 'defaultInterest')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                    disabled={isView}
                                />
                                {error && error?.defaultInterest && <span style={{ color: 'red' }}>{error.defaultInterest}</span>}
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='add-edit-product p-0'>
                    <h4 className=''>Loan to collateral value</h4>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        <Col lg={3}>
                            <TextField
                                label="value"
                                id="standard-start-adornment"
                                name=''
                                value={((parseInt(facility.amount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, ''))) * 100).toFixed(2)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                disabled={isView}
                            />
                        </Col>
                        {/* <h3 style={{ margin: "0px", color: "rgb(161, 195, 195)" }}>{((parseInt(facility.amount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, ''))) * 100).toFixed(2)} %</h3> */}
                    </div>
                    <h4 className=''>Facility Detail</h4>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        <h2 className='mb-3'>Detail</h2>
                        {/* <h2 className='mb-0' style={{ color: "#b95f89", fontSize: "22px" }}>Loan to collateral value is currently: {((parseInt(facility.amount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, ''))) * 100).toFixed(2)} %</h2>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        <h2 className='mb-3'>Detail</h2> */}
                        <div>
                            <Row>
                                <Col lg={3}>
                                    <TextField
                                        label="Facility Type"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        name='type'
                                        value={facility.type}
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                </Col>

                                <Col lg={3}>
                                {/* <Col lg={3}>
                <Autocomplete
                  options={CurrencyOptions}
                  getOptionLabel={(option) => option.label}
                  id='disable-clearable'
                  label='Contract currency'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Contract currency'
                      variant='standard'/> 
                      )}
                  onChange={(e, newVal) =>
                    setContractDetails({
                      ...contractDetails,
                      currency: newVal.label,
                    })
                  }
                  value={CurrencyOptions && contractDetails?.currency && CurrencyOptions.find(
                      (ele) => ele.label === contractDetails.currency)}
                  disableClearable
                  disabled={isView}
                />
                {error?.currency && ( <span style={{
                      color: "#da251e",
                      width: "100%",
                      textAlign: "start",
                    }}>
                    {error?.currency}
                  </span>
                )}
              </Col> */}
                                    <Autocomplete
                                        options={CurrencyOptions}
                                        getOptionLabel={(option) => option.label}
                                        id="disable-clearable"
                                        label="Facility Currency"
                                        renderInput={(params) => (
                                            <TextField {...params} label="Facility Currency" variant="standard" />
                                        )}
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, currency: newValue.label });
                                        }}
                                        disableClearable
                                        disabled={isView}
                                        value={(CurrencyOptions.length > 0 && facility?.currency) && CurrencyOptions.find((ele) => ele.label === facility.currency)}
                                    />
                                    {error && error?.currency && <span style={{ color: 'red' }}>{error.currency}</span>}
                                </Col>
                                {/* <Col lg={6}>
                                    <TextField
                                        label="Contract currency"
                                        variant="standard"
                                        color="warning"
                                        value={facility.currency}
                                        name="currency"
                                    
                                        disabled={isView || facility.currency?.length > 0}
                                    />
                                    {error && error.value && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.value}</span>}
                                </Col> */}
                                <Col lg={3}>
                                    <TextField
                                        label="Facility amount"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        name="amount"
                                        value={facility.amount}
                                        onChange={(e) => handleChangeNumber(e, 'amount')}
                                        disabled={isView}
                                    />
                                    {error && error?.amount && <span style={{ color: 'red' }}>{error.amount}</span>}
                                </Col>

                                <Col lg={3}>
                                    <Autocomplete
                                        options={CurrencyOptions}
                                        getOptionLabel={(option) => option.label}
                                        id="disable-clearable"
                                        label="Repayment currency"
                                        renderInput={(params) => (
                                            <TextField {...params} label="Repayment currency" variant="standard" />
                                        )}
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, rePaymentCurrency: newValue.label });
                                        }}
                                        disabled={isView}
                                        disableClearable
                                        value={(CurrencyOptions.length > 0 && facility.rePaymentCurrency) && CurrencyOptions.find((ele) => ele.label === facility.rePaymentCurrency)}
                                    />
                                    {error && error?.rePaymentCurrency && <span style={{ color: 'red' }}>{error.rePaymentCurrency}</span>}
                                </Col>
                            </Row>

                            {(facility.currency !== facility.rePaymentCurrency && facility.rePaymentCurrency) &&
                                <Row className='mt-4'>
                                    <Col>
                                        <Autocomplete
                                            options={currencyHedgeOptions}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Did you contract a currency Hedge?"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Did you contract a currency Hedge?" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setFacility({ ...facility, currencyHedge: newValue });
                                            }}
                                            disableClearable
                                            value={facility.currencyHedge}
                                            disabled={isView}
                                        />
                                    </Col>
                                    {error && error?.currencyHedge && <span style={{ color: 'red' }}>{error.currencyHedge}</span>}
                                </Row>
                            }

                            {
                                (facility.currencyHedge === 'Yes') && (facility.currency !== facility.rePaymentCurrency && facility.rePaymentCurrency) &&
                                <>
                                    <div className='product'>
                                        <div className='mb-3 d-flex justify-content-between align-items-center'>
                                            <h5 className="title-color">Currency hedge details</h5>
                                            <button className={`add_btn me-3 ${isView && 'd-none'}`} onClick={() => { setCurrencyHedgeDetailsModal(true) }}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                                        </div>
                                        <MaterialTable
                                            title=""
                                            columns={[
                                                { title: 'Name', field: 'hedgingMethod' },
                                                { title: 'Label', field: 'counterParty.label' },
                                            ]}
                                            data={addCurrencyHedge.length ? addCurrencyHedge : []}
                                            actions={isView ? [
                                                {
                                                    icon: 'preview',
                                                    tooltip: 'View Currency hedge details',
                                                    onClick: (event, rowData) => { setCurrencyHedgeDetailsModal(true); setEditRowData(rowData) }
                                                }
                                            ] : [
                                                {
                                                    icon: 'edit',
                                                    tooltip: 'Edit Currency hedge details',
                                                    onClick: (event, rowData) => { setCurrencyHedgeDetailsModal(true); setEditRowData(rowData) }
                                                },
                                                {
                                                    icon: 'preview',
                                                    tooltip: 'View Currency hedge details',
                                                    onClick: (event, rowData) => { setCurrencyHedgeDetailsModal(true); setEditRowData(rowData) }
                                                },
                                                {
                                                    icon: 'delete',
                                                    tooltip: 'Delete hedge details',
                                                    onClick: (event, rowData) => {DeleteCurrencyhedgedetails(rowData) }
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
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div className='add-edit-product p-0'>
                    <div className='form'>
                        <h2 className='mb-3'>Loan Purpose Justification</h2>
                        <div>
                            <Row>
                              
                            
                                    <Col lg={6}>
                                        <TextField
                                            label="Loan Purpose"
                                            id="standard-start-adornment"
                                            variant="standard"
                                            color="warning"
                                            name='loanPurposJustification'
                                            value={facility.loanPurposJustification}
                                            onChange={handleChange}
                                            multiline
                                            maxRows={3}
                                            // onClick={() => { setShowTextEditor(true); setType('Loan Purpose Justification'); setSelectedName('loanPurposJustification') }}
                                            disabled={isView}
                                        />
                                        {error && error?.loanPurposJustification && <span style={{ color: 'red' }}>{error.loanPurposJustification}</span>}
                                    </Col>
                                
                                  <Col lg={6}>
                                    <Autocomplete
                                        options={loanPurposeValidityOptions}
                                        getOptionLabel={(option) => option}
                                        id="disable-clearable"
                                        label="Loan Purpose Validity"
                                        renderInput={(params) => (
                                            <TextField {...params} label="Loan Purpose Validity" variant="standard" />
                                        )}
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, loanPurposeValidity: newValue });
                                        }}
                                        disableClearable
                                        value={facility.loanPurposeValidity}
                                        disabled={isView}
                                    />
                                    {error && error?.loanPurposeValidity && <span style={{ color: 'red' }}>{error.loanPurposeValidity}</span>}
                                </Col>

                            </Row>
                        </div>
                    </div>
                </div>

                <div className='add-edit-product p-0'>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        {/* <h2 className='mb-3'>Loan</h2> */}
                        {/* <div className='mb-3'>
                            <Row>
                                <Col lg={6}>
                                    <TextField
                                        label="Goods"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={productData.data.find((ele) => ele._id === transactionData.details.productDetails.name)?.name}
                                        name='goods'
                                        // onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Goods'); setSelectedName('goods') }}
                                        disabled
                                    />
                                    {error && error?.goods && <span style={{ color: 'red' }}>{error.goods}</span>}
                                </Col>
                                <Col lg={6}>
                                    <TextField
                                        label="Working capital"
                                        value={transactionData.details.pricingDetails.previousDayClosingAmount}
                                        name='workingCapital'
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Working capital'); setSelectedName('workingCapital') }}
                                        disabled
                                    />
                                    {error && error?.workingCapital && <span style={{ color: 'red' }}>{error.workingCapital}</span>}
                                </Col>
                            </Row>
                        </div> */}


                        <div className='product p-0'>
                            <div className='mb-5'>
                                <div className='mb-3 d-flex justify-content-between align-items-center'>
                                    <h5 className="title-color">Source of Repayment</h5>
                                    <button className={`add_btn me-3 ${isView && 'd-none'}`} onClick={() => setAddSourceOfRepayment(true)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                                </div>
                                {sourceOfRepayment.length ? <MaterialTable
                                    title=""
                                    columns={[
                                        { title: 'Name', field: 'type' },
                                        // { title: 'Evidence', field: 'evidence' },
                                        { title: 'Instrument', field: 'instrument' },
                                        // { title: 'Type', field: 'type' },
                                    ]}
                                    // data={productGetData?.data}
                                    data={sourceOfRepayment.length ? sourceOfRepayment : []}
                                    actions={isView ? [
                                        {
                                            icon: 'preview',
                                            tooltip: 'View Source of Repayment',
                                            onClick: (event, rowData) => { setAddSourceOfRepayment(true); setRowEditData(rowData); setView(isView) }
                                            // onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
                                        }
                                    ] : [
                                        {
                                            icon: 'edit',
                                            tooltip: 'Edit Source of Repayment',
                                            onClick: (event, rowData) => { setAddSourceOfRepayment(true); setRowEditData(rowData) }
                                        },
                                        {
                                            icon: 'preview',
                                            tooltip: 'View Source of Repayment',
                                            onClick: (event, rowData) => { setAddSourceOfRepayment(true); setRowEditData(rowData); setView(isView) }
                                            // onClick: (event, rowData) => navigate(`/edit-product?id=${rowData?._id}`, { state: { isView: true } })
                                        },
                                        {
                                            icon: 'delete',
                                            tooltip: 'Delete source of repayment',
                                            onClick: (event, rowData) => {DeleteSourceOfRepayment(rowData) }
                                        },
                                    ]}
                                    options={{
                                        filtering: true,
                                        actionsColumnIndex: -1,
                                        sorting: true,
                                        pageSize: 10,
                                        search: false,
                                    }}
                                /> : 'No data found'}
                            </div>
                        </div>

                        {/* <div className='mb-3'>
                            <Row>
                                <Col lg={3}>
                                    <TextField
                                        label="Disbursement mechanism"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.disbursementMechanism}
                                        name='disbursementMechanism'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Disbursement mechanism'); setSelectedName('disbursementMechanism') }}
                                        disabled={isView}
                                    />
                                    {error && error?.disbursementMechanism && <span style={{ color: 'red' }}>{error.disbursementMechanism}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Security undertaking"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.securityUndertaking}
                                        name='securityUndertaking'
                                        disabled={isView}
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                    // onClick={() => { setShowTextEditor(true); setType('Security undertaking'); setSelectedName('securityUndertaking') }}
                                    />
                                    {error && error?.securityUndertaking && <span style={{ color: 'red' }}>{error.securityUndertaking}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Control accounts"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.controlAccounts}
                                        name='controlAccounts'
                                        disabled={isView}
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                    // onClick={() => { setShowTextEditor(true); setType('Control accounts'); setSelectedName('controlAccounts') }}
                                    />
                                    {error && error?.controlAccounts && <span style={{ color: 'red' }}>{error.controlAccounts}</span>}
                                </Col>
                                <Col lg={3}>
                                    <form className="" noValidate>
                                        <TextField
                                            id="date"
                                            label="Final maturity"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""
                                            }}
                                            disabled={isView}
                                            name='finalMaturity'
                                            value={facility.finalMaturity}
                                            onChange={handleChange}
                                        />
                                    </form>
                                    {error && error?.finalMaturity && <span style={{ color: 'red' }}>{error.finalMaturity}</span>}
                                </Col>
                            </Row>
                        </div> */}
                    </div>
                </div>


                <div className='add-edit-product p-0'>
                    <div className='form'>
                        <h2 className='mb-3'>Terms</h2>
                        <div>
                            {/* <div className='mb-3'> */}
                            <Row className='mb-4'>
                                <Col lg={3}>
                                    <TextField
                                        label="Disbursement mechanism"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.disbursementMechanism}
                                        name='disbursementMechanism'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Disbursement mechanism'); setSelectedName('disbursementMechanism') }}
                                        disabled={isView}
                                    />
                                    {error && error?.disbursementMechanism && <span style={{ color: 'red' }}>{error.disbursementMechanism}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Security undertaking"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.securityUndertaking}
                                        name='securityUndertaking'
                                        disabled={isView}
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                    // onClick={() => { setShowTextEditor(true); setType('Security undertaking'); setSelectedName('securityUndertaking') }}
                                    />
                                    {error && error?.securityUndertaking && <span style={{ color: 'red' }}>{error.securityUndertaking}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Control accounts"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.controlAccounts}
                                        name='controlAccounts'
                                        disabled={isView}
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                    // onClick={() => { setShowTextEditor(true); setType('Control accounts'); setSelectedName('controlAccounts') }}
                                    />
                                    {error && error?.controlAccounts && <span style={{ color: 'red' }}>{error.controlAccounts}</span>}
                                </Col>
                                <Col lg={3}>
                                    <form className="" noValidate>
                                        <TextField
                                            id="date"
                                            label="Final maturity"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""
                                            }}
                                            disabled={isView}
                                            name='finalMaturity'
                                            value={facility.finalMaturity}
                                            onChange={handleChange}
                                        />
                                    </form>
                                    {error && error?.finalMaturity && <span style={{ color: 'red' }}>{error.finalMaturity}</span>}
                                </Col>
                            </Row>
                            {/* </div> */}
                            <Row className='mb-4'>
                                <Col lg={3}>
                                    <TextField
                                        label="Documentation"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.documentation}
                                        name='documentation'
                                        disabled={isView}
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                    // onClick={() => { setShowTextEditor(true); setType('Documentation'); setSelectedName('documentation') }}
                                    />
                                    {error && error?.documentation && <span style={{ color: 'red' }}>{error.documentation}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Conditions precedent"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.conditionsPrecedent}
                                        name='conditionsPrecedent'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Conditions precedent'); setSelectedName('conditionsPrecedent') }}
                                        disabled={isView}
                                    />
                                    {error && error?.conditionsPrecedent && <span style={{ color: 'red' }}>{error.conditionsPrecedent}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Conditions subsequent"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.conditionsSubsequent}
                                        name='conditionsSubsequent'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Conditions subsequent'); setSelectedName('conditionsSubsequent') }}
                                        disabled={isView}
                                    />
                                    {error && error?.conditionsSubsequent && <span style={{ color: 'red' }}>{error.conditionsSubsequent}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Borrower affirmative covenants"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.borrowerAffirmativeCovenants}
                                        name='borrowerAffirmativeCovenants'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Borrower affirmative covenants'); setSelectedName('borrowerAffirmativeCovenants') }}
                                        disabled={isView}
                                    />
                                    {error && error?.borrowerAffirmativeCovenants && <span style={{ color: 'red' }}>{error.borrowerAffirmativeCovenants}</span>}
                                </Col>
                            </Row>
                            <Row className='mb-4'>
                                <Col lg={3}>
                                    <TextField
                                        label="Financial covenants"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.financialCovenants}
                                        name='financialCovenants'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.financialCovenants && <span style={{ color: 'red' }}>{error.financialCovenants}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Information covenants"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.informationCovenants}
                                        name='informationCovenants'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.informationCovenants && <span style={{ color: 'red' }}>{error.informationCovenants}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="General Undertakings"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.generalUndertakings}
                                        name='generalUndertakings'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.generalUndertakings && <span style={{ color: 'red' }}>{error.generalUndertakings}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Taxation & duties"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.taxationDuties}
                                        name='taxationDuties'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Taxation & duties'); setSelectedName('taxationDuties') }}
                                        disabled={isView}
                                    />
                                    {error && error?.taxationDuties && <span style={{ color: 'red' }}>{error.taxationDuties}</span>}
                                </Col>
                            </Row>
                            <Row className='mb-4'>
                                <Col lg={3}>
                                    <TextField
                                        label="Expenses"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.expenses}
                                        name='expenses'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Expenses'); setSelectedName('expenses') }}
                                        disabled={isView}
                                    />
                                    {error && error?.expenses && <span style={{ color: 'red' }}>{error.expenses}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Approvals"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.approvals}
                                        name='approvals'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Approvals'); setSelectedName('approvals') }}
                                        disabled={isView}
                                    />
                                    {error && error?.approvals && <span style={{ color: 'red' }}>{error.approvals}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Governing law"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.governingLaw}
                                        name='governingLaw'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('Governing law'); setSelectedName('governingLaw') }}
                                        disabled={isView}
                                    />
                                    {error && error?.governingLaw && <span style={{ color: 'red' }}>{error.governingLaw}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        // label="jurisdiction"
                                        label="Enforcement courts"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.jurisdiction}
                                        name='jurisdiction'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        // onClick={() => { setShowTextEditor(true); setType('jurisdiction'); setSelectedName('jurisdiction') }}
                                        disabled={isView}
                                    />
                                    {error && error?.jurisdiction && <span style={{ color: 'red' }}>{error.jurisdiction}</span>}
                                </Col>
                            </Row>
                            <Row className='mb-4'>
                                <Col lg={3}>
                                    <TextField
                                        label="Availability Period"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.availabilityPeriod}
                                        name='availabilityPeriod'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        disabled={isView}
                                    />
                                    {error && error?.availabilityPeriod && <span style={{ color: 'red' }}>{error.availabilityPeriod}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Repayment"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.repayment}
                                        name='repayment'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.repayment && <span style={{ color: 'red' }}>{error.repayment}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Transaction Structure"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.transactionStructure}
                                        name='transactionStructure'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.transactionStructure && <span style={{ color: 'red' }}>{error.transactionStructure}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Permitted Accounts"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.permittedAccounts}
                                        name='permittedAccounts'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.permittedAccounts && <span style={{ color: 'red' }}>{error.permittedAccounts}</span>}
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <TextField
                                        label="Assignments"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.assignments}
                                        name='assignments'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.assignments && <span style={{ color: 'red' }}>{error.assignments}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Miscellaneous Provisions"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.miscellaneousProvisions}
                                        name='miscellaneousProvisions'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.miscellaneousProvisions && <span style={{ color: 'red' }}>{error.miscellaneousProvisions}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="Force majeure"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.forceMajeure}
                                        name='forceMajeure'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.forceMajeure && <span style={{ color: 'red' }}>{error.forceMajeure}</span>}
                                </Col>
                                <Col lg={3}>
                                    <TextField
                                        label="upload termsheet here"
                                        variant="standard"
                                        color="warning"
                                        name='roleName'
                                        type='file'
                                        autoFocus={true}
                                        inputProps={{ multiple: true }}
                                        // value={state.roleName}
                                        // onChange={(e) => getBase64(e.target.file, (result) => {
                                        //     // idCardBase64 = result;
                                        //     console.log('result', result)
                                        //     setFile(result)
                                        // })}

                                        onChange={(e) => {
                                            console.log("===", e?.target?.files)
                                            let temp = [...securityDocuments];
                                            Object.keys(e?.target?.files)?.map(file => {
                                                console.log("file", file)
                                                const reader = new FileReader();
                                                reader.readAsDataURL(e?.target?.files[file]);
                                                reader.onload = () => temp.push({ name: e?.target?.files[file]?.name, type: e?.target?.files[file]?.type, file: reader.result?.split(",")[1] });
                                                reader.onerror = error => console.log(error);
                                            })
                                            setSecurityDocuments(temp)
                                        }}
                                    // disable={isView}
                                    />
                                    {/* {securityDocuments?.length ? securityDocuments?.map((ele) => <><p>{ele.name}</p> <br /></>) : <></>} */}
                                    {error?.securityDocuments && <span style={{ color: 'red' }}>{error?.securityDocuments}</span>}
                                </Col>
                            </Row>
                            <Row className='mb-4'>
                                <Col lg={6}>
                                    <TextField
                                        label="Representations"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.representations}
                                        name='representations'
                                        onChange={handleChange}
                                        multiline
                                        maxRows={3}
                                        disabled={isView}
                                    />
                                    {error && error?.representations && <span style={{ color: 'red' }}>{error.representations}</span>}
                                </Col>
                                <Col lg={6}>
                                    <TextField
                                        label="Events of Default"
                                        id="standard-start-adornment"
                                        variant="standard"
                                        color="warning"
                                        value={facility.eventsOfDefault}
                                        name='eventsOfDefault'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.eventsOfDefault && <span style={{ color: 'red' }}>{error.eventsOfDefault}</span>}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { navigate('/transactions') }} className={`footer_next_btn ${isView ? 'd-block' : 'd-none'}`}>Exit</button>
                    <button onClick={() => { id ? edit() : save() }} className={`footer_next_btn ${isView && 'd-none'}`}>{id ? "Close" : "Save"}</button>
                </div>
            </div>
            {addSourceOfRepayment && <AddSourceOfRepayment show={addSourceOfRepayment} onHide={() => { setAddSourceOfRepayment(false); setRowEditData('') }} getModalData={(e) => setSourceOfRepayment([...sourceOfRepayment, e])} data={rowEditData} getEditData={(e) => propsEditData(e)} isView={view} />}
            {/* {showTextEditor && <TextEditerModal show={showTextEditor} onHide={() => setShowTextEditor(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={facility[selectedName]} />} */}
            {currencyHedgeDetailsModal && <CurrencyHedgeDetailsModal show={currencyHedgeDetailsModal} onHide={() => { setCurrencyHedgeDetailsModal(false); setEditRowData("") }} getModalData={(e, id) => editModalData(e, id)} editRowData={editRowData} />}
        </>
    )
}

export default Facility