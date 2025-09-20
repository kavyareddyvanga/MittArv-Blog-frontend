import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get("/api/posts/myposts", { withCredentials: true });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyPosts();
  }, [currentUser, navigate]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          You haven't posted anything yet.
        </p>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                {post.img ? <img src={post.img} alt={post.title} /> : <div>No Image</div>}
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p className="post-desc">
                  {getText(post.desc).length > 200
                    ? getText(post.desc).substring(0, 200) + "..."
                    : getText(post.desc)}
                </p>
                <button className="read">Read More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
