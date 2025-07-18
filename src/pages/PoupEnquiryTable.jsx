import React, { useEffect, useState } from 'react';
import './EnquiryTable.css';

export default function PoupEnquiryTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/popup-enquiry") // Backend API endpoint
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching popup enquiries:", err));
  }, []);

  return (
    <div className="enquiry-container">
      <h2 className="enquiry-heading">Popup Enquiries</h2>

      <div className="search-wrapper">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">Search</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.user_name}</td>
                <td>{row.user_phone}</td>
                <td>{row.user_email}</td>
                <td>{row.user_service}</td>
                <td>{new Date(row.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
