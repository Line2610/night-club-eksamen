"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 3;

  // Fetch data med useEffect (Client Component pattern)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/blogposts');
        const data = await response.json();
        const validPosts = data.filter(post => post && post.title && post.content);
        setPosts(validPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) {
    return <div className="text-white text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-7xl mx-auto">
        {currentPosts.map((post, index) => (
          <BlogCard key={post.id || index} post={post} index={index} isLast={index === currentPosts.length - 1}/>
        ))}
      </div>

      {/* Simple Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-6 py-3 border text-sm uppercase font-bold ${
              currentPage === 1 ? 'border-gray-600 text-gray-600' : 'border-white text-white hover:border-[#FF2A70] hover:text-[#FF2A70]'
            }`}
          >
            Previous
          </button>
          
          <span className="text-white">Page {currentPage} of {totalPages}</span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 border text-sm uppercase font-bold ${
              currentPage === totalPages ? 'border-gray-600 text-gray-600' : 'border-white text-white hover:border-[#FF2A70] hover:text-[#FF2A70]'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;