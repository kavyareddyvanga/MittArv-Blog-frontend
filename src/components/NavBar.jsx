import React,{useContext} from 'react'
import {Link} from 'react-router-dom' 
import {AuthContext} from "../context/authContext";
const NavBar=()=>{
    const {currentUser,logout}=useContext(AuthContext);
    
    return(
        <div className='navbar'>
            <div className='container'>
                <div className='logo'><Link  to="/"><img src="/logo.png"/></Link></div>
                <div className='items'>
                    <Link className="link cat" to="/?cat=art"><h6>ART</h6></Link>
                    <Link className="link cat" to="/?cat=cinema"><h6>CINEMA</h6></Link>
                    <Link className="link cat" to="/?cat=science"><h6>SCIENCE</h6></Link>
                    <Link className="link cat" to="/?cat=music"><h6>MUSIC</h6></Link>
                    <Link className="link cat" to="/?cat=travel"><h6>TRAVEL</h6></Link>
                    <Link className="link cat" to="/?cat=food"><h6>FOOD</h6></Link>
                    
                    <span className='cat username' >{currentUser?.username}</span>
                     {currentUser && (
                        <span className='myposts'>
                            <Link className='link mypost' to="/myposts">My Posts</Link>
                        </span>
                    )}
                    {currentUser ? <span className="log" onClick={logout}>Logout</span> :<Link className='link log' to='/login'>Login</Link>}
                   
                    <span className='write'>
                        <Link className='link' to="/write">Write</Link>
                    </span>

                </div>
            </div>
        </div>
    )
}
export default NavBar