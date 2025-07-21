import React from 'react';
import { BsPersonCircle, BsBoxArrowRight } from 'react-icons/bs';
import "../components/Topbar.css";

import Sidebar from '../components/Sidebar';
import EnquiryTableIn from './EnquiryTablemysore';
// import PoupEnquiryTable from './PoupEnquiryTable';
import TeamUserTable from './TeamUserTable';


export default function TeamUser_Table() {
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
       
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
         <TeamUserTable/>
        </div>
      </div>
    </div>

  );
}
