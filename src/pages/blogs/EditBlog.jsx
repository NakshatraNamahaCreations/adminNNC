import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./api";

import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    bannerImage: null,
    thumbnailImage: null,
    redirectLink: "",
    metaTitle: "",
    metaDescription: "",
    description: "",
    faqs: [{ question: "", answer: "" }] // Initialize with one FAQ field
  });

  const [previewImages, setPreviewImages] = useState({
    bannerImage: "",
    thumbnailImage: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch the blog data from the API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        const blog = res.data.data;

        setFormData({
          title: blog.title || "",
          bannerImage: null, // Don't set the banner image directly, upload it when editing
          thumbnailImage: null, // Same for the thumbnail image
          redirectLink: blog.redirectLink || "",
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
          description: blog.description || "",
          faqs: blog.faqs || [{ question: "", answer: "" }] // Assuming FAQs are saved in the DB as well
        });

        setPreviewImages({
          bannerImage: blog.bannerImage || "",
          thumbnailImage: blog.thumbnailImage || "",
        });
      } catch (err) {
        console.error("Failed to load blog:", err.message);
        alert("Unable to fetch blog data.");
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
      setPreviewImages((prev) => ({
        ...prev,
        [name]: previewUrl,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({ ...prev, description: data }));
  };

  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const newFaqs = [...formData.faqs];
    newFaqs[index][name] = value;
    setFormData((prev) => ({ ...prev, faqs: newFaqs }));
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleRemoveFaq = (index) => {
    const newFaqs = [...formData.faqs];
    newFaqs.splice(index, 1);
    setFormData((prev) => ({ ...prev, faqs: newFaqs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("redirectLink", formData.redirectLink);
      data.append("metaTitle", formData.metaTitle);
      data.append("metaDescription", formData.metaDescription);
      data.append("description", formData.description);

      if (formData.bannerImage) {
        data.append("bannerImage", formData.bannerImage);
      }

      if (formData.thumbnailImage) {
        data.append("thumbnailImage", formData.thumbnailImage);
      }

      data.append("faqs", JSON.stringify(formData.faqs)); // Send FAQs as a JSON string

      const response = await axios.put(`${API_BASE_URL}/blog/${id}`, data);

      if (response.data.success) {
        alert("Blog updated successfully!");
        navigate("/blogs");
      } else {
        alert("Blog update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err.message);
      alert("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="edit-blog-container">
  <h2 className="edit-blog-title">Edit Blog</h2>
  <form onSubmit={handleSubmit} className="edit-blog-form">

    <div className="form-group">
      <label className="form-label">Blog Title *</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
        required
        placeholder="Enter blog title"
      />
    </div>

    <div className="image-upload-section">
      <div className="image-upload">
        <label className="form-label">Banner Image *</label>
        {previewImages.bannerImage && (
          <img src={previewImages.bannerImage} alt="Banner Preview" className="image-preview" />
        )}
        <input
          type="file"
          name="bannerImage"
          accept="image/*"
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="image-upload">
        <label className="form-label">Thumbnail Image</label>
        {previewImages.thumbnailImage && (
          <img src={previewImages.thumbnailImage} alt="Thumbnail Preview" className="image-preview" />
        )}
        <input
          type="file"
          name="thumbnailImage"
          accept="image/*"
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </div>

    <div className="form-group">
      <label className="form-label">Redirect Link *</label>
      <input
        type="url"
        name="redirectLink"
        value={formData.redirectLink}
        onChange={handleChange}
        className="form-input"
        required
        placeholder="Enter the redirect link"
      />
    </div>

    <div className="form-group">
      <label className="form-label">Meta Title *</label>
      <textarea
        name="metaTitle"
        value={formData.metaTitle}
        onChange={handleChange}
        placeholder="Enter meta title"
        rows="2"
        className="form-input"
        required
      />
    </div>

    <div className="form-group">
      <label className="form-label">Meta Description *</label>
      <textarea
        name="metaDescription"
        value={formData.metaDescription}
        onChange={handleChange}
        placeholder="Enter meta description"
        rows="3"
        className="form-input"
        required
      />
    </div>

    <div className="form-group">
      <label className="form-label">Blog Description *</label>
      <CKEditor
        editor={ClassicEditor}
        data={formData.description}
        onChange={handleCKEditorChange}
      />
    </div>

    <div className="faq-section">
      <h3 className="faq-title">FAQs</h3>
      {formData.faqs.map((faq, index) => (
        <div key={index} className="faq-group">
          <div className="form-group">
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={faq.question}
              onChange={(e) => handleFaqChange(index, e)}
              className="form-input"
              required
            />
            <textarea
              name="answer"
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => handleFaqChange(index, e)}
              className="form-input"
              rows="3"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveFaq(index)}
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFaq} className="add-btn">Add FAQ</button>
    </div>

    <div className="submit-section">
      <button
        type="submit"
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </div>
  </form>
</div>

  );
};

export default EditBlog;