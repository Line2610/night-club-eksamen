"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 3;

  // Async function til at fetche data
  const fetchPosts = async () => {
    try {
      setLoading(true);
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

  // Kald async function når komponenten mounter
  useState(() => {
    fetchPosts();
  });

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          {/* Side numre */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`text-base cursor-pointer ${
                currentPage === pageNumber
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-600 hover:text-white'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          
          {/* næste > knap */}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-base cursor-pointer text-gray-600 hover:text-white"
            >
              Next &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;