import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';

import AdminPanelForm from './pages/AdminPanelForm';
import Banglore from './pages/Banglore';
import Mysore from './pages/Mysore';
import Topbar from './components/Topbar';
import TeamUser_Table from './pages/TeamUser_Table';
import Blogs from './pages/blogs/Blogs';
import AddBlog from './pages/blogs/AddBlog';
import EditBlog from './pages/blogs/EditBlog';
import Sidebar from './components/Sidebar';

// Child component to use useLocation inside BrowserRouter
function MainContent() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1, marginLeft: showSidebar ? '' : '0' }}>
        <Routes>
          <Route path="/" element={<AdminPanelForm />} />
          <Route path="/dashboard" element={<Topbar />} />
          <Route path="/bangloreenquiry" element={<Banglore />} />
          <Route path="/mysoreenquiry" element={<Mysore />} />
          <Route path="/teams" element={<TeamUser_Table />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add-blog" element={<AddBlog />} />
          <Route path="/blogs/edit-blog/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;