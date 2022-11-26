import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useSelector } from 'react-redux';
import Loader from './loader/Loader';

const Layout = ({ children, ...props }) => {
    const loading = useSelector(state => state.loading.is_loading)

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <Header />
                    {/* <Sidebar /> */}
                    <div className="" {...props}>{children}</div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Layout