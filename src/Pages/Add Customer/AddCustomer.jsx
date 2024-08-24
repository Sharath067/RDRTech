import React, { useState } from 'react';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './Addcustomer.css';

const AddCustomer = ({ onChange }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onChange(file);
    };


    return (
        <div className='add_customer-section'>
            <div className="add_customer_sub_section">
                <h3 className='add_new-cutomer_heading'> Add New Customer</h3>
                <div className='add_customer_form_section'>
                    <form className='add_customer_form_sub_section'>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>UserName</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>Email</label> <br />
                                <input type="email" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>Phone Number</label> <br />
                                <input type="number" name="" id="add_customer_input" placeholder='Enter phone number' />
                            </div>
                            {/* <div>
                                <label className='add_customer_labels'>Profile Image</label> <br />
                                <input type="file" name="" id="add_customer_input" placeholder='Enter your name' hidden/>
                            </div> */}
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <label htmlFor="fileInput">
                                    <FontAwesomeIcon icon={faUpload} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button onClick={() => document.getElementById('fileInput').click()}>Browse</button>
                                {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>Company</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>Bussiness Email</label> <br />
                                <input type="email" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>Company Website</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>Social Media</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>GST Number</label> <br />
                                <input type="number" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>PAN Card Number</label> <br />
                                <input type="number" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>GST Image</label> <br />
                                <input type="file" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>PAN Image</label> <br />
                                <input type="file" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>Address</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>City</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='add_customer_input_section'>
                            <div>
                                <label className='add_customer_labels'>Country</label> <br />
                                <input type="text" name="" id="add_customer_input" placeholder='Enter your name' />
                            </div>
                            <div>
                                <label className='add_customer_labels'>Pincode</label> <br />
                                <input type="number" name="" id="add_customer_input" placeholder='Enter your email' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer;