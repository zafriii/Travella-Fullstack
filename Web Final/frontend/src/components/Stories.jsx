import React, { useState, useEffect } from 'react';
import './blog.css';
import Storydata from './Storydata';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FaShare } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useAuth } from '../store/Auth';
import axios from 'axios';

function Stories() {
  const [blogs, setBlogs] = useState([]);
  const [blogText, setBlogText] = useState('');
  const [blogHeading, setBlogHeading] = useState('');
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user, isLoggedin } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleBlogChange = (event) => {
    setBlogText(event.target.value);
  };

  const handleHeadingChange = (event) => {
    setBlogHeading(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
  
    if (!isLoggedin) {
      setShouldRedirect(true);
      return;
    }
  
    if (shouldRedirect) {
      window.location.href = '/login';
      return null;
    }
  
    if (editMode && editId !== null) {
      try {
        await axios.put(`http://localhost:5000/api/blogs/${editId}`, {
          heading: blogHeading,
          content: blogText,
          name,
        });
  
        const updatedBlogs = blogs.map((blog) => {
          if (blog.id === editId) {
            return {
              ...blog,
              heading: blogHeading,
              content: blogText,
              name,
            };
          }
          return blog;
        });
        setBlogs(updatedBlogs);
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    } else {
      if (blogText.trim() !== '' && blogHeading.trim() !== '') {
        try {
          const response = await axios.post('http://localhost:5000/api/blogs', {
            heading: blogHeading,
            content: blogText,
            name,
          });
          setBlogs([...blogs, response.data]);
        } catch (error) {
          console.error('Error creating blog:', error);
        }
      }
    }
    setBlogText('');
    setBlogHeading('');
    setName('');
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      const updatedBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const editBlog = (id, heading, content, author) => {
    setEditMode(true);
    setEditId(id);
    setBlogHeading(heading);
    setBlogText(content);
    setName(author);
  };

  const handleBlogUpdate = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedData);
      if (!response.ok) {
        throw new Error('Failed to update blog');
      }
      fetchBlogs(); 
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
   

   

    <div className='blogs'>
      <h2><span className='username'>{user.username}</span> Share your travel experience with Travella</h2>

      <div className='blog-container'>
        {Storydata.map(item => (
          <div key={item.id}>
          

          <div className="post">

          <p className='author'>Author :</p>
          <p className='poster'>{item.author}</p>

          </div>

            <h3>{item.name}</h3>
            <p>{item.blog}</p>
            <div className="social-share2">
              <FacebookShareButton url={window.location.href} quote={`Check out this blog: ${item.name}`}>
                Share on Facebook <FaShare />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href} title={`Check out this blog: ${item.name}`} className='share'>
                Share on Twitter <FaShare />
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href} title={`Check out this blog: ${item.name}`} className='share'>
                Share on Whatsapp <FaShare />
              </WhatsappShareButton>
            </div>
          </div>
        ))}
      </div>

      <div className='newblog-container'>
    {blogs.map((blog) => (
          <div key={blog._id}>
            <div className="post">
              <p>Author :</p>
              <p className='poster'>{blog.name}</p>
            </div>
            <h3>{blog.heading}</h3>
            <p>{blog.content}</p>
            {isLoggedin && (
              <div>
                <button className='edit' onClick={() => editBlog(blog._id, blog.heading, blog.content, blog.name)}>Edit</button>
                <button onClick={() => deleteBlog(blog._id)}>Delete</button>
              </div>
            )}
            <div className="social-share2">
              <FacebookShareButton url={window.location.href} quote={`Check out this blog: ${blog.heading}`}>
                Share on Facebook <FaShare />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href} title={`Check out this blog: ${blog.heading}`} className='share'>
                Share on Twitter <FaShare />
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href} title={`Check out this blog: ${blog.heading}`} className='share'>
                Share on Whatsapp <FaShare />
              </WhatsappShareButton>
            </div>
          </div>
        ))}
      </div>

      <h4 className='write'>Write your blogs, share your thoughts <FaPen /></h4>

      <div className='blog-area'>
        <form onSubmit={handleBlogSubmit}>
          <input
            type='text'
            value={name}
            onChange={handleNameChange}
            placeholder='Enter your name...'
          />
          <input
            type='text'
            value={blogHeading}
            onChange={handleHeadingChange}
            placeholder='Enter blog heading...'
          />
          <textarea
            value={blogText}
            onChange={handleBlogChange}
            placeholder='Write your blog...'
          />
          {!isLoggedin && (
            <button className='redirect' onClick={() => { window.location.href = '/login'; }}>
              Post
            </button>
          )}
          {isLoggedin && (
            <button className='submit' type='submit'>{editMode ? 'Save' : 'Post'}</button>
          )}
        </form>
    
      </div>
    </div>


  );
}

export default Stories;


