import { InputAdornment, TextField } from '@material-ui/core'
import Choices from 'choices.js';
import MaterialTable from 'material-table'
import React, { useEffect, useState, useRef } from 'react'
import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
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
import { BsPlus } from "react-icons/bs"

import { repsOptions } from './Helpers/TermsOptions'
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { DatePicker, Space } from 'antd';
// import Item from 'antd/es/list/Item'
// dayjs.extend(customParseFormat);


const Facility = ({ hendelCancel, hendelNext }) => {

    useEffect(() => {
        // Include Choices.js stylesheet
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.css';
        document.head.appendChild(link);

        // Include Choices.js script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/bbbootstrap/libraries@main/choices.min.js';
        script.async = true;
        document.body.appendChild(script);

        // Initialize Choices.js when the script is loaded
        script.onload = () => {
            const selectElement = document.getElementById('choices-multiple-remove-button');
            if (selectElement) {
                new Choices(selectElement, {
                    removeItemButton: true,
                    maxItemCount: 20,
                    searchResultLimit: 20,
                    renderChoiceLimit: 20,
                });
            }
        };

        // Clean up when the component unmounts
        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isView = location?.state[2]?.isView
    const transactionType = location?.state[0]?.type
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    // console.log("transactionType======", transactionType)

    const [facility, setFacility] = useState({
        representations: [],
        _id: "",
        interestPeriod: "",
        baseRate: "",
        currency: "",
        interestRate: "",
        interestRateType: "",
        interestPaymentDate: "",
        rePaymentCurrency: "",
        tenor: "",
        managementFee: "",
        currencyHedge: false,
        workingCapital: "",
        disbursementMechanism: "",
        securityUndertaking: "",
        controlAccounts: "",
        documentation: "",
        specifyDocumentation: "",
        conditionsPrecedent: [],
        conditionsSubsequent: [],
        borrowerAffirmativeCovenants: [],
        financialCovenants: [],
        informationCovenants: [],
        assignments: "",
        taxationDuties: "",
        expenses: "",
        approvals: "",
        governingLaw: "",
        jurisdiction: "",
        forceMajeure: "",
        loanPurposeValidity: false,
        cancellationFee: "",
        loanPurposeReason: "",

        drawdownFee: "",
        commitmentFee: "",
        lateInterestCharges: "",
        prePayment: "",
        type: "",
        specifyFacilityType: "",
        amount: "",
        loanPurposJustification: "",
        finalMaturity: "",
        availabilityPeriod: "",
        repayment: "",
        transactionStructure: "",
        permittedAccounts: "",
        eventsOfDefault: [],
        miscellaneousProvisions: "",
        generalUndertakings: [],
        margin: "",
        agencyFee: "",
        defaultInterest: "",
        liborRate: "",
        sofrRate: "",
        otherRate: "",
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
    const [loading, setLoading] = useState(false)

    const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
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
                baseRate: getTransactionByIdData.data?.facility?.baseRate,
                currency: getTransactionByIdData.data?.facility?.currency,
                interestRate: getTransactionByIdData.data?.facility?.interestRate,
                interestRateType: getTransactionByIdData.data?.facility?.interestRateType,
                loanPurposeReason: getTransactionByIdData.data?.facility?.loanPurposeReason,
                interestPaymentDate: getTransactionByIdData.data?.facility?.interestPaymentDate && moment(getTransactionByIdData.data?.facility?.interestPaymentDate).format("YYYY-MM-DD"),
                rePaymentCurrency: getTransactionByIdData.data?.facility?.rePaymentCurrency,
                currency: getTransactionByIdData.data?.facility?.currency,
                // interestRate: getTransactionByIdData.data?.facility?.interestRate,
                // interestPaymentDate: getTransactionByIdData.data?.facility?.interestPaymentDate && moment(getTransactionByIdData.data?.facility?.interestPaymentDate).format("YYYY-MM-DD"),
                // rePaymentCurrency: getTransactionByIdData.data?.facility?.rePaymentCurrency,
                tenor: getTransactionByIdData.data?.facility?.tenor,
                managementFee: getTransactionByIdData.data?.facility?.managementFee,
                currencyHedge: getTransactionByIdData.data?.facility?.currencyHedge,
                // goods: getTransactionByIdData.data?.facility?.goods,
                // workingCapital: getTransactionByIdData.data?.facility?.workingCapital,
                disbursementMechanism: getTransactionByIdData.data?.facility?.disbursementMechanism,
                securityUndertaking: getTransactionByIdData.data?.facility?.securityUndertaking,
                controlAccounts: getTransactionByIdData.data?.facility?.controlAccounts,
                documentation: getTransactionByIdData.data?.facility?.documentation,
                specifyDocumentation: getTransactionByIdData.data?.facility?.specifyDocumentation,
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
                specifyFacilityType: getTransactionByIdData.data?.facility?.specifyFacilityType,
                amount: getTransactionByIdData.data?.facility?.amount,
                loanPurposJustification: getTransactionByIdData.data?.facility?.loanPurposJustification,
                finalMaturity: getTransactionByIdData.data?.facility?.finalMaturity,
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
                liborRate: getTransactionByIdData.data?.facility?.liborRate,
                sofrRate: getTransactionByIdData.data?.facility?.sofrRate,
                otherRate: getTransactionByIdData.data?.facility?.otherRate,
            })
            setSourceOfRepayment(getTransactionByIdData.data?.facility?.sourceOfRepayment.map((item) => {
                return {
                    _id: item._id,
                    evidence: item.evidence,
                    instrument: item.instrument,
                    type: item.type,
                }
            }))
            // setSecurityDocuments(getTransactionByIdData.data?.facility?.securityDocuments)
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
        if (transactionData && transactionData.facility?.currencyHedgeDetails && counterpartyOptions?.data) {
            setAddCurrencyHedge(transactionData.facility?.currencyHedgeDetails.map((ele) => {
                return {
                    _id: ele._id,
                    hedgingMethod: ele.hedgingMethod,
                    counterParty: counterpartyOptions.data.find((item) => item.counterParty?._id === ele.counterParty)?.name
                }
            }))
        }

    }, [transactionData])

    // const Delete = (data) => {
    //     let body = {
    //         ...transactionData,
    //         currencyHedgeDetails: transactionData.facility.currencyHedgeDetails.filter((ele, i) => i !== data.tableData.id)
    //     }
    //     dispatch(transactionDataAction(body))
    // }



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

    const baseRateOptions = [
        'LIBOR',
        'SOFR',
        'Other(Please Specify)'
    ]
    const interestRateTypeOptions = [
        'Fixed Rate',
        'Variable Rate'
    ]
    const facilityTypeOptions = [
        'Trade Finance',
        'Export Finance',
        'Pre-Export Finance',
        'Receiveables Finance',
        'Lines of Credit',
        'Note Purchase',
        'Factoring',
        'Post Shipment Finance',
        'Term Loan',
        `Others(please specify)`,
    ]
    const governLawOptions = [
        'French',
        'English',
        'Others'
    ]
    const documentationOptions = [
        'Facility Agreement',
        'Loan Agreement',
        'Others (Please specify)',
    ]



    const precedentOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]
    const subsequentOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]
    const bacovOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]
    const fincovOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]
    const infcovOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]
    const genovertakingOptions = [
        'Status',
        'Binding obligations',
        'non conflict with other obligations',
        'no reduction of capital',
        'iuiffyhggtions',
        'No iuewfi2q2',
        'No iuerguyrrr',

    ]

    let currencyHedgeOptions = [
        { value: '', label: 'Select Option' },
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ]

    let loanPurposeValidityOptions = [
        { value: '', label: 'Is the loan purpose valid?' },
        { value: true, label: "Yes" },
        { value: false, label: "No" },
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

    // useEffect(() => {
    //     console.log('securityDocuments.length===', securityDocuments)
    // }, [securityDocuments])



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
        else if (name === "finalMaturity") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "availabilityPeriod") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "liborRate") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "sofrRate") {
            if (e.target.value === "" || numberReg.test(e.target.value)) {
                setFacility({ ...facility, [name]: e.target.value })
            }
        }
        else if (name === "otherRate") {
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
            // if (parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, '')) >= parseInt(e.target.value)) {
            if (e.target.value === '' || e.target.value) {
                setFacility({ ...facility, [name]: e.target.value })
            } else {
                setFacility({ ...facility, [name]: '' })
            }
        }
    }

    const validation = () => {
        let params = false
        let error = {}

        if (!facility.interestRateType) {
            params = true
            error.interestRateType = 'Please select an interest rate type!'
        }

        if (facility.interestRateType === "Fixed Rate" && !facility.interestRate) {
            params = true
            error.interestRate = 'Please enter interest rate!'
        }
        if (facility.interestRateType === "Variable Rate" && !facility.baseRate) {
            params = true
            error.baseRate = 'Please enter base rate!'
        }
        if (facility.interestRateType === "Variable Rate" && !facility.margin) {
            params = true
            error.margin = 'please enter margin'
        }
        if (facility.baseRate === "LIBOR" && !facility.liborRate) {
            params = true
            error.liborRate = 'please enter liborRate'
        }
        if (facility.baseRate === "SOFR" && !facility.sofrRate) {
            params = true
            error.sofrRate = 'please enter Sofr Rate'
        }
        if (facility.baseRate === "Other(Please Specify)" && !facility.otherRate) {
            params = true
            error.otherRate = 'Please specify your rate'
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
        if (!facility.type === "specifyFacilityType" && !facility.specifyFacilityType) {
            params = true
            error.specifyFacilityType = 'Please specify facility type!'
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
        if (facility.loanPurposeValidity === 'Yes' && !facility.loanPurposeReason) {
            params = true
            error.loanPurposeReason = 'Please enter reason'
        }

        if (!facility.loanPurposJustification) {
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
        if (facility.documentation === 'Others (Please Specify)' && !facility.specifyDocumentation) {
            params = true
            error.specifyDocumentation = 'Please specify documentation!'
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

        // if (!securityDocuments.length) {
        //     params = true
        //     error.securityDocuments = 'please select security documents'
        // }
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
            // let prefix = CurrencyOptions.find((ele) => ele === contractDetails?.currency)?.prefix
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

    const save = async () => {
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

            keyParties: {
                keyParties: transactionData.keyParties?.keyParties?.map((ele) => {
                    return {
                        type: ele.type.value,
                        name: ele.name.value
                    }
                }),
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
            // securityDocuments: securityDocuments,
            type: transactionData.type,
            borrower_Applicant: transactionData.borrower_Applicant,
            lenders: transactionData.lenders,
            userId: AuthStorage.getStorageData(STORAGEKEY.userId)
        }

        console.log('body final===', body)
        // return false;
        setLoading(true)
        await dispatch(addTransaction(body))
        setLoading(false)
        navigate("/final-page")
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

    const edit = async () => {
        if (validation()) {
            return
        }
        //  alert('edit');
        // console.log(transactionData.keyParties);
        // return;
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
            // securityDocuments: securityDocuments,
            type: transactionData.type,
            borrower_Applicant: transactionData.borrower_Applicant,
            lenders: transactionData.lenders,
            userId: AuthStorage.getStorageData(STORAGEKEY.userId)
        }
        console.log('body final===', body)
        setLoading(true)
        await dispatch(editTransaction(id, body))
        setLoading(false)
        navigate("/final-page")
        // setTimeout(() => {
        // }, 2000);
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

    const DeleteCurrencyhedgedetails = (rowData) => {
        let DeleteCurrencyhedge = addCurrencyHedge.filter((ele, i) => i !== rowData.tableData.id)
        setAddCurrencyHedge(DeleteCurrencyhedge)
    }
    const DeleteSourceOfRepayment = (rowData) => {
        let DeleteRepaymentsource = sourceOfRepayment.filter((ele, i) => i !== rowData.tableData.id)
        setSourceOfRepayment(DeleteRepaymentsource)
    }


    // const [views, setViews] = useState(false);
    const precedentTogref = useRef(null);
    const subsequentTogref = useRef(null);
    const repsTogref = useRef(null);
    const bacTogref = useRef(null);
    const fincovTogref = useRef(null);
    const infocovTogref = useRef(null);
    const undertakingsTogref = useRef(null);
    const eventsTogref = useRef(null)

    const [viewsPrecedent, setViewsPrecedent] = useState(false);
    const [viewsSubsequent, setViewsSubsequent] = useState(false);
    const [viewsReps, setViewsReps] = useState(false);
    const [viewsBac, setViewsBac] = useState(false);
    const [viewsFincov, setViewsFincov] = useState(false);
    const [viewsInfo, setViewsInfo] = useState(false);
    const [viewsUndertakings, setViewsUndertakings] = useState(false);
    const [eventOfDefault, setEventOfDefault] = useState(false);

    useEffect(() => {
        precedentTogref.current && window.addEventListener('click', (e) => {
            !precedentTogref.current.contains(e.target) && setViewsPrecedent(false);
        }, true);

        subsequentTogref.current && window.addEventListener('click', (e) => {
            !subsequentTogref.current.contains(e.target) && setViewsSubsequent(false);
        }, true);

        repsTogref.current && window.addEventListener('click', (e) => {
            !repsTogref.current.contains(e.target) && setViewsReps(false);
        }, true);
        bacTogref.current && window.addEventListener('click', (e) => {
            !bacTogref.current.contains(e.target) && setViewsBac(false);
        }, true);
        fincovTogref.current && window.addEventListener('click', (e) => {
            !fincovTogref.current.contains(e.target) && setViewsFincov(false);
        }, true);
        infocovTogref.current && window.addEventListener('click', (e) => {
            !infocovTogref.current.contains(e.target) && setViewsInfo(false);
        }, true);
        undertakingsTogref.current && window.addEventListener('click', (e) => {
            !undertakingsTogref.current.contains(e.target) && setViewsUndertakings(false);
        }, true);
        eventsTogref.current && window.addEventListener('click', (e) => {
            !eventsTogref.current.contains(e.target) && setEventOfDefault(false);
        }, true);
    }, []);

    // const HandleSelection = (val) => {
    //     const findData = facility.representations.find(ele => ele === val);
    //     if (!findData) {
    //         setFacility(prevFacility => ({
    //             ...prevFacility,
    //             representations: [...prevFacility.representations, val]
    //         }));
    //     } else {
    //         setFacility(prevFacility => ({
    //             ...prevFacility,
    //             representations: prevFacility.representations.filter(ele => ele !== val)
    //         }));
    //     }
    // }

    // const RemoveContent = val => {
    //     setFacility(prevFacility => ({
    //         ...prevFacility,
    //         representations: prevFacility.representations.filter(ele => ele !== val)
    //     }));
    //     setViews(false);
    // }
    const HandleSelection = (propertyName, value, togref) => {
        setFacility((prevFacility) => ({
            ...prevFacility,
            [propertyName]: prevFacility[propertyName].includes(value)
                ? prevFacility[propertyName].filter((ele) => ele !== value)
                : [...prevFacility[propertyName], value],
        }));

        if (togref === 'conditionsPrecedent') {
            setViewsPrecedent(true);
        } else if (togref === 'representations') {
            setViewsReps(true);
        }
        else if (togref === 'conditionsSubsequent') {
            setViewsSubsequent(true);
        }
        else if (togref === 'borrowerAffirmativeCovenants') {
            setViewsBac(true);
        }
        else if (togref === 'financialCovenants') {
            setViewsFincov(true);
        }
        else if (togref === 'informationCovenants') {
            setViewsInfo(true);
        }
        else if (togref === 'generalUndertakings') {
            setViewsUndertakings(true);
        }
        else if (togref === 'eventsOfDefault') {
            setEventOfDefault(true);
        }
    };

    const RemoveContent = (propertyName, value, togref) => {
        setFacility((prevFacility) => ({
            ...prevFacility,
            [propertyName]: prevFacility[propertyName].filter((ele) => ele !== value),
        }));

        if (togref === 'conditionsPrecedent') {
            setViewsPrecedent(false);
        } else if (togref === 'representations') {
            setViewsReps(false);
        } else if (togref === 'conditionsSubsequent') {
            setViewsSubsequent(false);
        } else if (togref === 'borrowerAffirmativeCovenants') {
            setViewsBac(false);
        } else if (togref === 'financialCovenants') {
            setViewsFincov(false);
        } else if (togref === 'informationCovenants') {
            setViewsInfo(false);
        } else if (togref === 'generalUndertakings') {
            setViewsUndertakings(false);
        } else if (togref === 'eventsOfDefault') {
            setEventOfDefault(false)
        }
    };

    return (
        <>

            <div className='add-edit-product p-0 mb-5'>

                <div className='form'>
                    <h4 className='fs-5 fw-bold mb-4 title-admin'>INTEREST</h4>
                    <Row>
                        <Form.Group as={Col} lg={3} controlId="formGridZip">
                            <Form.Label>Interest Rate Type</Form.Label>
                            <Form.Select
                                onChange={(event, newValue) => {
                                    setFacility({ ...facility, interestRateType: event.target.value });
                                }}
                                disabled={isView}
                                value={facility.interestRateType}
                                defaultValue="Choose...">
                                <option>Choose...</option>
                                {interestRateTypeOptions.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}

                            </Form.Select>
                            {error && error?.interestRateType && <span style={{ color: 'red' }}>{error.interestRateType}</span>}
                        </Form.Group>

                        {facility.interestRateType === 'Fixed Rate' && (
                            <>
                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Interest Rate</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name='interestRate'
                                            value={facility.interestRate}
                                            onChange={(e) => handleChangeNumber(e, 'interestRate')} />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>

                                    {error?.interestRate && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.interestRate}</span>)}
                                </Form.Group>

                            </>
                        )}
                        {facility.interestRateType === 'Variable Rate' && (
                            <>
                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Base Rate</Form.Label>
                                    <Form.Select
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, baseRate: event.target.value });
                                        }}
                                        value={facility.baseRate}
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {baseRateOptions.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.baseRate && <span style={{ color: 'red' }}>{error.baseRate}</span>}
                                </Form.Group>
                                {facility.baseRate === "LIBOR" && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>LIBOR Rate</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name='liborRate'
                                                value={facility.liborRate}
                                                onChange={(e) => handleChangeNumber(e, 'liborRate')} />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>

                                        {error?.liborRate && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.liborRate}</span>)}
                                    </Form.Group>
                                )}
                                {facility.baseRate === "SOFR" && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>SOFR Rate</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name='sofrRate'
                                                value={facility.sofrRate}
                                                onChange={(e) => handleChangeNumber(e, 'sofrRate')} />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>

                                        {error?.sofrRate && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.sofrRate}</span>)}
                                    </Form.Group>
                                )}
                                {facility.baseRate === "Other(Please Specify)" && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Specify Rate</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                name='otherRate'
                                                value={facility.otherRate}
                                                onChange={(e) => handleChangeNumber(e, 'otherRate')} />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>

                                        {error?.otherRate && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.otherRate}</span>)}
                                    </Form.Group>
                                )}

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Margin</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name='margin'
                                            value={facility.margin}
                                            onChange={(e) => handleChangeNumber(e, 'margin')} />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>

                                    {error?.margin && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.margin}</span>)}
                                </Form.Group>
                            </>
                        )}

                    </Row>
                </div>

                <div className='form'>
                    <h4 className='fs-5 fw-bold mb-4 title-admin'>PRICING</h4>
                    <div>
                        <Row>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Interest Period</Form.Label>
                                <Form.Select
                                    onChange={(e) => {
                                        setFacility({ ...facility, interestPeriod: e.target.value });
                                    }}
                                    disabled={isView}
                                    value={facility.interestPeriod}
                                    defaultValue="Choose...">
                                    <option>Choose...</option>
                                    {interestPeriodOptions.map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}

                                </Form.Select>
                                {error && error?.interestPeriod && <span style={{ color: 'red' }}>{error.interestPeriod}</span>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Interest Payment Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="interestPaymentDate"
                                    placeholder="dd-mm-yyyy"
                                    min={transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""}
                                    value={facility.interestPaymentDate}
                                    onChange={handleChange}
                                    required
                                />
                                {error && error?.contractDate && <span style={{ color: 'red' }}>{error.contractDate}</span>}
                            </Form.Group>


                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Tenor of Each Drawdown</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name=' tenor'
                                        value={facility.tenor}
                                        onChange={(e) => handleChangeNumber(e, 'tenor')} />
                                    <InputGroup.Text>months</InputGroup.Text>
                                </InputGroup>

                                {error?.tenor && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.tenor}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Annual Management Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='managementFee'
                                        value={facility.managementFee}
                                        onChange={(e) => handleChangeNumber(e, 'managementFee')}
                                        disabled={isView} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.managementFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.managementFee}</span>)}
                            </Form.Group>

                        </Row>
                        <Row className='mt-3'>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Drawdown Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='drawdownFee'
                                        value={facility.drawdownFee}
                                        onChange={(e) => handleChangeNumber(e, 'drawdownFee')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.drawdownFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.drawdownFee}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Commitment Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='commitmentFee'
                                        value={facility.commitmentFee}
                                        onChange={(e) => handleChangeNumber(e, 'commitmentFee')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.commitmentFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.commitmentFee}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Late Interest Charges</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='lateInterestCharges'
                                        value={facility.lateInterestCharges}
                                        onChange={(e) => handleChangeNumber(e, 'lateInterestCharges')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.lateInterestCharges && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.lateInterestCharges}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Pre-Payment</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='prePayment'
                                        value={facility.prePayment}
                                        onChange={(e) => handleChangeNumber(e, 'prePayment')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.prePayment && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.prePayment}</span>)}
                            </Form.Group>


                        </Row>

                        <Row className='mt-3'>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Cancellation Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='cancellationFee'
                                        value={facility.cancellationFee}
                                        onChange={(e) => handleChangeNumber(e, 'cancellationFee')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.cancellationFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.cancellationFee}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Agency Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='agencyFee'
                                        value={facility.agencyFee}
                                        onChange={(e) => handleChangeNumber(e, 'agencyFee')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.agencyFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.agencyFee}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Advisory Fee</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='advisoryFee'
                                        value={facility.advisoryFee}
                                        onChange={(e) => handleChangeNumber(e, 'advisoryFee')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.advisoryFee && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.advisoryFee}</span>)}
                            </Form.Group>

                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Default Interest</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name='defaultInterest'
                                        value={facility.defaultInterest}
                                        onChange={(e) => handleChangeNumber(e, 'defaultInterest')} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>

                                {error?.defaultInterest && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.defaultInterest}</span>)}
                            </Form.Group>



                        </Row>

                    </div>
                </div>

                <div>
                    <div className='form' >
                        <h4 className='fs-5 fw-bold mb-4'>Loan to Collateral Value</h4>
                        <Row>
                            <Form.Group as={Col} lg={3} controlId="formGridZip">
                                <Form.Label>Default Interest</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        name=''
                                        value={((parseInt(facility.amount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, '')) || 0) * 100).toFixed(2)}
                                        disabled={isView} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </div>


                    <div className='form' >
                        <h6 className='fs-5 fw-bold mb-4'>FACILITY DETAILS</h6>

                        {/* <h2 className='mb-0' style={{ color: "#b95f89", fontSize: "22px" }}>Loan to collateral value is currently: {((parseInt(facility.amount) / parseInt(transactionData?.details?.contractDetails?.value?.replace(/,/g, ''))) * 100).toFixed(2)} %</h2>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        <h2 className='mb-3'>Detail</h2> */}
                        <div>
                            <Row>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Type</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {
                                            setFacility({ ...facility, type: e.target.value });
                                        }}
                                        disabled={isView}
                                        value={facility.type}
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {facilityTypeOptions.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                </Form.Group>

                                {facility.type === "Others(please specify)" && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Specify Facility Type</Form.Label>
                                        <Form.Control
                                            name='specifyFacilityType'
                                            value={facility.specifyFacilityType}
                                            onChange={handleChange} />
                                        {error?.specifyFacilityType && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.specifyFacilityType}</span>)}
                                    </Form.Group>
                                )}
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Currency</Form.Label>
                                    <Form.Select
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, currency: event.target.value });
                                        }}
                                        value={facility.currency}
                                        disabled={isView}
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {CurrencyOptions.map((item) => (
                                            <option value={item.label}>{item.label}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.currency && <span style={{ color: 'red' }}>{error.currency}</span>}
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Facility Amount</Form.Label>
                                    <Form.Control
                                        name="amount"
                                        value={formateCurrencyValue(facility.amount)}
                                        onChange={(e) => handleChangeNumber(e, 'amount')}
                                        disabled={isView} />
                                    {error?.amount && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.amount}</span>)}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Repayment Currency</Form.Label>
                                    <Form.Select
                                        onChange={(event, newValue) => {
                                            setFacility({ ...facility, rePaymentCurrency: event.target.value });
                                        }}
                                        value={facility.rePaymentCurrency}
                                        disabled={isView}
                                        defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {CurrencyOptions.map((item) => (
                                            <option value={item.label}>{item.label}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.rePaymentCurrency && <span style={{ color: 'red' }}>{error.rePaymentCurrency}</span>}
                                </Form.Group>


                            </Row>

                            {(facility.currency !== facility.rePaymentCurrency && facility.rePaymentCurrency) &&
                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Did you contract a currency Hedge?</Form.Label>
                                        <Form.Select
                                            onChange={(e) => {
                                                const newValue = e.target.value === 'true'; // Convert to boolean
                                                setFacility({ ...facility, currencyHedge: newValue });
                                            }}
                                            disabled={isView}
                                            value={facility.currencyHedge.toString()} // Convert to string
                                            defaultValue={'Choose...'}>
                                            <option>Choose...</option>
                                            {currencyHedgeOptions.map((item, i) => (
                                                <option key={i} value={item.value}>{item.label}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.currencyHedge && <span style={{ color: 'red' }}>{error.currencyHedge}</span>}
                                    </Form.Group>

                                    {/* <Col>
                                        <Autocomplete
                                            options={currencyHedgeOptions}
                                            getOptionLabel={(option) => option}
                                            id="disable-clearable"
                                            label="Did you contract a currency Hedge?"
                                            renderInput={(params) => (
                                                <TextField {...params} label="Did You Contract a Currency Hedge?" variant="standard" />
                                            )}
                                            onChange={(event, newValue) => {
                                                setFacility({ ...facility, currencyHedge: newValue });
                                            }}
                                            disableClearable
                                            value={facility.currencyHedge}
                                            disabled={isView}
                                        />
                                         {error && error?.currencyHedge && <span style={{ color: 'red' }}>{error.currencyHedge}</span>}
                                    </Col> */}

                                </Row>
                            }

                            {
                                facility.currencyHedge && (facility.currency !== facility.rePaymentCurrency && facility.rePaymentCurrency) && (
                                    <>
                                        <div className='product'>
                                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                                                <h6 className="fs-5 fw-bold title-admin">Currency Hedge Details</h6>
                                                <Button onClick={() => { setCurrencyHedgeDetailsModal(true) }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                                                    <span class=' pe-2'><i class="bi bi-plus pe-1 "></i></span>
                                                    <span className='fw-bold'>Add</span>
                                                </Button>
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
                                                        onClick: (event, rowData) => { DeleteCurrencyhedgedetails(rowData) }
                                                    }
                                                ]}
                                                options={{
                                                    filtering: false,
                                                    actionsColumnIndex: -1,
                                                    sorting: false,
                                                    pageSize: 10,
                                                    search: false,
                                                }}
                                            />
                                        </div>
                                    </>)
                            }
                        </div>
                    </div>
                </div>

                <div className='add-edit-product p-0'>
                    <div className='form'>
                        <h6 className='fs-5 fw-bold mb-4'>LOAN PURPOSE JUSTIFICATION</h6>
                        <div>
                            <Row>

                                <Form.Group as={Col} lg={facility.loanPurposeValidity ? 4 : 6} controlId="formGridZip">
                                    <Form.Label>Loan Purpose</Form.Label>
                                    <Form.Control
                                        name='loanPurposJustification'
                                        value={facility.loanPurposJustification}
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.loanPurposJustification && <span style={{ color: 'red' }}>{error.loanPurposJustification}</span>}
                                </Form.Group>



                                <Form.Group as={Col} lg={facility.loanPurposeValidity ? 4 : 6} controlId="formGridZip">
                                    <Form.Label>Loan Purpose Validity</Form.Label>
                                    <Form.Select className='no-border'
                                        onChange={(e) => {
                                            const newValue = e.target.value === 'true'; // Convert to boolean
                                            setFacility({ ...facility, loanPurposeValidity: newValue });
                                        }}
                                        disabled={isView}
                                        value={facility.loanPurposeValidity.toString()} // Convert to string
                                        defaultValue={'Choose...'}>
                                        {loanPurposeValidityOptions.map((item, i) => (
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))}
                                    </Form.Select>
                                    {error && error?.loanPurposeValidity && <span style={{ color: 'red' }}>{error.loanPurposeValidity}</span>}
                                </Form.Group>
                                {/* <Col lg={facility.loanPurposeValidity === 'Yes' ? 4 : 6}>
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
                                        // setFacility({ ...facility, loanPurposeValidity: newValue === "No" ? navigate('/final-page') : "" });
                                    }}
                                    disableClearable
                                    value={facility.loanPurposeValidity}
                                    disabled={isView}
                                />
                                {error && error?.loanPurposeValidity && <span style={{ color: 'red' }}>{error.loanPurposeValidity}</span>}
                            </Col> */}
                                {facility.loanPurposeValidity && (
                                    <Form.Group as={Col} lg={4} controlId="formGridZip">
                                        <Form.Label>Loan Purpose Reason</Form.Label>
                                        <Form.Control
                                            value={facility.loanPurposeReason}
                                            name='loanPurposeReason'
                                            onChange={handleChange}
                                        />
                                        {error && error?.loanPurposeReason && <span style={{ color: 'red' }}>{error.loanPurposeReason}</span>}
                                    </Form.Group>)}

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
                                    <h6 className="fs-5 fw-bold">Source of Repayment</h6>
                   
                                    <Button onClick={() => { setAddSourceOfRepayment(true) }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-1'>
                                        <span class=' pe-2'><i class="bi bi-plus pe-1 "></i></span>
                                        <span className='fw-bold'>Add</span>
                                    </Button>

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
                                            onClick: (event, rowData) => { DeleteSourceOfRepayment(rowData) }
                                        },
                                    ]}
                                    options={{
                                        filtering: false,
                                        actionsColumnIndex: -1,
                                        sorting: false,
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

                <hr />

                <div className='form'>
                    <div className=''>
                        <h4 className='fw-bold mb-3'>Terms</h4>


                        <div>
                            {/* <div className='mb-3'> */}
                            <Row className='mb-4'>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Disbursement Mechanism</Form.Label>
                                    <Form.Control
                                        value={facility.disbursementMechanism}
                                        name='disbursementMechanism'
                                        onChange={handleChange}
                                        disabled={isView}
                                    />
                                    {error && error?.disbursementMechanism && <span style={{ color: 'red' }}>{error.disbursementMechanism}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Security Undertaking</Form.Label>
                                    <Form.Control
                                        value={facility.securityUndertaking}
                                        name='securityUndertaking'
                                        onChange={handleChange}
                                    />
                                    {error && error?.securityUndertaking && <span style={{ color: 'red' }}>{error.securityUndertaking}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Control Accounts</Form.Label>
                                    <Form.Control
                                        value={facility.controlAccounts}
                                        name='controlAccounts'
                                        disabled={isView}
                                        onChange={handleChange}
                                    />
                                    {error && error?.controlAccounts && <span style={{ color: 'red' }}>{error.controlAccounts}</span>}
                                </Form.Group>

                                {/* <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Final Maturity</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="finalMaturity"
                                        placeholder="dd-mm-yyyy"
                                        min={transactionData.details.contractDetails.contractDate ? new Date(transactionData.details.contractDetails.contractDate).toISOString().split("T")[0] : ""}
                                        value={facility.finalMaturity}
                                        onChange={handleChange}
                                    />
                                    {error && error?.finalMaturity && <span style={{ color: 'red' }}>{error.finalMaturity}</span>}
                                </Form.Group> */}

                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Final Maturity</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name='finalMaturity'
                                            value={facility.finalMaturity}
                                            onChange={(e) => handleChangeNumber(e, 'finalMaturity')} />
                                        <InputGroup.Text>Months</InputGroup.Text>
                                    </InputGroup>

                                    {error?.finalMaturity && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.finalMaturity}</span>)}
                                </Form.Group>
                            </Row>
                            {/* </div> */}
                            <Row className='mb-4'>
                                <Form.Group as={Col} lg={facility.documentation === 'Others (Please specify)' ? 3 : 4} controlId="formGridZip">
                                    <Form.Label>Documentation</Form.Label>
                                    <Form.Select
                                        onChange={(e, newValue) => {
                                            setFacility({ ...facility, documentation: e.target.value });
                                        }}
                                        value={facility.documentation}>
                                        <option>Choose...</option>
                                        {documentationOptions.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.documentation && <span style={{ color: 'red' }}>{error.documentation}</span>}
                                </Form.Group>

                                {facility.documentation === 'Others (Please specify)' && (
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Specify Documentation</Form.Label>
                                        <Form.Control
                                            value={facility.specifyDocumentation}
                                            name='specifyDocumentation'
                                            onChange={(e) =>
                                                setFacility({ ...facility, specifyDocumentation: e.target.value })
                                            } />
                                        {error?.specifyDocumentation && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.specifyDocumentation}</span>)}
                                    </Form.Group>
                                )}
                                <Form.Group as={Col} lg={facility.documentation === 'Others (Please specify)' ? 3 : 4} controlId="formGridZip">
                                    <Form.Label>Taxation Duties</Form.Label>
                                    <Form.Control
                                        value={facility.taxationDuties}
                                        name='taxationDuties'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.taxationDuties && <span style={{ color: 'red' }}>{error.taxationDuties}</span>}
                                </Form.Group>
                                <Form.Group as={Col} lg={facility.documentation === 'Others (Please specify)' ? 3 : 4} controlId="formGridZip">
                                    <Form.Label>Enforcement Courts</Form.Label>
                                    <Form.Control
                                        value={facility.jurisdiction}
                                        name='jurisdiction'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.jurisdiction && <span style={{ color: 'red' }}>{error.jurisdiction}</span>}
                                </Form.Group>
                            </Row>
                            <Row className='mb-4'>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Conditions Precedent</Form.Label>
                                    <div style={StyleSheet.container}>
                                        {facility.conditionsPrecedent && (
                                             <div ref={precedentTogref} style={viewsPrecedent ? StyleSheet.overall : StyleSheet.closeView}>
                                             {precedentOptions.map((item, i) => (
                                                 <div onClick={() => HandleSelection('conditionsPrecedent', item, precedentTogref)} style={facility.conditionsPrecedent.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                     {item}
                                                 </div>
                                             ))}
                                             {facility.conditionsPrecedent.length === precedentOptions.length && (
                                                 <div>No more options to select</div>
                                             )}
                                         </div>
                                        )}
                                       
                                        <div onClick={() => setViewsPrecedent(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.conditionsPrecedent.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.conditionsPrecedent.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('conditionsPrecedent', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.conditionsPrecedent && <span style={{ color: 'red' }}>{error.conditionsPrecedent}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Conditions Subsequent</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={subsequentTogref} style={viewsSubsequent ? StyleSheet.overall : StyleSheet.closeView}>
                                            {subsequentOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('conditionsSubsequent', item, subsequentTogref)} style={facility.conditionsSubsequent.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.conditionsSubsequent.length === subsequentOptions.length && (
                                                <div>No more options to select</div>
                                            )}
                                        </div>
                                        <div onClick={() => setViewsSubsequent(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.conditionsSubsequent.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.conditionsSubsequent.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('conditionsSubsequent', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.conditionsSubsequent && <span style={{ color: 'red' }}>{error.conditionsSubsequent}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Borrower Affirmative Covenants</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={bacTogref} style={viewsBac ? StyleSheet.overall : StyleSheet.closeView}>
                                            {bacovOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('borrowerAffirmativeCovenants', item, bacTogref)} style={facility.borrowerAffirmativeCovenants.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.borrowerAffirmativeCovenants.length === bacovOptions.length && (
                                                <div>No more options to select</div>
                                            )}
                                        </div>
                                        <div onClick={() => setViewsBac(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.borrowerAffirmativeCovenants.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.borrowerAffirmativeCovenants.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('borrowerAffirmativeCovenants', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.borrowerAffirmativeCovenants && <span style={{ color: 'red' }}>{error.borrowerAffirmativeCovenants}</span>}
                                </Form.Group>
                            </Row>

                            <Row className='mb-4'>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Financial Covenants</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={fincovTogref} style={viewsFincov ? StyleSheet.overall : StyleSheet.closeView}>
                                            {fincovOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('financialCovenants', item, fincovTogref)} style={facility.financialCovenants.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.financialCovenants.length === fincovOptions.length && (
                                                <div>No more options to select</div>
                                            )}
                                        </div>
                                        <div onClick={() => setViewsFincov(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.financialCovenants.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.financialCovenants.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('financialCovenants', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.financialCovenants && <span style={{ color: 'red' }}>{error.financialCovenants}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Information Covenants</Form.Label><div style={StyleSheet.container}>
                                        <div ref={infocovTogref} style={viewsInfo ? StyleSheet.overall : StyleSheet.closeView}>
                                            {infcovOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('informationCovenants', item, infocovTogref)} style={facility.informationCovenants.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.informationCovenants.length === infcovOptions.length && (
                                                <div>No more options to select</div>
                                            )}
                                        </div>
                                        <div onClick={() => setViewsInfo(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.informationCovenants.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.informationCovenants.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('informationCovenants', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.informationCovenants && <span style={{ color: 'red' }}>{error.informationCovenants}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>General Undertakings</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={undertakingsTogref} style={viewsUndertakings ? StyleSheet.overall : StyleSheet.closeView}>
                                            {genovertakingOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('generalUndertakings', item, undertakingsTogref)} style={facility.generalUndertakings.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.generalUndertakings.length === genovertakingOptions.length && (
                                                <div>No more options to select</div>
                                            )}
                                        </div>
                                        <div onClick={() => setViewsUndertakings(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.generalUndertakings.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.generalUndertakings.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('generalUndertakings', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.generalUndertakings && <span style={{ color: 'red' }}>{error.generalUndertakings}</span>}
                                </Form.Group>


                            </Row>

                            <Row className='mb-4'>
                                <Form.Group as={Col} lg={6} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Cost and Expenses</Form.Label>
                                    <Form.Control as="textarea" rows={2}
                                        value={facility.expenses}
                                        name='expenses'
                                        onChange={handleChange} />
                                    {error && error?.expenses && <span style={{ color: 'red' }}>{error.expenses}</span>}
                                </Form.Group>



                                <Form.Group as={Col} lg={6} controlId="formGridZip">
                                    <Form.Label>Approvals</Form.Label>
                                    <Form.Control as="textarea" rows={2}
                                        value={facility.approvals}
                                        name='approvals'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.approvals && <span style={{ color: 'red' }}>{error.approvals}</span>}
                                </Form.Group>


                            </Row>
                            <Row className='mb-4'>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Availability Period</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            name='availabilityPeriod'
                                            value={facility.availabilityPeriod}
                                            onChange={(e) => handleChangeNumber(e, 'availabilityPeriod')} />
                                        <InputGroup.Text>Months</InputGroup.Text>
                                    </InputGroup>

                                    {error && error?.availabilityPeriod && <span style={{ color: 'red' }}>{error.availabilityPeriod}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Repayment</Form.Label>
                                    <Form.Control
                                        value={facility.repayment}
                                        name='repayment'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.repayment && <span style={{ color: 'red' }}>{error.repayment}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Transaction Structure</Form.Label>
                                    <Form.Control
                                        value={facility.transactionStructure}
                                        name='transactionStructure'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.transactionStructure && <span style={{ color: 'red' }}>{error.transactionStructure}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Permitted Accounts</Form.Label>
                                    <Form.Control
                                        value={facility.permittedAccounts}
                                        name='permittedAccounts'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.permittedAccounts && <span style={{ color: 'red' }}>{error.permittedAccounts}</span>}
                                </Form.Group>

                            </Row>


                            <Row className='mb-4'>
                                <Form.Group as={Col} lg={3} controlId="formGridZip">
                                    <Form.Label>Governing Law</Form.Label>
                                    <Form.Select
                                        onChange={(e, newValue) => {
                                            setFacility({ ...facility, governingLaw: e.target.value });
                                        }}
                                        disabled={isView}
                                        value={facility.governingLaw}>
                                        <option>Choose...</option>
                                        {governLawOptions.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.governingLaw && <span style={{ color: 'red' }}>{error.governingLaw}</span>}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Assignments</Form.Label>
                                    <Form.Control
                                        value={facility.assignments}
                                        name='assignments'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.assignments && <span style={{ color: 'red' }}>{error.assignments}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Miscellaneous Provisions</Form.Label>
                                    <Form.Control
                                        value={facility.miscellaneousProvisions}
                                        name='miscellaneousProvisions'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.miscellaneousProvisions && <span style={{ color: 'red' }}>{error.miscellaneousProvisions}</span>}
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Force Majeure</Form.Label>
                                    <Form.Control
                                        value={facility.forceMajeure}
                                        name='forceMajeure'
                                        onChange={handleChange}
                                        disabled={isView} />
                                    {error && error?.forceMajeure && <span style={{ color: 'red' }}>{error.forceMajeure}</span>}
                                </Form.Group>

                                {/* <Form.Group as={Col} controlId="formFileMultiple">
                                    <Form.Label>Upload Termsheet</Form.Label>
                                    <Form.Control
                                        type="file"
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
                                        name="roleName"
                                        multiple
                                    />
                                    {error?.securityDocuments && <span style={{ color: 'red' }}>{error?.securityDocuments}</span>}
                                </Form.Group> */}

                            </Row>

                            <Row className='mb-5'>
                                <Form.Group className="col-md-6">
                                    <Form.Label>Representations</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={repsTogref} style={viewsReps ? StyleSheet.overall : StyleSheet.closeView}>
                                            {repsOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('representations', item, repsTogref)} style={facility.representations.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.representations.length === repsOptions.length && <div>No more options to select</div>}
                                        </div>
                                        <div onClick={() => setViewsReps(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.representations.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.representations.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('representations', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (<span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.representations && <span style={{ color: 'red' }}>{error.representations}</span>}
                                </Form.Group>



                                {/* <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Representions</Form.Label>
                                    <Form.Select
                                        onChange={(e, newValue) => {
                                            setFacility({ ...facility, representations: e.target.value });
                                        }}
                                        disabled={isView}
                                        value={facility.representations}>
                                        <option>Choose...</option>
                                        {repsOptions.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}

                                    </Form.Select>
                                    {error && error?.representations && <span style={{ color: 'red' }}>{error.representations}</span>}
                                </Form.Group> */}



                                <Form.Group className="col-md-6">
                                    <Form.Label>Events Of Default</Form.Label>
                                    <div style={StyleSheet.container}>
                                        <div ref={eventsTogref} style={eventOfDefault ? StyleSheet.overall : StyleSheet.closeView}>
                                            {repsOptions.map((item, i) => (
                                                <div onClick={() => HandleSelection('eventsOfDefault', item, eventsTogref)} style={facility.eventsOfDefault.includes(item) ? StyleSheet.datashown : StyleSheet.data} key={i}>
                                                    {item}
                                                </div>
                                            ))}
                                            {facility.eventsOfDefault.length === repsOptions.length && <div>No more options to select</div>}
                                        </div>
                                        <div onClick={() => setEventOfDefault(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                                            {facility.eventsOfDefault.length > 0 ? (
                                                <div style={StyleSheet.showRoom}>
                                                    {facility.eventsOfDefault.map((item, i) => (
                                                        <div style={StyleSheet.roomItem} key={i}>
                                                            {item}
                                                            <div onClick={() => RemoveContent('eventsOfDefault', item)} style={StyleSheet.cancelButton}>
                                                                <span style={{ color: "#6b7070" }} className='me-1'>|</span>  X
                                                            </div>{' '}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (<span>--Select Multiple Options--</span>
                                            )}
                                        </div>
                                    </div>
                                    {error && error?.eventsOfDefault && <span style={{ color: 'red' }}>{error.eventsOfDefault}</span>}
                                </Form.Group>

                                {/* <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Events of Default</Form.Label>
                                    <Form.Control
                                        value={facility.eventsOfDefault}
                                        name='eventsOfDefault'
                                        onChange={handleChange}
                                        disabled={isView} />
                                   
                                </Form.Group> */}

                            </Row>
                        </div>
                    </div>
                </div>
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { navigate('/final-page') }} className={`footer_next_btn ${isView ? 'd-block' : 'd-none'}`}>Exit</button>
                    <button onClick={() => { id ? edit() : save() }} className={`footer_next_btn ${isView && 'd-none'}`}>
                        {!loading ? <>{id ? "Close" : "Save"}</> : null}
                        {loading && <div class="d-flex justify-content-center">
                            <strong className='me-2'>Saving...</strong>
                            <div className="spinner-border spinner-border-sm mt-1" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                    </button>
                </div>
            </div >
            {addSourceOfRepayment && <AddSourceOfRepayment show={addSourceOfRepayment} onHide={() => { setAddSourceOfRepayment(false); setRowEditData('') }} getModalData={(e) => setSourceOfRepayment([...sourceOfRepayment, e])} data={rowEditData} getEditData={(e) => propsEditData(e)} isView={view} />
            }
            {/* {showTextEditor && <TextEditerModal show={showTextEditor} onHide={() => setShowTextEditor(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={facility[selectedName]} />} */}
            {currencyHedgeDetailsModal && <CurrencyHedgeDetailsModal show={currencyHedgeDetailsModal} onHide={() => { setCurrencyHedgeDetailsModal(false); setEditRowData("") }} getModalData={(e, id) => editModalData(e, id)} editRowData={editRowData} />}
        </>
    )
}

export default Facility

const StyleSheet = {
    container: {
    },
    closeView: { display: 'none' },
    overall: {
        width: '95%',
        margin: '0 auto',
        height: '30rem',
        backgroundColor: '#fff',
        position: 'absolute',
        border: '1px solid lightgrey',
        top: '5rem',
        left: 0,
        right: 0,
        overflowY: 'auto',
        display: 'block',
        zIndex: '3',
    },
    data: {
        padding: '0.5rem',
        fontSize: '0.8rem',
        cursor: 'pointer',
    },
    datashown: {
        padding: '0.3rem',
        borderBottom: '1px solid lightgrey',
        cursor: 'pointer',
        backgroundColor: 'lightgrey',
        color: 'white',
    },
    input: {
        width: '100%',
        border: '1px solid lightgrey',
        padding: '1rem'
    },
    showRoom: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
    },
    roomItem: {
        padding: '0.2rem 0.3rem',
        border: '1px solid lightgrey',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.7rem',
        backgroundColor: '#00BCD4',
        color: 'white'
    },
    cancelButton: {
        borderRadius: '999px',
        // fontSize: '0.8rem',
        backgroundColor: '#00BCD4',
        color: '#dae4e5',
        padding: '0.01rem 0.5rem',
        cursor: 'pointer'
    },
    fieldPadding: {
        padding: '6px'
    }
}