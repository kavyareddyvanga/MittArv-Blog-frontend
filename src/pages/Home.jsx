import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts${cat}`);
        console.log("API Response:", res.data);

        // Ensure posts is always an array
        setPosts(Array.isArray(res.data) ? res.data : []);

   
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    if (!html) return ""; // handle undefined or null
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (!posts.length) {
    return <p>No posts found</p>; // handle empty array
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id || Math.random()}>
            <div className="img">
              {post.img ? (
                <img src={post.img} alt={post.title || "Post Image"} />
              ) : (
                <div>No Image</div>
              )}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id || ""}`}>
                <h1>{post.title || "Untitled Post"}</h1>
              </Link>
              <p className="post-desc">{getText(post.desc)}</p>
              <button className="read">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
