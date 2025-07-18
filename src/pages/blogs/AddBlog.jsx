import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddBlog.css";
import { API_BASE_URL } from "./api";




const AddBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    bannerImage: null,
    thumbnailImage: null,
    redirectLink: "",
    metaTitle: "",
    metaDescription: "",
    description: "",
    faqs: [{ question: "", answer: "" }],
  });

  const [previewImages, setPreviewImages] = useState({
    bannerImage: null,
    thumbnailImage: null,
  });

  const [loading, setLoading] = useState(false);

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

  const {
    title,
    bannerImage,
    thumbnailImage,
    redirectLink,
    metaTitle,
    metaDescription,
    description,
    faqs,
  } = formData;

  if (!title || !bannerImage || !thumbnailImage || !redirectLink || !metaTitle || !metaDescription || !description) {
    alert("All fields are required.");
    return;
  }

  setLoading(true);
  try {
    const payload = new FormData();
    payload.append("title", title);
    payload.append("redirectLink", redirectLink);
    payload.append("metaTitle", metaTitle);
    payload.append("metaDescription", metaDescription);
    payload.append("description", description);
    payload.append("bannerImage", bannerImage);
    payload.append("thumbnailImage", thumbnailImage);
    payload.append("faqs", JSON.stringify(faqs)); // Send the FAQs as a JSON string

    const response = await axios.post(`${API_BASE_URL}/blogs`, payload);

    if (response.data.success) {
      alert("Blog created successfully!");
      navigate("/blogs");
    } else {
      alert("Blog creation failed.");
    }
  } catch (err) {
    console.error("Blog creation failed:", err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  return (
   <div className="form-container">
  <h2 className="form-title">Add New Blog</h2>
  <form onSubmit={handleSubmit} className="form-wrapper">
    {/* Title Input */}
    <div className="form-group">
      <label className="form-label">Blog Title *</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        placeholder="Enter blog title"
        className="form-input"
        required
      />
    </div>

    {/* Image Upload & Previews */}
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
          required
        />
    </div>
      <div className="image-upload">
        <label className="form-label">Thumbnail Image</label>
        {previewImages.thumbnailImage && (
          <img src={previewImages.thumbnailImage} alt="Thumbnail" className="image-preview" />
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

    {/* Redirect Link */}
    <div className="form-group">
      <label className="form-label">Redirect Link *</label>
      <input
        type="url"
        name="redirectLink"
        value={formData.redirectLink}
        onChange={handleChange}
        placeholder="Enter the redirect link"
        className="form-input"
        required
      />
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

    {/* FAQs */}
    <div className="faq-section">
      <h3 className="faq-title">FAQs</h3>
      {formData.faqs.map((faq, index) => (
        <div key={index} className="faq-row">
          <div className="faq-inputs">
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
              className="form-textarea"
              rows="2"
              required
            />
          </div>
          <button type="button" onClick={() => handleRemoveFaq(index)} className="remove-btn">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFaq} className="add-faq-btn">
        Add FAQ
      </button>
    </div>

    {/* Submit */}
    <div className="form-submit">
      <button
        type="submit"
        className="submit-btn"
        disabled={loading}
      >
        {loading ? "Adding..." : "Save Blog"}
      </button>
    </div>
  </form>
</div>

  );
};

export default AddBlog;