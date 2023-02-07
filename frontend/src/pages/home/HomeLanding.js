import React, { useState, useEffect, useCallback } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { BsCheckCircle, BsBox, BsFillPeopleFill } from 'react-icons/bs'
import { IoTimerOutline } from 'react-icons/io5';
import { FcBusinessman, FcApproval, FcClock } from "react-icons/fc";
import { GrTransaction } from "react-icons/gr"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { useDispatch } from 'react-redux';
import { GET_TRANSACTION_BY_ID } from '../../redux/types';
import { productGetAction } from '../../redux/actions/productAction';
import { getAllTransaction } from '../../redux/actions/transactionDataAction';
import { entityGetAction } from '../../redux/actions/entityAction';
import { userGetAction } from '../../redux/actions/userAction';

const HomeLanding = () => {
  const token = AuthStorage.getToken()
  const [length, setLength] = useState([])

  const dispatch = useDispatch()
  const cards = [
    {
      title: 'Completed Transactions',
      text: '',
      img: "Transact", icon: GrTransaction,
      name: "transactions"
    },
    {
      title: 'Available Products',
      text: '',
      img: 'Product', icon: BsBox,
      name: "products"
    },
    {
      title: 'Registered Users',
      text: '',
      img: "Users", icon: BsFillPeopleFill,
      name: "users"
    },
    {
      title: 'Entities',
      text: '',
      img: "entity", icon: FcBusinessman,
      name: "entities"
    },
 
  ]

  const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
  const productGetDatas = useSelector(state => state.product.product)
  const getAllUsers = useSelector(state => state.userData.getUserData)
  const getAllEntities = useSelector(state => state.entityData.entity)


  console.log('termsheet', getAlltransactionData)

  const getCount = useCallback((name) => {
    switch (name) {
      case 'transactions':
        return getAlltransactionData?.data?.length ;
      case 'products':
        return productGetDatas?.data?.length;
      case 'users':
        return getAllUsers?.data?.length; // or the array of users like users.length;
      case 'entities':
        return getAllEntities?.data?.length
        default: return;
    }
  }, [getAllUsers, getAlltransactionData, productGetDatas, getAllEntities])


  const signedCount = []
  const notSignedCount = []
  if(getAlltransactionData?.data) {
    getAlltransactionData.data.map((item) => {
      if(item.termSheet === 'Signed') {
        signedCount.push(item)
      }
      if(item.termSheet !== 'Signed') {
        notSignedCount.push(item)
      }
      // return alltransCount
    })
  }

  const Authsend = useCallback(() => {
    let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
    dispatch(getAllTransaction(id))
  }, [dispatch])
  
    const prodAction = useCallback(() => {
      dispatch(productGetAction("all"))
    }, [dispatch]) 

    const entityAction = useCallback(() => {
      dispatch(entityGetAction("all"))
    }, [dispatch]) 
    const userAction = useCallback(() => {
      dispatch(userGetAction())
    }, [dispatch]) 

    useEffect(() => {
      dispatch(() => Authsend())
      dispatch(() => prodAction())
      dispatch(() => entityAction())
      dispatch(() => userAction())
      // console.log(getAlltransactionData)
      // eslint-disable-next-line
    }, [])
      
  return (
    <>
        <section className=''>
                 <div className="background-shape6">
                  <img src="./assets/img/figure/figure32.png" alt="figure" width="404" height="216" />
                </div>
            <div className='container dash-head'>
                <h1 className='m-2'>Dashboard</h1>
                <div className='row no-gutters'>

                  {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" && (
                    cards.map((card, i) => (
                        <div key={i} className="col-lg-4 col-md-6 m-2">
                        <div className="financo-activities-box1">
                         
                            <img src={card.img} alt="figure" height="81" width="81" />
                            
                          <h2 className="heading-title"><a href="/" className="text-decoration-none"><p className='heading-title'>{getCount(card.name)}</p> {" "} {card.title}</a>
                          
                          </h2>
                          <p>{card.text}</p>
                      
                        </div>
                      </div>
                      ))
                  )}

                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                      //{getAlltransaction?.data?.termSheet === 'Not Signed' }
                      <div className="col-lg-4 col-md-6 my-4">
                        <div className="financo-activities-box1">
                                <FcApproval size={56} />
                                <h2 className="heading-title my-3"><p className="text-decoration-none"><span className='fw-bold fs-2'>{ signedCount.length}</span> {" "} Completed Transactions</p></h2>
                            <div className="item-button">
                              <Link to='/transactions'className="item-btn text-decoration-none"><FaAngleRight /><span>Go to Transactions</span></Link>
                            </div>
                        </div>
                      </div>
                    )}
                    
                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                      //{getAlltransaction?.data?.termSheet === 'Not Signed' }
                        <div className="col-lg-4 col-md-6 my-4 mx-3">
                            <div className="financo-activities-box1">
                              <FcClock size={56} />
                                <h2 className="heading-title my-3"><p className="text-decoration-none"><span className='fw-bold fs-2'>{ notSignedCount.length}</span> {" "} Transactions in Progress...</p></h2>
                        
                                <div className="item-button">
                            <Link to='/transactions'className="item-btn text-decoration-none"><FaAngleRight /><span>Go to Transactions</span></Link>
                            </div>
                          </div>
                      </div>
                   
                    )}
 
                </div>
               
                <div className="background-shape7">
                  <img src="./assets/img/figure/figure29.png" alt="figure" width="747" height="256" />
                </div>
                <div className="background-shape8">
                  <img src="./assets/img/my-img/figure33.png" alt="figure" width="783" height="439" />
                </div>
            </div>
      </section>
  </>
  )
}

