// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import api from "../axios";  // use your custom axios instance

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const cat = useLocation().search;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get(`/posts${cat}`); // ✅ using api
//         console.log("API Response:", res.data);

//         setPosts(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };

//     fetchData();
//   }, [cat]);

//   const getText = (html) => {
//     if (!html) return "";
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent;
//   };

//   if (!posts.length) {
//     return <p>No posts found</p>;
//   }

//   return (
//     <div className="home">
//       <div className="posts">
//         {posts.map((post) => (
//           <div className="post" key={post.id}>
//             <div className="img">
//               {post.img ? (
//                 <img src={post.img} alt={post.title || "Post Image"} />
//               ) : (
//                 <div>No Image</div>
//               )}
//             </div>
//             <div className="content">
              
//                 <h1>{post.title || "Untitled Post"}</h1>
             
//               <p className="post-desc">{getText(post.desc)}</p>
//               <Link className="link" to={`/post/${post.id}`}>
//                 <button className="read">Read More</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from "../axios";  // your custom axios instance


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // search state
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/posts${cat}`);
        setPosts(Array.isArray(res.data) ? res.data : []);
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

  // filter posts based on search input
  const searchResults = posts.filter(post =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="home">
      {/* Search bar */}
      <div className="searchContainer">
        <input
          type="search"
          placeholder="Search posts..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Posts */}
      {searchResults.length > 0 ? (
        <div className="posts">
          {searchResults.map((post) => (
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
    </div>
  );
};

export default Home;

