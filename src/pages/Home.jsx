
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from "../axios";  // your custom axios instance

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts${cat}`);
        setPosts(Array.isArray(res.data) ? res.data : []);
        setCurrentPage(1); // reset to first page on category change
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Filter posts based on search input
  const searchResults = posts.filter(post =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(searchResults.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
 
      <div className="searchContainer">
        <input
          type="search"
          placeholder="Search posts..."
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="searchInput"
        />
      </div>

   
      {currentPosts.length > 0 ? (
        <div className="posts">
          {currentPosts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                {post.img ? (
                  <img src={post.img} alt={post.title || "Post Image"} />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div className="content">
                <h1>{post.title || "Untitled Post"}</h1>
                <p className="post-desc">{getText(post.desc)}</p>
                <Link className="link" to={`/post/${post.id}`}>
                  <button className="read">Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}

   
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