export default HomeLanding

// import { useEffect, useCallback } from 'react'
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'react-bootstrap';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { useSelector } from 'react-redux';
// import AuthStorage from '../../helper/AuthStorage';
// import STORAGEKEY from '../../config/APP/app.config';
// import { useDispatch } from 'react-redux';
// import { GET_TRANSACTION_BY_ID } from '../../redux/types';
// import { productGetAction } from '../../redux/actions/productAction';
// import { getAllTransaction } from '../../redux/actions/transactionDataAction';
// import { entityGetAction } from '../../redux/actions/entityAction';
// import { userGetAction } from '../../redux/actions/userAction';

// const CardComponent = ({imgSrc, title, subtitle, text}) => {

//   const dispatch = useDispatch()
//    const cards = [
//      {
//        title: 'Completed Transactions',
//        text: '',
//        img1: "./assets/img/figure/figure39.png" ,
//        img2: "./assets/img/figure/figure41.png",
//        name: "transactions"
//      },
//      {
//        title: 'Available Products',
//        text: '',
//        img1: "./assets/img/figure/figure39.png",
//        img2: "./assets/img/figure/figure42.png",
//        name: "products"
//      },
//      {
//        title: 'Registered Users',
//        text: '',
//        img1: "./assets/img/figure/figure39.png",
//        img2: "./assets/img/figure/figure43.png",
//        name: "users"
//      },
//      {
//        title: 'Entities',
//        text: '',
//        img1: "./assets/img/figure/figure39.png",
//        img2: "./assets/img/figure/figure43.png",
//        name: "entities"
//      },
 
//    ]

//    const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
//    const productGetDatas = useSelector(state => state.product.product)
//    const getAllUsers = useSelector(state => state.userData.getUserData)
//    const getAllEntities = useSelector(state => state.entityData.entity)

//    const getCount = useCallback((name) => {
//      switch (name) {
//        case 'transactions':
//          return getAlltransactionData?.data?.length ;
//        case 'products':
//          return productGetDatas?.data?.length;
//        case 'users':
//          return getAllUsers?.data?.length;  //or the array of users like users.length;
//        case 'entities':
//          return getAllEntities?.data?.length
//          default: return;
//      }
//    }, [getAllUsers, getAlltransactionData, productGetDatas, getAllEntities])

//    const Authsend = useCallback(() => {
//      let id = AuthStorage.getStorageData(STORAGEKEY.roles) !== "superAdmin" ? AuthStorage.getStorageData(STORAGEKEY.userId) : "all"
//      dispatch(getAllTransaction(id))
//    }, [dispatch])
  
//      const prodAction = useCallback(() => {
//        dispatch(productGetAction("all"))
//      }, [dispatch]) 

//      const entityAction = useCallback(() => {
//        dispatch(entityGetAction("all"))
//      }, [dispatch]) 
//      const userAction = useCallback(() => {
//        dispatch(userGetAction())
//      }, [dispatch]) 

//      useEffect(() => {
//        dispatch(() => Authsend())
//        dispatch(() => prodAction())
//        dispatch(() => entityAction())
//        dispatch(() => userAction())

//         //eslint-disable-next-line
//      }, [])

//   return (
//     <Card className="col-lg-12 col-md-6 mt-5">
//       <CardImg top src={imgSrc} alt="Card image" className="rounded-circle" />
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Card.Subtitle>{subtitle}</Card.Subtitle>
//         <Card.Text>{text}</Card.Text>
//         <Button>Button</Button>
//         <i class="fa-solid fa-octagon-check"></i>
//       </Card.Body>
//     </Card>
//   );
// }

// const HomeLanding = () => {
//   return ( 
//     <Container>
//         <div className="background-shape6">
//           <img src="./assets/img/figure/figure32.png" alt="figure" width="404" height="216" />
//         </div>
//         <h1 className='m-2'>Dashboard</h1>
//       <Row>
//         <Col xs={6} sm={4}>
//           <CardComponent 
//             imgSrc="image1.jpg"
//             title="4 Transactions Completed"
//             subtitle=""
//             text="This is card 1"
//           />
//         </Col>
//         <Col xs={6} sm={4}>
//           <CardComponent 
//             imgSrc="image2.jpg"
//             title="3 Products available"
//             subtitle=""
//             text="This is card 2"
//           />
//         </Col>
//       </Row>
//       <div className="background-shape7">
//         <img src="./assets/img/figure/figure29.png" alt="figure" width="747" height="256" />
//       </div>
//       <div className="background-shape8">
//         <img src="./assets/img/my-img/figure33.png" alt="figure" width="783" height="439" />
//       </div>
//     </Container>
//   );
// }

// export default HomeLanding;