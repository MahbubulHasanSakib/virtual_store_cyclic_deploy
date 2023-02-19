import React from 'react';

const Pagination = ({productsPerPage,totalProducts,changePageNumber}) => {
    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalProducts/productsPerPage);i++)
    pageNumbers.push(i)
  return(
      <nav>
          <ul className='pagination'>
          {
              pageNumbers.map((number)=>{
                  return (
                      <li onClick={()=>{changePageNumber(number)}} key={number} className='page-item'>
                          <a style={{cursor:'pointer'}}  className='page-link'>
                          {number}
                          </a>
                      </li>
                  )
              })
          }
          </ul>
      </nav>
  )
};

export default Pagination;
