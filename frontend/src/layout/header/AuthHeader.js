import React, { useState } from 'react'

const AuthHeader = ({ showSidebar, setSidebar }) => {
  const [showspan, setShowspan] = useState(false)
  const [showSubData, setShowSubData] = useState(false)
  return (
    <>
      {/* <div className='authheader_main'>
        <img src='../../assets/img/about/more.png' className='sidebar_img' onClick={() => setSidebar(!showSidebar)} />
        <h1>Transactions</h1>
        <div className='btn_input_content'>
          <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
          {
            showspan &&
            <div className='add_content'>
              <p>Import</p>
              
              <div >
                <p onClick={() => setShowSubData(!showSubData)} className='d-flex justify-content-between align-items-center'>Export
                  <img className={`${showSubData && "imgrotet"}`} src='../../assets/img/about/down-filled-triangular-arrow.png' />
                </p>
              </div>
              {
                showSubData &&
                <>
                  <p className="ps-3">Physical commodities</p>
                  <p className="ps-3">Non-physical commodities</p>
                </>
              }
            </div>
          }
          <div className='search_content'>
            <input className='serch_input' id='search' />
            <label htmlFor='search'>
              <img src='../../assets/img/about/search.png' />
            </label>
          </div>
        </div>
      </div> */}
      <div className=' open-sidebar' style={{backgroundColor:"#f1f1f1", padding:"15px"}}>
        <img src='./assets/img/my-img/barmanu.svg' alt='' width="30px" onClick={() => setSidebar(!showSidebar)} />
      </div>
    </>
  )
}

export default AuthHeader