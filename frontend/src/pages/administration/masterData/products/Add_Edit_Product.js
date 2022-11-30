import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAddAction, productGetByIdAction, productUpdateAction } from '../../../../redux/actions/productAction';
import moment from 'moment';
import { PRODUCTADD, PRODUCT_GET_BY_ID, PRODUCT_UPDATE } from '../../../../redux/types';
import { toast } from 'react-toastify'
import Autocomplete from "@material-ui/lab/Autocomplete";

const Add_Edit_Product = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id')
  const location = useLocation();
  const isView = location.state?.isView

  const [state, setState] = React.useState({
    name: "",
    nature: "",
    family: "",
    unit: "",
    category: "",
    type: "",
    status: "",
    expiryDate: "",
    matric: "",
  });
  const [error, setError] = useState()

  const oneProductData = useSelector(state => state.product.productGetId)
  const productUpdated = useSelector(state => state.product.productUpdate)
  const productAddData = useSelector(state => state.product.productAdd)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(productGetByIdAction(id))
    }
  }, [id])

  useEffect(() => {
    return (() => {
      dispatch({
        type: PRODUCT_GET_BY_ID,
        payload: null
      })
    })
  }, [])

  useEffect(() => {
    if (oneProductData && oneProductData.data) {
      setState({
        ...state,
        name: oneProductData.data.name,
        unit: oneProductData.data.unit,
        nature: oneProductData.data.nature,
        family: oneProductData.data.family,
        category: oneProductData.data.category,
        type: oneProductData.data.type,
        status: oneProductData.data.status,
        expiryDate: moment(oneProductData.data.expiryDate).format("YYYY-MM-DD"),
        matric: oneProductData.data.matric
      })
    }
  }, [oneProductData])



  useEffect(() => {
    if (productAddData && productAddData.status === 200) {
      dispatch({
        type: PRODUCTADD,
        payload: []
      })
      navigate('/products')
      toast.success(productAddData.message)
    }
  }, [productAddData])

  useEffect(() => {
    console.log('state', state)
  }, [state])


  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validation = () => {
    let param = false
    let error = {}
    if (!state.name) {
      param = true
      error.name = "Please enter name!"
    }
    if (!state.unit) {
      param = true
      error.unit = "Please enter unit!"
    }
    if (!state.matric) {
      param = true
      error.matric = "Please enter matric!"
    }
    if (!state.nature) {
      param = true
      error.nature = "Please select nature!"
    }
    if (!state.category) {
      param = true
      error.category = "Please select category!"
    }
    if (!state.expiryDate) {
      param = true
      error.expiryDate = "Please select expiryDate!"
    }
    if (!state.family) {
      param = true
      error.family = "Please select family!"
    }
    if (!state.type) {
      param = true
      error.type = "Please select type!"
    }
    if (!state.status) {
      param = true
      error.status = "Please enter status!"
    }
    setError(error);
    return param
  }

  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: PRODUCT_GET_BY_ID,
  //       payload: []
  //     })
  //   }
  // }, [])

  useEffect(() => {
    if (productUpdated && productUpdated.status === 200) {
      toast.success(productUpdated.message)
      dispatch({
        type: PRODUCT_UPDATE,
        payload: []
      })
      navigate('/products')
    }
  }, [productUpdated])


  const saveData = () => {
    if (validation()) {
      return
    }
    if (id) {
      dispatch(productUpdateAction(state, id))
    } else {
      dispatch(productAddAction(state))
    }
  }

  const natureOptions = [
    'Physical',
    'Non Physical',
  ]

  const familyOptions = [
    'Commodity',
    'Non Commodity',
  ]

  const categoryOptions = [
    'Hard',
    'Soft',
    'Manufactures',
  ]

  const typeOptions = [
    'Commodity',
  ]

  return (
    <>
      <div className='add-edit-product'>
        <h1 className=''>Product</h1>
        <div className='form'>
          <h2 className='mb-3'>Details</h2>
          <div>
            <Row>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  label="Name"
                  name="name"
                  variant="standard"
                  color="warning"
                  value={state.name}
                  onChange={handleChange}
                  disabled={isView}
                />
                {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.name}</span>}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                {/* <FormControl className="">
                  <InputLabel htmlFor="age-native-simple">Nature</InputLabel>
                  <Select
                    focused
                    value={state.nature}
                    onChange={handleChange}
                    inputProps={{
                      name: 'nature',
                      id: 'age-native-simple',
                    }}
                    disabled={isView}
                  >
                    <option className='d-none' aria-label="None" value="" />
                    <option value={"Physical"}>Physical</option>
                    <option value={"non Physical"}>non Physical</option>
                  </Select>
                  {error?.nature && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.nature}</span>}
                </FormControl> */}
                {/* <Autocomplete
                  label="Nature"
                  onChange={q => setText(q)}
                  selectOnBlur
                  requireMatch
                  getOptions={getOptions}
                  query={text}
                /> */}

                <Autocomplete
                  options={natureOptions}
                  getOptionLabel={(option) => option}
                  id="disable-clearable"
                  label="Nature"
                  renderInput={(params) => (
                    <TextField {...params} label="Nature" variant="standard" />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, nature: newValue });
                  }}
                  value={state.nature}
                  disableClearable
                  disabled={isView}
                />
                {error?.nature && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.nature}</span>}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>

                {/* <FormControl className="">
                  <InputLabel htmlFor="age-native-simple">Family</InputLabel>
                  <Select
                    focused
                    value={state.family}
                    onChange={handleChange}
                    inputProps={{
                      name: 'family',
                      id: 'age-native-simple',
                    }}
                    disabled={isView}
                  >
                    <option className='d-none' aria-label="None" value="" />
                    <option value={"Commodity"}>Commodity</option>
                    <option value={"non Commodity"}>non Commodity</option>
                  </Select>
                  {error?.family && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.family}</span>}
                </FormControl> */}
                {/* <Autocomplete
                  label="Family"
                  onChange={q => setText(q)}
                  selectOnBlur
                  requireMatch
                  getOptions={getOptions}
                  query={text}
                /> */}

                <Autocomplete
                  options={familyOptions}
                  getOptionLabel={(option) => option}
                  id="disable-clearable"
                  label="Family"
                  renderInput={(params) => (
                    <TextField {...params} label="Family" variant="standard" />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, family: newValue });
                  }}
                  value={state.family}
                  disableClearable
                  disabled={isView}
                />
                {error?.family && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.family}</span>}
              </Col>
              <Col xxl={3} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                {/* <FormControl className="">
                  <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                  <Select
                    focused
                    value={state.category}
                    onChange={handleChange}
                    inputProps={{
                      name: 'category',
                      id: 'age-native-simple',
                    }}
                    disabled={isView}
                  >
                    <option className='d-none' aria-label="None" value="" />
                    <option value={"Hard"}>Hard</option>
                    <option value={"Soft"}>Soft</option>
                    <option value={"Manufactures"}>Manufactures</option>
                  </Select>
                  {error?.category && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.category}</span>}
                </FormControl> */}
                {/* <Autocomplete
                  label="Category"
                  onChange={q => setText(q)}
                  selectOnBlur
                  requireMatch
                  getOptions={getOptions}
                  query={text}
                /> */}

                <Autocomplete
                  options={categoryOptions}
                  getOptionLabel={(option) => option}
                  id="disable-clearable"
                  label="Category"
                  renderInput={(params) => (
                    <TextField {...params} label="Category" variant="standard" />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, category: newValue });
                  }}
                  value={state.category}
                  disableClearable
                  disabled={isView}
                />
                {error?.category && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.category}</span>}
              </Col>
            </Row>
            <Row className=''>
              <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                {/* <FormControl className="">
                  <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                  <Select
                    focused
                    value={state.type}
                    onChange={handleChange}
                    inputProps={{
                      name: 'type',
                      id: 'age-native-simple',
                    }}
                    disabled={isView}
                  >
                    <option className='d-none' aria-label="None" value="" />
                    <option value={'Commodity'}>Commodity</option>
                  </Select>
                  {error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.type}</span>}
                </FormControl> */}
                {/* <Autocomplete
                  label="Type"
                  onChange={q => setText(q)}
                  selectOnBlur
                  requireMatch
                  getOptions={getOptions}
                  query={text}
                /> */}

                <Autocomplete
                  options={typeOptions}
                  getOptionLabel={(option) => option}
                  id="disable-clearable"
                  label="Type"
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="standard" />
                  )}
                  onChange={(event, newValue) => {
                    setState({ ...state, type: newValue });
                  }}
                  value={state.type}
                  disableClearable
                  disabled={isView}
                />
                {error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.type}</span>}
              </Col>
              <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  label="Status"
                  variant="standard"
                  color="warning"
                  name='status'
                  onChange={handleChange}
                  value={state.status}
                  disabled={isView}
                />
                {error?.status && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.status}</span>}
              </Col>
              <Col xxl={4} xl={4} lg={6} md={4} sm={6} className='mb-3'>
                <form className="" noValidate>
                  <TextField
                    id="date"
                    label="Expiry date"
                    type="date"
                    name='expiryDate'
                    value={state.expiryDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={isView}
                  />
                  {error?.expiryDate && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.expiryDate}</span>}
                </form>
              </Col>
            </Row>
            <Row className=''>
              <Col xl={6} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  id="unite"
                  label="Product Unit"
                  type="text"
                  name='unit'
                  value={state.unit}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isView}
                />
                {error?.unit && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.unit}</span>}
              </Col>
              <Col xl={6} lg={6} md={4} sm={6} className='mb-3'>
                <TextField
                  label="Metrics"
                  name='matric'
                  variant="standard"
                  color="warning"
                  value={state.matric}
                  onChange={handleChange}
                  disabled={isView}
                />
                {error?.matric && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.matric}</span>}
              </Col>
            </Row>
          </div>
        </div>
        <div className='footer_'>
          <button onClick={() => navigate('/products')} className="footer_cancel_btn">cancel</button>
          {!isView && <button onClick={() => saveData()} className='footer_next_btn'> {id ? 'Edit' : 'Save'}</button>}
        </div>
      </div>
    </>
  )
}

export default Add_Edit_Product