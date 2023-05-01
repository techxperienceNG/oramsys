import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ postsPerPage, totalPosts, paginate, prevPagefunc, currentPage, nextPagefunc }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='d-flex align-items-center justify-content-between' aria-label="...">
            <div className='pe-4'>
            <span class="text-muted fs-6 fw-light">Showing {!totalPosts ? 0 : postsPerPage } out of {!totalPosts ? 0 : totalPosts}</span>

            </div>
            <ul class="pagination pagination-md">
                <li class={`page-item cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}>
                    <span onClick={prevPagefunc} class="page-link">Previous</span>
                </li>
                {pageNumbers.map(number => (
                    <li class={`page-item`} key={number}>
                        <Link onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'bg-primary text-white' : ''}`}>
                            {number}
                        </Link>
                    </li>

                ))}
                <li class={`page-item cursor-pointer ${currentPage === postsPerPage - 1 ? 'disabled' : ''}`}>
                    <span onClick={nextPagefunc} class="page-link">Next</span>
                </li>
            </ul>
        </div>
    )
}
export default Paginate;