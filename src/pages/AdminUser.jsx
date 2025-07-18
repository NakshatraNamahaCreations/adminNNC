import React, { useEffect, useState } from 'react';
import './EnquiryTable.css';

export default function AdminUser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/enquiries") // Backend API endpoint
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching enquiries:", err));
  }, []);

  return (
    <div className="enquiry-container">
      <h2 className="enquiry-heading">Enquiries</h2>
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
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>{row.subject}</td>
                <td>{row.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
