import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const HomeLanding = () => {
  const token = AuthStorage.getToken()

  const cards = [
    {
      title: 'Transactions',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png" ,
      img2: "./assets/img/figure/figure41.png",
      name: "transactions"
    },
    {
      title: 'Products',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png",
      img2: "./assets/img/figure/figure42.png",
      name: "products"
    },
    {
      title: 'Users',
      text: 'loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown',
      img1: "./assets/img/figure/figure39.png",
      img2: "./assets/img/figure/figure43.png",
      name: "users"
    },
  ]

  const getAlltransactionData = useSelector((state) => state.transactionData.getAllTransaction)
  const productGetDatas = useSelector(state => state.product.product)
  const getAllUsers = useSelector(state => state.userData.getUserData)

  const getCount = name => {
    switch (name) {
      case 'transactions':
        return getAlltransactionData.length;
      case 'products':
        return productGetDatas.length;
      case 'users':
        return getAllUsers.length; // or the array of users like users.length;
    }
  };
  return (
    <>
        <section className=''>

            <div className='container dash-head'>
                <h1 className='m-4'>Dashboard</h1>
                <div className='row no-gutters'>
                  {AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin" && (
                    cards.map((card, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                        <div className="financo-activities-box1">
                          <div className="item-img-round">
                            <img src={card.img1} alt="figure" height="81" width="81" />
                            <div className="item-img">
                              <img src={card.img2}  alt="figure" height="41" width="45" />
                            </div>
                          </div>
                          <h2 className="heading-title"><a href="/" className="text-decoration-none">{getCount(card.name)} {" "} {card.title}</a>
                          
                          </h2>
                          <p>{card.text}</p>
            
                        </div>
                      </div>
                      ))
                  )}
                    {AuthStorage.getStorageData(STORAGEKEY.roles) === "user" && (
                      
                        <div className="col-lg-4 col-md-6">
                        <div className="financo-activities-box1">
                          <div className="item-img-round">
                            <img src="./assets/img/figure/figure39.png" alt="figure" height="81" width="81" />
                            <div className="item-img">
                              <img src="./assets/img/figure/figure41.png"  alt="figure" height="41" width="45" />
                            </div>
                          </div>
                          <h2 className="heading-title"><a href="/" className="text-decoration-none">{getAlltransactionData?.length} {" "} Transactions</a>
                          
                          </h2>
                          <p>loremLorem ipsum dolor sit, amet consectetur adipisicing Bookan unknown</p>
            
                        </div>
                      </div>
                   
                    )}
                </div>
                <div className="background-shape6">
          <img src="./assets/img/figure/figure32.png" alt="figure" width="404" height="216" />
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