import React from 'react';

import './Customers.css';
import Header from '../../components/Header/Header';
import Table from '../Table/Table';


const Customers = () => {
  return (
    <>
      <Header />
      <div className='main-section'>
        <div className="table-section">
          <Table />
        </div>
      </div>
     
    </>
  )
}

export default Customers;