import React, { useEffect, useState } from 'react';

export default function TeamPersonTable() {
  const [team, setTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    role: 'member',
    password: '',
    status: true // Default to active
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch team members
  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('https://api.nakshatranamahacreations.in/api/persons');
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `https://api.nakshatranamahacreations.in/api/persons/${editId}`
        : 'https://api.nakshatranamahacreations.in/api/persons';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchTeam();
        closeModal();
      } else {
        console.error('Error saving person:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        const response = await fetch(`https://api.nakshatranamahacreations.in/api/persons/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchTeam();
        } else {
          console.error('Error deleting person:', await response.json());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Handle status toggle
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`https://api.nakshatranamahacreations.in/api/persons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: !currentStatus }),
      });
      if (response.ok) {
        await fetchTeam();
      } else {
        console.error('Error updating status:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Open modal for adding
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '', mobileNumber: '', role: 'member', password: '', status: true });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (person) => {
    setIsEditing(true);
    setEditId(person._id);
    setFormData({
      name: person.name,
      email: person.email,
      mobileNumber: person.mobileNumber,
      role: person.role,
      password: '',
      status: person.status
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Team Members
      </h2>
      <button
        onClick={openAddModal}
        style={{
          backgroundColor: '#3182ce',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px',
          transition: 'background-color 0.3s',
          ':hover': { backgroundColor: '#2b6cb0' }
        }}
      >
        Add Person
      </button>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          backgroundColor: 'white',
          borderCollapse: 'collapse',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#edf2f7',
              color: '#2d3748',
              fontWeight: '600'
            }}>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Sl No.</th>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Date Joined</th>
              <th style={{ padding: '12px 16px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr
                key={member._id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fafc',
                  transition: 'background-color 0.2s',
                  ':hover': { backgroundColor: '#edf2f7' }
                }}
              >
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}>{index + 1}</td>
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}>{member.name}</td>
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}>{member.email}</td>
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}>{member.role}</td>
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0' }}>
                  {new Date(member.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: '12px 16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => openEditModal(member)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      ':hover': { color: '#2b6cb0' }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(member._doc ? member._doc._id : member._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      ':hover': { color: '#c53030' }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 16H6l-1-16"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(member._id, member.status)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      ':hover': { filter: 'brightness(1.1)' }
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={member.status ? '#48bb78' : '#a0aec0'} stroke={member.status ? '#48bb78' : '#a0aec0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      {member.status && <path d="M8 12l2 2 4-4"></path>}
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '20px'
            }}>
              {isEditing ? 'Edit Person' : 'Add Person'}
            </h3>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                  pattern="\d{10}"
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                  required={!isEditing}
                  placeholder={isEditing ? 'Leave blank to keep unchanged' : ''}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748',
                  marginBottom: '8px'
                }}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    ':focus': { outline: 'none', borderColor: '#3182ce', boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)' }
                  }}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#e2e8f0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginRight: '10px',
                    transition: 'background-color 0.3s',
                    ':hover': { backgroundColor: '#cbd5e0' }
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3182ce',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.3s',
                    ':hover': { backgroundColor: '#2b6cb0' }
                  }}
                >
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}