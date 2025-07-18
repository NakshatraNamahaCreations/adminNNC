import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import AdminPanelForm from './pages/AdminPanelForm';

import DotIN from './pages/Mysore';
import Topbar from './components/Topbar';
import PopUp_Enquiries from './pages/PopUp_Enquiries';
import TeamUser_Table from './pages/TeamUser_Table';

// ✅ Blog pages
import Blogs from './pages/blogs/Blogs';
import AddBlog from './pages/blogs/AddBlog';
import EditBlog from './pages/blogs/EditBlog';
import Banglore from './pages/Banglore';
import Mysore from './pages/Mysore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPanelForm />} />
      <Route path="/dashboard" element={<Topbar />} />
      <Route path="/bangloreenquiry" element={<Banglore />} />
      <Route path="/mysoreenquiry" element={<Mysore />} />

      <Route path="/teams" element={<TeamUser_Table />} />

      {/* ✅ Blog Routes */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/add-blog" element={<AddBlog />} />
      <Route path="/blogs/edit-blog/:id" element={<EditBlog />} />
    </Routes>
  );
}

export default App;
