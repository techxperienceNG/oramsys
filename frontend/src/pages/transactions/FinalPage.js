import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { LOGIN } from '../../redux/types';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../helper/lottie/success.json'


const FinalPage = ({ show, onHide }) => {
    //   const [show, setShow] = useState(false);

    //   const handleClose = () => setShow(false);
    //   const handleShow = () => setShow(true);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
        }
     };
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const Logout = (e) => {
    //     dispatch({
    //         type: LOGIN,
    //         payload: []
    //     })
    //     e.preventDefault();
    //     AuthStorage.deauthenticateUser()
    //     navigate('/');
    // }
    useEffect(() => {
        setTimeout(() => {
            navigate('/transactions')
        }, 2500);
    }, [])

    return (
        <>
        
<div class="">
    <div class="row align-items-center vh-100">
        <div class="col-6 mx-auto">
            <div class="card shadow border">
                <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text">
                        <Lottie options={defaultOptions} style={{ size: '30px'}} className='img-fluid' />
                    </p>
                    <p>You are being redirected to the transactions list...</p>
                </div>
            </div>
        </div>
    </div>
</div>

            {/* <h2>Hello</h2>
            <Link to='/transactions'> Go to transactions</Link>
            <div class="card mx-auto text-center">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                <div class="card-footer text-muted">
                    2 days ago
                </div>
            </div> */}
            {/* <div class="container-fluid d-flex justify-content-center align-items-center" 
            style={{ height: "100vh", overflow: "hidden"}}>
                <div class="row text-center d-flex align-items-center" style={{overflow:"hidden", width: "50vw", height: "50vh", border: "1px solid blue"}}>
                <h2>Center This Text (Even if Wrapped) in all Viewport Sizes</h2>
                </div>
            </div> */}
        </>
    );
}

export default FinalPage