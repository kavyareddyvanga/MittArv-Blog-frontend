import React, { useState, useContext, useEffect } from "react";
import Menu from "./Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="single">
      <div className="content">
        {/* Only render post image if it exists */}
        {post.img && <img src={post.img} alt="Post" />}

        <div className="user">
          {/* Uppercase placeholder for user */}
          <div className="user-dp-placeholder">
            {post.username ? post.username.charAt(0).toUpperCase() : "G"}
          </div>

          <div className="info">
            <span>{post.username}</span>
            <br />
            <span>Posted {moment(post.date).fromNow()}</span>
          </div>

          {currentUser?.username === post.username && (
            <div className="edit">
              <Link
                to="/write"
                state={{
                  id: post.id,
                  title: post.title,
                  desc: post.desc,
                  cat: post.cat,
                  img: post.img,
                }}
              >
                <img className="edit-symbol" src="/edit.svg" alt="Edit" />
              </Link>
              <img
                onClick={handleDelete}
                className="delete-symbol"
                src="/delete.png"
                alt="Delete"
              />
            </div>
          )}
        </div>

        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>

      <Menu cat={post.cat} currentPostId={post.id} />
    </div>
  );
};

export default Single;
