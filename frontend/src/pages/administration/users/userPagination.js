import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ postsPerPage, totalPosts, getAllUsers, paginate, prevPagefunc, currentPage, nextPagefunc }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='d-flex align-items-center justify-content-between' aria-label="...">
            <div className='pe-4'>
            <span className="text-muted fs-6 fw-light">Showing {getAllUsers?.length } out of {totalPosts}</span>

            </div>
            <ul className="pagination pagination-md">
                <li className={`page-item cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}>
                    <span onClick={prevPagefunc} className="page-link">Previous</span>
                </li>
                {pageNumbers.map(number => (
                    <li className={`page-item`} key={number}>
                        <Link onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'bg-primary text-white' : ''}`}>
                            {number}
                        </Link>
                    </li>

                ))}
                <li className={`page-item cursor-pointer ${currentPage === pageNumbers?.length ? 'disabled' : ''}`}>
                    <span onClick={nextPagefunc} className="page-link">Next</span>
                </li>
            </ul>
        </div>
    )
}
export default Paginate;