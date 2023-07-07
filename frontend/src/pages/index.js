import React, { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import AuthStorage from '../helper/AuthStorage';
import AuthLayOut from '../layout/AuthLayOut';
import Layout from '../layout/Layout'
import Home from './home/Home'
import HomeLanding from './home/HomeLanding';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import { useDispatch } from 'react-redux';
import { changeLoginState } from '../redux/actions/loginAction';
// import Product from './product/Product';
import Add_Edit_Product from './administration/masterData/products/Add_Edit_Product';
import Products from './administration/masterData/products/Products';
import Entities from './administration/entities/Entities';
import Users from './administration/users/Users';
import Add_Edit_User from './administration/users/Add_Edit_User';
import RatingAgencies from './administration/masterData/ratingAgency/RatingAgencies';
import RatingAgenciesEdit from './administration/masterData/ratingAgency/RatingAgenciesEdit';
import Countries from './administration/masterData/countries/Countries';
import Transactions from './transactions/Transactions';
import Add_Edit_Entities from './administration/entities/addEditEntities/Add_Edit_Entities';
import Edit_Transactions from './transactions/Edit_Transactions';
import FinalPage from './transactions/FinalPage';
import AdminLogin from './admin/AdminLogin';
import FunctionalAdmin from './functionalAdmin/FunctionalAdmin';
import EntitiesRole from './administration/EntitiesRole';
import STORAGEKEY from '../config/APP/app.config';
import RiskAssessment from './transactions/riskAssessment/RiskAssessment';
import Ports from './administration/masterData/ports/Ports';
import AirBases from './administration/masterData/airBases/AirBases';
import { ApiGet, ApiPost } from '../helper/API/ApiData';



const pathForLayout = ['/', '/signup', '/home', '/admin-login', '/fa-login']
const Index = () => {
    const pathForAuthLayout = [
        "add-product",

        "edit-product",

        "products",

        "entities",

        "entities-role",

        "add-edit-entities",

        "transactions",

        "edit-transactions",

        "rating-agencies",

        "rating-agencies-edit",

        "add-user",

        "edit-user",

        "users",

        "countries",

        "ports",

        "airBases",

        "risk-assessment",
        
        "final-page",

    ]
    const location = useLocation()
    const token = AuthStorage.getToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [role, setRole] = useState('')

    const userRoutes = [
        {
            path: "homeLanding",
            component: HomeLanding,
        },
        {
            path: "transactions",
            component: Transactions,
        },
        {
            path: "edit-transactions",
            component: Edit_Transactions,
        },
        {
            path: "risk-assessment",
            component: RiskAssessment,
        },
        {
            path: "final-page",
            component: FinalPage,
        },
    ]

    const AdminRoutes = [
        {
            path: "homeLanding",
            component: HomeLanding,
        },
        {
            path: "entities",
            component: Entities,
        },
        {
            path: "entities-role",
            component: EntitiesRole,

        },
        {
            path: "add-edit-entities",
            component: Add_Edit_Entities,
        }
    ]
    const superAdminRoutes = [
        {
            path: "homeLanding",
            component: HomeLanding,
        },
        {
            path: "add-product",
            component: Add_Edit_Product,
        },
        {
            path: "edit-product",
            component: Add_Edit_Product,
        },
        {
            path: "products",
            component: Products,
        },
        {
            path: "entities",
            component: Entities,
        },
        {
            path: "entities-role",
            component: EntitiesRole,

        },
        {
            path: "add-edit-entities",
            component: Add_Edit_Entities,
        },
        {
            path: "transactions",
            component: Transactions,
        },
        {
            path: "edit-transactions",
            component: Edit_Transactions,
        },
        {
            path: "rating-agencies",
            component: RatingAgencies,
        },
        {
            path: "rating-agencies-edit",
            component: RatingAgenciesEdit,
        },
        {
            path: "add-user",
            component: Add_Edit_User,
        },
        {
            path: "edit-user",
            component: Add_Edit_User,
        },
        {
            path: "users",
            component: Users,
        },
        {
            path: "countries",
            component: Countries,
        },
        {
            path: "ports",
            component: Ports,
        },
        {
            path: "airports",
            component: AirBases,
        },
        {
            path: "risk-assessment",
            component: RiskAssessment,
        },
        {
            path: "final-page",
            component: FinalPage,
        },
    ]

    let primaryLinks = []
    useEffect(() => {
        if (AuthStorage.isUserAuthenticated()) {
            ApiGet("user/validateToken").then((res) => {
                if (res.status === 200) {
                    console.log('res', res)
                    if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
                        navigate("/homeLanding")
                    } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
                        navigate("/entities")
                    } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
                        navigate("/homeLanding")
                    }
                } else {
                    if (pathForLayout.includes(location.pathname))
                        navigate(location.pathname)
                    else
                        navigate("/")
                    localStorage.clear()
                }
            }).catch(e => {
                if (pathForLayout.includes(location.pathname))
                    navigate(location.pathname)
                else
                    navigate("/")
                localStorage.clear()
            })
        } 
    }, [])
    // useEffect(() => {
    //     if (pathForLayout.includes(location.pathname)) {
    //         if (AuthStorage.isUserAuthenticated()) {
    //             ApiGet("user/validateToken").then((res) => {
    //                 if (res.status === 200) {
    //                     console.log('res', res)
    //                     if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    //                         navigate("/transactions")
    //                     } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    //                         navigate("/entities")
    //                     } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    //                         navigate("/transactions")
    //                     }
    //                 } else {
    //                     // navigate(-1)
    //                     localStorage.clear()
    //                 }
    //             }).catch(e => {
    //                 // navigate(-1)
    //                 localStorage.clear()
    //             })

    //         } else {
    //             navigate(location.pathname)
    //             // if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    //             //     navigate("/admin-login")
    //             // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    //             //     navigate("/fa-login")
    //             // } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    //             //     navigate("/")
    //             // } else {
    //             //     navigate("/")
    //             // }
    //         }
    //     } else {
    //         if (AuthStorage.isUserAuthenticated()) {
    //             navigate("/transactions")
    //         } else {
    //             navigate(-1)
    //         }
    //     }
    // }, []);

    if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
        primaryLinks = userRoutes
    } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
        primaryLinks = AdminRoutes
    } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
        primaryLinks = superAdminRoutes
    }

    return (
        <>
            {pathForLayout.includes(location.pathname) ?
                <Layout>
                    <Routes>
                        {/* <Route element={<PublicRoutes />}> */}
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/fa-login" element={<FunctionalAdmin />} />
                    </Routes>
                </Layout> :
                <AuthLayOut>
                    <Routes>

                        {primaryLinks?.map(item =>
                            < Route path={`/${item?.path}`} element={<item.component />} />
                            // }
                        )}
                    </Routes>
                </AuthLayOut>
            }
            {/* </Route> */}
            {/* <Route element={<RouteProtecter />}> */}
            {/* </Route> */}
            {/* </Routes> */}
        </>
    )
}

export default Index



const RouteProtecter = () => {
    const isAuthenticated = AuthStorage.isUserAuthenticated();
    return !isAuthenticated ? (
        <Navigate to={"/"} />
    ) : (
        <AuthLayOut>
            <Outlet />
        </AuthLayOut>
    );
};

const PublicRoutes = () => {
    const isAuthenticated = AuthStorage.isUserAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
 

    useEffect(() => {
        !isAuthenticated ? (
            pathForLayout.includes(location.pathname) ? (
                <Navigate to={location} />
            ) : (
                <Navigate to='/' />
            )
        ) : (
            pathForLayout.includes(location.pathname) ? navigate(-1) : location.pathname === "/" ? navigate("/products") : navigate('/')
        );
    }, [isAuthenticated]);

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};