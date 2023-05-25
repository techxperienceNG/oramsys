import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'

const SearchBar = (props) => {
    const { transaction, setSearchResult, setCurrentPage} = props
    const [text, setText] = useState('')
    const getAlltransactionData = useSelector(
        (state) => state.transactionData.getAllTransaction
      )

    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if(e.target.value.length > 0) {
            setSearchResult(transaction)
            
    
            const resultsArray = getAlltransactionData?.data?.filter(item =>  item.borrower_Applicant.toLowerCase().includes(e.target.value)) 
            setSearchResult(resultsArray)
            // console.log(e.target.value)
        //    console.log('check results', resultsArray)
        }else {
            setSearchResult(transaction)
            setCurrentPage(1)
        }
       
    }

    return (
        <form class="input-group w-50" onSubmit={handleSubmit}>
            <input type="text" id='search' value={text} onKeyUp={handleSearchChange} onChange={e => setText(e.target.value)} placeholder="Search transaction..." class="form-control" />
            <button type="button" class="btn btn-primary btn-lg">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar