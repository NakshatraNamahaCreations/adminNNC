import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { API_BASE_URL } from "./api";


import "./Blogs.css";
const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [searchVal, setSearchVal] = useState("");
	const [searchQuery, setSearchQuery] = useState(""); // Triggered search
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchBlogs = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${API_BASE_URL}/blogs`, {
				params: {
					search: searchQuery,
					page: currentPage,
					limit: 10,
				},
			});
			setBlogs(res.data.data || []);
			setTotalPages(res.data.totalPages || 1);
		} catch (err) {
			console.error("Failed to fetch blogs:", err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, [currentPage, searchQuery]);

	const handleSearch = () => {
		setCurrentPage(1);
		setSearchQuery(searchVal.trim());
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this blog?")) return;
		try {
			await axios.delete(`${API_BASE_URL}/blog/${id}`);
			fetchBlogs();
		} catch (err) {
			alert("Failed to delete blog");
		}
	};

	return (
		<div className="blog-container">
			<div className="blog-header">
				<h2 className="blog-title">Blog List</h2>
				<Link to="/blogs/add-blog" className="add-blog-btn">Add Blog</Link>
			</div>

			{/* Search Bar */}
			<div className="search-bar">
				<input
					value={searchVal}
					onChange={(e) => setSearchVal(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Search"
					className="search-input"
				/>
				<button onClick={handleSearch} className="search-btn">Search</button>
			</div>

			{/* Table */}
			<div className="table-container">
				{loading ? (
					<p className="loading-text">Loading...</p>
				) : blogs.length === 0 ? (
					<p className="loading-text">No blogs found.</p>
				) : (
					<table className="blog-table">
						<thead>
							<tr>
								<th className="table-head">Sl. No</th>
								<th className="table-head">Title</th>
								<th className="table-head">Image</th>
								<th className="table-head">Description</th>
								<th className="table-head text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{blogs.map((blog, index) => (
								<tr key={blog._id} className="table-row">
									<td className="table-cell">{(currentPage - 1) * 10 + index + 1}</td>
									<td className="table-cell">{blog.title}</td>
									<td className="table-cell">
										<img
											src={blog.bannerImage}
											alt={blog.title}
											className="blog-image"
										/>
									</td>
									<td className="table-cell">
										{blog.description.replace(/<[^>]+>/g, "").slice(0, 80)}...
									</td>
									<td className="table-cell text-center">
										<div className="action-buttons">
											<button
												onClick={() => navigate(`/blogs/edit-blog/${blog._id}`)}
												className="edit-btn"
											>
												<FiEdit size={16} />
											</button>
											<button
												onClick={() => handleDelete(blog._id)}
												className="delete-btn"
											>
												<FiTrash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(newPage) => setCurrentPage(newPage)}
			/>
		</div>

	);
};

export default Blogs;