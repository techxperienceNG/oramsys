import React from 'react'

const AuthHeader = () => {

    const [showspan, setShowspan] = useState(false)
    const [showSubData, setShowSubData] = useState(false)
    return (
        <>
            <div className='authheader_main'>
                <h1>Transactions</h1>
                <div className='d-flex'>
                    <button className='add_btn me-3' onClick={() => setShowspan(!showspan)}> <img src='../../assets/img/about/plus.png' className='me-2' />Add</button>
                    {
                        showspan &&
                        <div className='add_content'>
                            <p>Import</p>
                            <p className='d-flex justify-content-between align-items-center'>Export
                                <img src='../assets/img/about/down-filled-triangular-arrow.png' />
                            </p>

                        </div>
                    }
                    <div className='search_content'>
                        <input className='serch_input' id='search' />
                        <label htmlFor='search'>
                            <img src='../assets/img/about/search.png' />
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthHeader