import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsGrid, BsPeople, BsBoxArrowRight } from 'react-icons/bs';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const userRole = localStorage.getItem('userRole'); // 'admin' or 'employee'

  const [activeTab, setActiveTab] = useState(
    currentPath.includes('enquiry') ? 'enquiry' :
    currentPath.includes('dashboard') ? 'dashboard' :
    currentPath.includes('blogs') ? 'blogs' :
    currentPath.includes('teams') ? 'teams' :
    null
  );

  const [selectedSubItem, setSelectedSubItem] = useState(
    currentPath.includes('bangloreenquiry') ? 'bangalore' :
    currentPath.includes('mysoreenquiry') ? 'mysore' :
    null
  );

  const toggleTab = (tab) => {
    setActiveTab(tab);
    if (tab !== 'enquiry') setSelectedSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const navItemStyle = (tab) => ({
    color: activeTab === tab ? '#3498db' : '#ecf0f1',
    padding: '12px 15px',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
    textDecoration: 'none'
  });

  const subItemStyle = (subItem) => ({
    color: selectedSubItem === subItem ? '#3498db' : '#ecf0f1',
    padding: '8px 15px',
    borderRadius: '4px',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    background: selectedSubItem === subItem ? 'rgba(255,255,255,0.1)' : 'transparent'
  });

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      background: '#2c3e50',
      color: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 10px',
      boxShadow: '3px 0 8px rgba(0,0,0,0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      fontFamily: "'Arial', sans-serif"
    }}>
      <div style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '20px'
      }}>
        <img 
          src="image.webp" 
          alt="Logo" 
          style={{ width: '130px', height: 'auto', objectFit: 'contain' }} 
        />
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 10px' }}>
        {/* Blogs - visible to all */}
        <Link to="/blogs" onClick={() => toggleTab('blogs')} style={navItemStyle('blogs')}>
          <BsGrid style={{ marginRight: '8px' }} /> Blogs
        </Link>

        {/* Admin Only Sections */}
        {userRole === 'admin' && (
          <>
            <Link to="/dashboard" onClick={() => toggleTab('dashboard')} style={navItemStyle('dashboard')}>
              <BsGrid style={{ marginRight: '8px' }} /> Dashboard
            </Link>

            <div>
              <div onClick={() => toggleTab('enquiry')} style={navItemStyle('enquiry')}>
                <BsGrid style={{ marginRight: '8px' }} />
                Enquiry
              </div>
              {activeTab === 'enquiry' && (
                <div style={{
                  marginLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <Link to="/bangloreenquiry" onClick={() => handleSubItemClick('bangalore')} style={subItemStyle('bangalore')}>
                    Bengaluru
                  </Link>
                  <Link to="/mysoreenquiry" onClick={() => handleSubItemClick('mysore')} style={subItemStyle('mysore')}>
                    Mysore
                  </Link>
                </div>
              )}
            </div>

            <Link to="/teams" onClick={() => toggleTab('teams')} style={navItemStyle('teams')}>
              <BsPeople style={{ marginRight: '8px' }} /> Teams
            </Link>
          </>
        )}

        {/* Logout */}
        <div
          onClick={() => {
            localStorage.removeItem("userRole");
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={{
            padding: '12px 15px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#e74c3c',
            fontSize: '15px',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          <BsBoxArrowRight style={{ marginRight: '8px', fontSize: '16px' }} />
          Logout
        </div>
      </nav>
    </div>
  );
}
