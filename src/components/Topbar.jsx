import React from 'react';
import { BsPersonCircle, BsBoxArrowRight } from 'react-icons/bs';
import './Topbar.css';
import Sidebar from './Sidebar';
// import AdminUser from '../pages/AdminUser';
import MonthlyEnquiryChart from '../pages/MonthlyEnquiryChart';
import MonthlyEnquiryChart2 from '../pages/MonthlyEnquiryChart2';


export default function Topbar() {
  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
    <Sidebar/>
        {/* Nav Items can go here */}
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-item">
            <BsPersonCircle size={20} />
            <span>Admin</span>
          </div>
          {/* <div className="topbar-item logout">
            <BsBoxArrowRight size={20} />
            <span>Logout</span>
          </div> */}
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
         <MonthlyEnquiryChart/>

         <MonthlyEnquiryChart2/>
        </div>
      </div>
    </div>

  );
}
