import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-area1">
      <div className="footer-bottom-img">
        <img src="./assets/img/figure/figure1.png" alt="figure" width="309" height="235" />
      </div>
      <div className="footer-top-img">
        <img src="./assets/img/figure/figure2.png" alt="figure" width="369" height="225" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
            <div className="footer-left">
              <div className="footer-logo">
                <a href="/">
                  {/* <div className="lgo-img-t" style="background-image:url(img/my-img/lgo-red.png)"></div> */}
                  {/* <div className="lgo-img-t" ></div> */}
                  <div className="lgo-img">
                    <img src="./assets/img/my-img/lgo-red.png" alt="logo" />
                  </div>
                </a>
              </div>
              <p>OramSys amet sit amet, consectetur adipise cingt sed doeiusmod tempor incididuntue labore et dolore magna.</p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
            <div className="footer-middle">
              <h2 className="footer-title">Lorem ipsum dolor</h2>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <ul className="footer-list">
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-12">
                  <ul className="footer-list2">
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                    <li><a href="/"><FontAwesomeIcon icon={faAngleRight} className="me-2"></FontAwesomeIcon>ipsum dolor</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
            <div className="footer-right">
              <h2 className="footer-title">Lorem ipsum!</h2>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter your Email" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    {/* <i className="fas fa-angle-right"></i> */}
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="copyright-area">
                <p> © OramSys 2022. All Rights Reserved </p>
                <div className="copyright-img1">
                  <img src="./assets/img/figure/figure4.png" alt="figure" width="20" height="20" />
                </div>
                <div className="copyright-img2">
                  <img src="./assets/img/figure/figure4.png" alt="figure" width="20" height="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer