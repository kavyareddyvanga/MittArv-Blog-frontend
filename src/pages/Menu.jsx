import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ cat, currentPostId }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        console.log("API Response:", res.data);
        const filteredPosts = res.data.filter((post) => post.id !== currentPostId);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, currentPostId]);

  const handleReadMore = (id) => {
    navigate(`/post/${id}`); // Navigate to single post page
  };

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt={post.title} />
          <h2>{post.title}</h2>
          <button onClick={() => handleReadMore(post.id)}>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
