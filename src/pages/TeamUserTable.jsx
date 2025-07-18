import React, { useEffect, useState } from 'react';
import './EnquiryTable.css'; // Reuse your existing styles

export default function TeamUserTable() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/team/all") // Backend API endpoint
      .then((res) => res.json())
      .then((json) => setTeam(json))
      .catch((err) => console.error("Error fetching team members:", err));
  }, []);

  return (
    <div className="enquiry-container">
      <h2 className="enquiry-heading">Team Members</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{new Date(member.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
