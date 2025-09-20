import axios from 'axios'
import { useEffect } from 'react'
import React,{useState} from 'react'
import {Link, useLocation} from 'react-router-dom' 
const Home=()=>{
 

  const [posts,setPosts]=useState([])
  const cat=useLocation().search
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await axios.get(`/api/posts${cat}`)
        console.log("API Response:", res.data);
        sconst postsArray = Array.isArray(res.data) ? res.data : Object.values(res.data);
        setPosts(postsArray);
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[cat])


    const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

    return(
        <div className="home">
            <div className="posts">
                {posts.map((post)=>(
                    <div className="post" key={post.id}>
                     
                        <div className="img">
                            {post.img && <img src={post.img} alt={post.title} />}

                        </div>
                        <div className="content">
                            <Link className='link' to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
                            <p className="post-desc">{getText(post.desc)}</p>
                            <button className="read">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
