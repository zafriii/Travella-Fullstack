const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
  try {
    const { heading, content, name } = req.body;
    const blog = new Blog({ heading, content, name }); 
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const updateBlog = async (req, res) => {
  try {
    const { heading, content,name } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, { heading, content, name }, { new: true });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
