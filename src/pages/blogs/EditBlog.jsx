import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddBlog.css'; // Reuse AddBlog.css
import { API_BASE_URL } from './api';

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL

  const [formData, setFormData] = useState({
    title: '',
    bannerImage: null,
    metaTitle: '',
    metaDescription: '',
    description: '',
  });

  const [previewImages, setPreviewImages] = useState({
    bannerImage: null,
  });

  const [loading, setLoading] = useState(false);

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://api.nakshatranamahacreations.in/blogs/blog/${id}`);
        const blog = res.data.data;
        setFormData({
          title: blog.title,
          bannerImage: null, // File input starts empty
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          description: blog.description,
        });
        setPreviewImages({
          bannerImage: blog.bannerImage, // Show existing image as preview
        });
      } catch (err) {
        console.error('Failed to fetch blog:', err.message);
        alert('Failed to load blog data.');
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({ ...prev, [name]: previewUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({ ...prev, description: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, bannerImage, metaTitle, metaDescription, description } = formData;

    if (!title || !metaTitle || !metaDescription || !description) {
      alert('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('title', title);
      payload.append('metaTitle', metaTitle);
      payload.append('metaDescription', metaDescription);
      payload.append('description', description);
      if (bannerImage) {
        payload.append('bannerImage', bannerImage); // Only append if new image is selected
      }

      const response = await axios.put(`https://api.nakshatranamahacreations.in/blogs/blog/${id}`, payload);

      if (response.data.success) {
        alert('Blog updated successfully!');
        navigate('/blogs');
      } else {
        alert('Blog update failed.');
      }
    } catch (err) {
      console.error('Blog update failed:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        {/* Title Input */}
        <div className="form-group">
          <label className="form-label">Blog Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="form-input"
            required
          />
        </div>

        {/* Banner Image */}
        <div className="image-upload-row">
          <div className="image-upload">
            <label className="form-label">Banner Image *</label>
            {previewImages.bannerImage && (
              <img src={previewImages.bannerImage} alt="Banner" className="image-preview" />
            )}
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Meta Title */}
        <div className="form-group">
          <label className="form-label">Meta Title *</label>
          <textarea
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            placeholder="Enter meta title"
            rows="2"
            className="form-textarea"
            required
          />
        </div>

        {/* Meta Description */}
        <div className="form-group">
          <label className="form-label">Meta Description *</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description"
            rows="3"
            className="form-textarea"
            required
          />
        </div>

        {/* CKEditor */}
        <div className="form-group">
          <label className="form-label">Blog Description *</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={handleCKEditorChange}
          />
        </div>

        {/* Submit */}
        <div className="form-submit">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;