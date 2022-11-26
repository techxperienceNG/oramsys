import { TextField, } from '@material-ui/core'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import LCPartiesModal from '../../component/Modal/LCPartiesModal'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextEditerModal from '../../component/Modal/TextEditerModal'
import { useDispatch, useSelector } from 'react-redux';
import { countrieAction } from '../../redux/actions/countrieAction'
import { entityGetAction } from '../../redux/actions/entityAction'
import { CurrencyOptions } from '../../helper/common'
import { transactionDataAction } from '../../redux/actions/transactionDataAction'
import { formatCurrency } from '../../helper/utils'
import { useLocation } from 'react-router-dom'

const FundFlow = ({ hendelCancel, hendelNext }) => {

    const dispatch = useDispatch()

    const [fundFlow, setfundFlow] = useState({
        _id: "",
        contractCurrency: "",
        contractValue: "",

        paymentMethod: "",
        openAccount: "",

        paymentDate: "",
        terms: "",
        paymentOrigin: "",
        beneficiary: "",
        additonalCharges: false,

        payer: "",
        dutiesCurrency: "",
        dutiesValue: "",
        taxesCurrency: "",
        taxesValue: "",
        certificationCurrency: "",
        certificationValue: "",
        leviesCurrency: "",
        leviesValue: "",
    })

    const [showTextEditor, setShowTextEditor] = useState(false)
    const [lettersOfCredit, setLettersOfCredit] = useState([])
    const [editeRowData, setEditeRowData] = useState({})

    const location = useLocation()
    const isView = location?.state[2]?.isView

    const [showEditModal, setShowEditModal] = useState(false)
    const [type, setType] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [country, setCountry] = useState([])
    const [beneficiary, setbeneficiary] = useState([])
    const [error, setError] = useState({})

    const transactionData = useSelector((state) => state.transactionData.transactionData)
    const paymentOrigin = useSelector(state => state.countryData.country)
    const beneficiaries = useSelector(state => state.entityData.entity)
    const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById)

    useEffect(() => {
        dispatch(countrieAction('all'))
        dispatch(entityGetAction('Company'))
    }, [])

    useEffect(() => {
        console.log('transactionData', transactionData)
        setfundFlow({
            ...fundFlow,
            contractCurrency: transactionData?.details?.contractDetails?.currency,
            contractValue: transactionData?.details?.contractDetails?.value,
        })
    }, [transactionData])


    useEffect(() => {
        if (getTransactionByIdData && getTransactionByIdData.data) {
            console.log("getTransactionByIdData====", getTransactionByIdData.data)
            setfundFlow({
                _id: getTransactionByIdData.data?.fundFlow?._id,
                contractCurrency: getTransactionByIdData.data?.fundFlow?.contractCurrency,
                contractValue: getTransactionByIdData.data?.fundFlow?.contractValue,

                paymentMethod: getTransactionByIdData.data?.fundFlow?.paymentMethod,
                openAccount: getTransactionByIdData.data?.fundFlow?.openAccount,

                paymentDate: getTransactionByIdData.data?.fundFlow?.paymentDate,
                terms: getTransactionByIdData.data?.fundFlow?.terms,
                paymentOrigin: getTransactionByIdData.data?.fundFlow?.paymentOrigin?._id,
                beneficiary: getTransactionByIdData.data?.fundFlow?.beneficiary?._id,
                additonalCharges: getTransactionByIdData.data?.fundFlow?.additonalCharges,

                payer: getTransactionByIdData.data?.fundFlow?.payer?._id,
                dutiesCurrency: getTransactionByIdData.data?.fundFlow?.dutiesCurrency,
                dutiesValue: getTransactionByIdData.data?.fundFlow?.dutiesValue,
                taxesCurrency: getTransactionByIdData.data?.fundFlow?.taxesCurrency,
                taxesValue: getTransactionByIdData.data?.fundFlow?.taxesValue,
                certificationCurrency: getTransactionByIdData.data?.fundFlow?.certificationCurrency,
                certificationValue: getTransactionByIdData.data?.fundFlow?.certificationValue,
                leviesCurrency: getTransactionByIdData.data?.fundFlow?.leviesCurrency,
                leviesValue: getTransactionByIdData.data?.fundFlow?.leviesValue,
            })
            setLettersOfCredit(getTransactionByIdData.data?.fundFlow?.lettersOfCredit.map((ele) => {
                return {
                    applicant: { value: ele?.applicant?._id, label: ele?.applicant?.details?.name },
                    issuingBank: { value: ele?.issuingBank?._id, label: ele?.issuingBank?.details?.name },
                    beneficiary: { value: ele?.beneficiary?._id, label: ele?.beneficiary?.details?.name },
                    advisingBank: { value: ele?.advisingBank?._id, label: ele?.advisingBank?.details?.name },
                    confirmingBank: { value: ele?.confirmingBank?._id, label: ele?.confirmingBank?.details?.name },
                    negotiatingBank: { value: ele?.negotiatingBank?._id, label: ele?.negotiatingBank?.details?.name },
                    secondBeneficiary: { value: ele?.secondBeneficiary?._id, label: ele?.secondBeneficiary?.details?.name },
                    reimbursingBank: { value: ele?.reimbursingBank?._id, label: ele?.reimbursingBank?.details?.name },
                }
            }))
        }
    }, [getTransactionByIdData])

    const handleChange = (event) => {
        setfundFlow({
            ...fundFlow,
            [event.target.name]: event.target.value
        });
    }

    const hadleChangeModal = (e) => {
        setfundFlow({
            ...fundFlow,
            [e.name]: e.value
        });
    }

    const setdata = (data) => {
        console.log("data====", data)
        setLettersOfCredit([data])
    }

    useEffect(() => {
        if (paymentOrigin && paymentOrigin.data) {
            setCountry(paymentOrigin?.data)
        }
    }, [paymentOrigin])

    useEffect(() => {
        if (beneficiaries && beneficiaries.data && beneficiaries.status === 200) {
            setbeneficiary(beneficiaries.data)
        }
    }, [beneficiaries])

    const termsOptions = [
        'At sight',
        '30 Day',
        '45 Days',
        '60 Days',
        '90 Days',
        '180 Days',
    ]

    const additonalChargesOption = [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
    ]

    const paymentMethodOption = [
        'Cash against documents (CAD)',
        'Documents against acceptance (DAA)',
        'Letter of Credit (LC)',
        'Open account',
    ]

    const handleChangeNumber = (e, name) => {
        if (name === "taxesValue" || name === "certificationValue" || name === "leviesValue") {
            setfundFlow({ ...fundFlow, [name]: e.target.value })
        }
    }

    const handleChnage = (e) => {
        setfundFlow({
            ...fundFlow,
            [e.target.name]: e.target.value
        })
    }

    const next = () => {
        if (validation()) {
            return
        }
        let body = {
            ...transactionData,
            fundFlow: {
                ...fundFlow,
                lettersOfCredit
            }
        }
        dispatch(transactionDataAction(body))
        hendelNext()
    }

    const validation = () => {
        let flag = false
        let error = {}

        if (!fundFlow.contractCurrency) {
            flag = true
            error.contractCurrency = ' Please enter contract currency!'
        }

        if (!fundFlow.contractValue) {
            flag = true
            error.contractValue = ' Please enter contract value!'
        }

        if (!fundFlow.paymentMethod) {
            flag = true
            error.paymentMethod = ' Please enter payment method!'
        }

        if (fundFlow.paymentMethod === 'Open account' && !fundFlow.openAccount) {
            flag = true
            error.openAccount = ` Please enter for 'Open account', specify terms as per contract!`
        }

        if (!fundFlow.paymentDate) {
            flag = true
            error.paymentDate = 'Please enter payment date'
        }

        if (!fundFlow.terms) {
            flag = true
            error.terms = 'Please enter terms'
        }

        if (!fundFlow.paymentOrigin) {
            flag = true
            error.paymentOrigin = 'Please enter payment origin'
        }

        if (!fundFlow.beneficiary) {
            flag = true
            error.beneficiary = 'Please enter beneficiary'
        }

        if (fundFlow.additonalCharges === "") {
            flag = true
            error.additonalCharges = 'Please enter additonal charges'
        }

        if (fundFlow.additonalCharges && !fundFlow.payer) {
            flag = true
            error.payer = 'Please enter payer'
        }

        if (fundFlow.additonalCharges && !fundFlow.dutiesCurrency) {
            flag = true
            error.dutiesCurrency = 'Please enter duties currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.dutiesValue) {
            flag = true
            error.dutiesValue = 'Please enter duties value'
        }

        if (fundFlow.additonalCharges && !fundFlow.taxesCurrency) {
            flag = true
            error.taxesCurrency = 'Please enter taxes currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.taxesValue) {
            flag = true
            error.taxesValue = 'Please enter taxes value'
        }

        if (fundFlow.additonalCharges && !fundFlow.certificationCurrency) {
            flag = true
            error.certificationCurrency = 'Please enter Certification currency'
        }

        if (fundFlow.additonalCharges && !fundFlow.certificationValue) {
            flag = true
            error.certificationValue = 'Please enter Certification value'
        }

        if (fundFlow.additonalCharges && !fundFlow.leviesCurrency) {
            flag = true
            error.leviesCurrency = 'Please enter levies Certification'
        }

        if (fundFlow.additonalCharges && !fundFlow.leviesValue) {
            flag = true
            error.leviesValue = 'Please enter levies value'
        }
        setError(error)
        return flag

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
            // let prefix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.prefix
            // let suffix = CurrencyOptions.find((ele) => ele.label === fundFlow?.dutiesCurrency)?.suffix
            // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
            return value
        } else {
            return data
        }
    }



    return (
        <>
            <div className='add-edit-product'>
                <div className='form'>
                    <h5 className="title-color">Contract value</h5>
                    <Row>
                        <Col lg={6}>
                            <Autocomplete
                                options={CurrencyOptions}
                                getOptionLabel={(option) => option.label}
                                id="disable-clearable"
                                label="Contract currency"
                                renderInput={(params) => (
                                    <TextField {...params} label="Contract currency" variant="standard" />
                                )}
                                onChange={(event, newValue) => {
                                    setfundFlow({ ...fundFlow, contractCurrency: newValue.label });
                                }}
                                value={(CurrencyOptions.length > 0 && fundFlow.contractCurrency) && CurrencyOptions.find((ele) => ele.label === fundFlow.contractCurrency)}
                                disableClearable
                                disabled={isView || fundFlow.contractCurrency.length > 0}
                            />
                            {error && error.contractCurrency && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.contractCurrency}</span>}
                        </Col>
                        <Col lg={6}>
                            <TextField
                                label="Contract value"
                                variant="standard"
                                color="warning"
                                value={formateCurrencyValue(fundFlow.contractValue)}
                                name="contractValue"
                                onChange={handleChange}
                                disabled={isView || fundFlow.contractValue.length > 0}
                            />
                            {error && error.contractValue && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.contractValue}</span>}
                        </Col>
                    </Row>
                </div>
                <div className='add-edit-product p-0'>
                    <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                        <h2 className='mb-3'>Payment method</h2>
                        <div>
                            <Row>
                                <Col lg={fundFlow.paymentMethod === 'Open account' ? 6 : 12}>
                                    <Autocomplete
                                        options={paymentMethodOption}
                                        getOptionLabel={(option) => option}
                                        id="disable-clearable"
                                        label="Payment method"
                                        renderInput={(params) => (
                                            <TextField {...params} label="Payment method" variant="standard" />
                                        )}
                                        onChange={(event, newValue) => {
                                            setfundFlow({
                                                ...fundFlow,
                                                paymentMethod: newValue,
                                                openAccount: '',
                                            });
                                            setLettersOfCredit([])
                                        }}
                                        value={fundFlow.paymentMethod}
                                        disableClearable
                                        disabled={isView}
                                    />
                                    {error && error.paymentMethod && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.paymentMethod}</span>}
                                </Col>
                                {
                                    fundFlow.paymentMethod === 'Open account' &&
                                    <Col lg={6}>
                                        <TextField
                                            label="For 'Open account', specify terms as per contract"
                                            variant="standard"
                                            color="warning"
                                            // disabled
                                            name='openAccount'
                                            value={fundFlow.openAccount}
                                            multiline
                                            maxRows={3}
                                            onChange={(e) => handleChnage(e)}
                                        // onClick={() => { setShowTextEditor(true); setType(`'For 'Open account', specify terms as per contract'`); setSelectedName('openAccount') }}
                                        />
                                        {error && error.openAccount && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.openAccount}</span>}
                                    </Col>
                                }
                                {
                                    fundFlow.paymentMethod === 'Letter of Credit (LC)' &&
                                    <>
                                        <div className='product'>
                                            <div className='mb-3 d-flex justify-content-between align-items-center'>
                                                <h5 className="title-color">Letters of credit</h5>
                                                <button className={`add_btn me-3 ${lettersOfCredit.length && 'd-none'} ${isView ? 'd-none' : 'd-block'}`} onClick={() => setShowEditModal(!showEditModal)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                                            </div>
                                            {lettersOfCredit.length > 0 ? <MaterialTable
                                                title="LC Parties"
                                                columns={[
                                                    { title: 'Name', field: 'applicant.label' },
                                                    { title: 'Label', field: 'issuingBank.label' },
                                                    { title: 'Courtries', field: 'beneficiary.label' },
                                                    { title: 'advisingBank', field: 'advisingBank.label' },
                                                    { title: 'conformingBank', field: 'confirmingBank.label' },
                                                    { title: 'negotiatingBank', field: 'negotiatingBank.label' },
                                                    { title: 'reimbursingBank', field: 'reimbursingBank.label' },
                                                    { title: 'secondBeneficiary', field: 'secondBeneficiary.label' },
                                                ]}
                                                data={lettersOfCredit}
                                                actions={isView ? [{
                                                    icon: 'preview',
                                                    tooltip: 'View LC Party',
                                                    onClick: (event, rowData) => setShowEditModal(!showEditModal)
                                                }] : [
                                                    {
                                                        icon: 'edit',
                                                        tooltip: 'Edit LC Party',
                                                        onClick: (event, rowData) => { setShowEditModal(!showEditModal); setEditeRowData(rowData) }
                                                    },
                                                    {
                                                        icon: 'preview',
                                                        tooltip: 'View LC Party',
                                                        onClick: (event, rowData) => setShowEditModal(!showEditModal)
                                                    }
                                                ]}
                                                options={{
                                                    filtering: true,
                                                    actionsColumnIndex: -1,
                                                    sorting: true,
                                                    pageSize: 1,
                                                    search: false,
                                                    emptyRowsWhenPaging: false,
                                                }}
                                            /> : 'No data found'}
                                        </div>
                                    </>
                                }
                            </Row>
                        </div>
                    </div>
                </div>
                <div className='form'>
                    <h5 className="title-color">Payment terms</h5>
                    <Row className='mb-3'>
                        <Col lg={3}>
                            <form className="" noValidate>
                                <TextField
                                    id="date"
                                    label="Payment date"
                                    type="date"
                                    name='paymentDate'
                                    value={fundFlow.paymentDate}
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
                            {error && error.paymentDate && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.paymentDate}</span>}
                        </Col>
                        <Col lg={3}>
                            <Autocomplete
                                options={termsOptions}
                                getOptionLabel={(option) => option}
                                id="disable-clearable"
                                label="Terms"
                                renderInput={(params) => (
                                    <TextField {...params} label="Terms" variant="standard" />
                                )}
                                onChange={(event, newValue) => {
                                    setfundFlow({ ...fundFlow, terms: newValue });
                                }}
                                disabled={isView}
                                value={(termsOptions.length > 0 && fundFlow.terms) && termsOptions.find((ele) => ele === fundFlow.terms)}
                                disableClearable
                            />
                            {error && error.terms && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.terms}</span>}
                        </Col>
                        <Col lg={3}>
                            <Autocomplete
                                options={country}
                                getOptionLabel={(option) => option.name}
                                id="disable-clearable"
                                label="Payment origin"
                                renderInput={(params) => (
                                    <TextField {...params} label="Payment origin" variant="standard" />
                                )}
                                onChange={(event, newValue) => {
                                    setfundFlow({ ...fundFlow, paymentOrigin: newValue._id });
                                }}
                                disabled={isView}
                                value={(country.length > 0 && fundFlow.paymentOrigin) && country.find((ele) => ele._id === fundFlow.paymentOrigin)}
                                disableClearable
                            />
                            {error && error.paymentOrigin && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.paymentOrigin}</span>}
                        </Col>
                        <Col lg={3}>
                            <Autocomplete
                                options={beneficiary}
                                getOptionLabel={(option) => option?.details?.name}
                                id="disable-clearable"
                                label="Beneficiary"
                                renderInput={(params) => (
                                    <TextField {...params} label="Beneficiary" variant="standard" />
                                )}
                                disabled={isView}
                                onChange={(event, newValue) => {
                                    setfundFlow({ ...fundFlow, beneficiary: newValue._id });
                                }}
                                value={(beneficiary.length > 0 && fundFlow.beneficiary) && beneficiary.find((ele) => ele._id === fundFlow.beneficiary)}
                                disableClearable
                            />
                            {error && error.beneficiary && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.beneficiary}</span>}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Autocomplete
                                options={additonalChargesOption}
                                getOptionLabel={(option) => option.label}
                                id="disable-clearable"
                                label="Additonal charges"
                                renderInput={(params) => (
                                    <TextField {...params} label="Additonal charges" variant="standard" />
                                )}
                                disabled={isView}
                                value={(additonalChargesOption.length > 0 && fundFlow.additonalCharges === true || fundFlow.additonalCharges === false) && additonalChargesOption.find((ele) => ele.value === fundFlow.additonalCharges)}
                                onChange={(event, newValue) => {
                                    setfundFlow({
                                        ...fundFlow,
                                        additonalCharges: newValue.value,
                                        payer: "",
                                        dutiesCurrency: "",
                                        dutiesValue: "",
                                        taxesCurrency: "",
                                        taxesValue: "",
                                        certificationCurrency: "",
                                        certificationValue: "",
                                        leviesCurrency: "",
                                        leviesValue: "",
                                    });
                                }}
                                disableClearable
                            />
                            {error && error.additonalCharges && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.additonalCharges}</span>}
                        </Col>
                    </Row>
                </div>
                {
                    fundFlow.additonalCharges &&
                    <>
                        <div className='add-edit-product p-0'>
                            <div className='form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                                <h2 className='mb-3'>Additional charges</h2>
                                <div>
                                    <Row>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={beneficiary}
                                                getOptionLabel={(option) => option?.details?.name}
                                                id="disable-clearable"
                                                label="Payer"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Payer" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setfundFlow({ ...fundFlow, payer: newValue._id });
                                                }}
                                                value={(beneficiary.length > 0 && fundFlow.payer) && beneficiary.find((ele) => ele._id === fundFlow.payer)}
                                                disableClearable
                                                disabled={isView}
                                            />
                                            {error && error.payer && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.payer}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={CurrencyOptions}
                                                getOptionLabel={(option) => option?.label}
                                                id="disable-clearable"
                                                label="Duties currency"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Duties currency" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setfundFlow({ ...fundFlow, dutiesCurrency: newValue.label });
                                                }}
                                                disabled={isView}
                                                value={(CurrencyOptions.length > 0 && fundFlow.dutiesCurrency) && CurrencyOptions.find((ele) => ele.label === fundFlow.dutiesCurrency)}
                                                disableClearable
                                            />
                                            {error && error.dutiesCurrency && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.dutiesCurrency}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Duties value"
                                                variant="standard"
                                                color="warning"
                                                name="dutiesValue"
                                                value={formateCurrencyValue(fundFlow.dutiesValue)}
                                                onChange={(e) => handleChange(e)}
                                                disabled={isView}
                                            />
                                            {error && error.dutiesValue && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.dutiesValue}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={CurrencyOptions}
                                                getOptionLabel={(option) => option?.label}
                                                id="disable-clearable"
                                                label="Taxes currency"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Taxes currency" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setfundFlow({ ...fundFlow, taxesCurrency: newValue?.label });
                                                }}
                                                disabled={isView}
                                                value={(CurrencyOptions.length > 0 && fundFlow.taxesCurrency) && CurrencyOptions.find((ele) => ele.label === fundFlow.taxesCurrency)}
                                                disableClearable
                                            />
                                            {error && error.taxesCurrency && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.taxesCurrency}</span>}
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={3}>
                                            <TextField
                                                label="Taxes value"
                                                variant="standard"
                                                color="warning"
                                                name="taxesValue"
                                                value={formateCurrencyValue(fundFlow.taxesValue)}
                                                onChange={(e) => handleChangeNumber(e, 'taxesValue')}
                                                disabled={isView}
                                            />
                                            {error && error.taxesValue && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.taxesValue}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={CurrencyOptions}
                                                getOptionLabel={(option) => option?.label}
                                                id="disable-clearable"
                                                label="Certification currency"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Certification currency" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setfundFlow({ ...fundFlow, certificationCurrency: newValue?.label });
                                                }}
                                                disabled={isView}
                                                value={(CurrencyOptions.length > 0 && fundFlow.certificationCurrency) && CurrencyOptions.find((ele) => ele.label === fundFlow.certificationCurrency)}
                                                disableClearable
                                            />
                                            {error && error.certificationCurrency && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.certificationCurrency}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Certification value"
                                                variant="standard"
                                                color="warning"
                                                name='certificationValue'
                                                value={formateCurrencyValue(fundFlow.certificationValue)}
                                                onChange={(e) => handleChangeNumber(e, 'certificationValue')}
                                                disabled={isView}
                                            />
                                            {error && error.certificationValue && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.certificationValue}</span>}
                                        </Col>
                                        <Col lg={3}>
                                            <Autocomplete
                                                options={CurrencyOptions}
                                                getOptionLabel={(option) => option?.label}
                                                id="disable-clearable"
                                                label="Levies currency"
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Levies currency" variant="standard" />
                                                )}
                                                onChange={(event, newValue) => {
                                                    setfundFlow({ ...fundFlow, leviesCurrency: newValue?.label });
                                                }}
                                                disabled={isView}
                                                value={(CurrencyOptions.length > 0 && fundFlow.leviesCurrency) && CurrencyOptions.find((ele) => ele.label === fundFlow.leviesCurrency)}
                                                disableClearable
                                            />
                                            {error && error.leviesCurrency && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.leviesCurrency}</span>}
                                        </Col>
                                    </Row>

                                    <Row className='mt-3'>
                                        <Col>
                                            <TextField
                                                label="Levies value"
                                                variant="standard"
                                                color="warning"
                                                name='leviesValue'
                                                value={formateCurrencyValue(fundFlow.leviesValue)}
                                                onChange={(e) => handleChangeNumber(e, 'leviesValue')}
                                                disabled={isView}
                                            />
                                            {error && error.leviesValue && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.leviesValue}</span>}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        <div className='add-edit-product p-0'>
                            <div className='form'>
                                <h2 className='mb-3'>Taxes Computation</h2>
                                <div>
                                    <Row>
                                        <Col lg={3}>
                                            <TextField
                                                label="Taxes value"
                                                variant="standard"
                                                color="warning"
                                                value={fundFlow.dutiesValue ? fundFlow.taxesValue ? formateCurrencyValue(JSON.stringify(parseInt(fundFlow.taxesValue.replace(",", "")) + parseInt(fundFlow.dutiesValue.replace(",", "")))) : formateCurrencyValue(fundFlow.dutiesValue) : (fundFlow.taxesValue ? formateCurrencyValue(fundFlow.taxesValue) : formateCurrencyValue(fundFlow.dutiesValue))}
                                                disabled
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Taxes currency"
                                                variant="standard"
                                                color="warning"
                                                value={fundFlow.taxesCurrency}
                                                disabled
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Receiver Payout"
                                                variant="standard"
                                                color="warning"
                                                value={fundFlow.certificationValue ? fundFlow.leviesValue ? formateCurrencyValue(JSON.stringify(parseInt(fundFlow.leviesValue.replace(",", "")) + parseInt(fundFlow.certificationValue.replace(",", "")))) : formateCurrencyValue(fundFlow.certificationValue) : (fundFlow.leviesValue ? formateCurrencyValue(fundFlow.leviesValue) : formateCurrencyValue(fundFlow.certificationValue))}
                                                disabled
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <TextField
                                                label="Receiver Payout currency"
                                                variant="standard"
                                                color="warning"
                                                value={fundFlow.certificationCurrency}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <div className='footer_'>
                    <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
                    <button onClick={() => { next() }} className='footer_next_btn'> Next</button>
                </div>
            </div>

            {showEditModal && <LCPartiesModal show={showEditModal} onHide={() => setShowEditModal(false)} addParties={(e) => setdata(e)} data={editeRowData} />}
            {showTextEditor && <TextEditerModal show={showTextEditor} onHide={() => setShowTextEditor(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={fundFlow.openAccount} />}
        </>
    )
}

export default FundFlow