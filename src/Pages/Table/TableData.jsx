import React from 'react'
import Table from './Table';

const TableData = () => {
    const data = [
        { name: 'Shannu', email: 'shannu@example.com', phone: "8247023831", company: "ASAR IT", status: 'Approved' },
        { name: 'Prasad', email: 'prasad@example.com', phone: "8247023831", company: "ASAR IT", status: 'Approved' },
        { name: 'Prasad', email: 'prasad@example.com', phone: "8247023831", company: "ASAR IT", status: 'Approved' },
        { name: 'Prasad', email: 'prasad@example.com', phone: "8247023831", company: "ASAR IT", status: 'Approved' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        { name: 'Yash', email: 'yash@example.com', phone: "8247023831", company: "ASAR IT", status: 'Pending' },
        // Add more data as needed
      ];
    
    return (
        <div>
           <Table data={data} itemPerPage={5} />
        </div>
    )
}

export default TableData;