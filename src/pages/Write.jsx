import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios";
import moment from "moment";

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postState = location.state; // undefined for new post

  const [title, setTitle] = useState(postState?.title || "");
  const [value, setValue] = useState(postState?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(postState?.cat || "");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(postState?.img || "");

  // Get user from sessionStorage
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  // Redirect unauthorized users immediately
  if (!user) {
    alert("Login to write a post!");
    navigate("/login", { replace: true });
    return null; // prevent rendering
  }

  const uid = user.id;

  const upload = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imgUrl = await upload();

      const postData = {
        title,
        desc: value,
        cat,
        img: imgUrl || preview || "",
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        uid,
      };

      if (postState?.id) {
        await api.put(`/posts/${postState.id}`, postData, { withCredentials: true });
      } else {
        await api.post("/posts/", postData, { withCredentials: true });
      }

      navigate("/");
    } catch (err) {
      console.error("Post submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle preview directly inside input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Status:</b> Draft</span>
          <span><b>Visibility:</b> Public</span>

          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label className="file" htmlFor="file">Upload Image</label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "300px", marginTop: "10px", borderRadius: "5px" }}
            />
          )}

          <div className="buttons">
            <button disabled={loading}>Save as Draft</button>
            <button onClick={handleSubmit} disabled={loading || !user}>
              {postState?.id ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          {["art", "science", "cinema", "food", "travel", "music"].map((c) => (
            <div className="cat" key={c}>
              <input
                type="radio"
                checked={cat === c}
                id={c}
                name="cat"
                value={c}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
