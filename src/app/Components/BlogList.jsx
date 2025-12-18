"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";

// BlogList komponent som håndterer blog posts med pagination
const BlogList = () => {
  // State til at gemme alle blog posts fra API
  const [posts, setPosts] = useState([]);
  
  // State til at holde styr på den nuværende side i pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // State til at vise loading tilstand mens data hentes
  const [loading, setLoading] = useState(true);
  
  // Antal posts der vises per side
  const postsPerPage = 3;

  // Async funktion til at hente blog posts fra API
  const fetchPosts = async () => {
    try {
      setLoading(true); // Starter loading
      
      // Henter data fra localhost API
      const response = await fetch('http://localhost:4000/blogposts');
      const data = await response.json();
      
      // Filtrerer kun valide posts med titel og indhold
      const validPosts = data.filter(post => post && post.title && post.content);
      setPosts(validPosts);
    } catch (error) {
      // Logger fejl hvis API kald fejler
      console.error('Error fetching posts:', error);
    } finally {
      // Stopper loading uanset om kald lykkes eller fejler
      setLoading(false);
    }
  };

  // Kalder fetch funktion når komponenten bliver indlæst første gang
  useState(() => {
    fetchPosts();
  });

  // Pagination logik - beregner hvilke posts der skal vises på nuværende side
  const indexOfLastPost = currentPage * postsPerPage; // Index for sidste post på siden
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // Index for første post på siden
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // Posts for nuværende side
  const totalPages = Math.ceil(posts.length / postsPerPage); // Totalt antal sider

  // Viser loading besked mens data hentes
  if (loading) {
    return <div className="text-white text-center py-8">Loading posts...</div>;
  }

  return (
    // Hoved container med responsiv padding og centreret layout
    <div className="container mx-auto px-4 py-8">
      
      {/* Grid layout til blog posts - én kolonne med maksimal bredde */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-7xl mx-auto">
        {/* Mapper gennem posts for nuværende side og renderer BlogCard for hver */}
        {currentPosts.map((post, index) => (
          <BlogCard 
            key={post.id || index} // Bruger post ID som key eller index som fallback
            post={post} // Sender hele post objektet
            index={index} // Sender index for alternerende layout i BlogCard
            isLast={index === currentPosts.length - 1} // Markerer sidste post for special styling
          />
        ))}
      </div>

      {/* Pagination sektion - kun vist hvis der er mere end én side */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          
          {/* Side numre - genererer knap for hver side */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)} // Skifter til valgt side
              className={`text-base cursor-pointer ${
                currentPage === pageNumber
                  ? 'text-white border-b-2 border-white' // Aktiv side styling - hvid med understreg
                  : 'text-gray-600 hover:text-white' // Inaktiv side styling - grå med hover effekt
              }`}
            >
              {pageNumber}
            </button>
          ))}
          
          {/* "Næste" knap - kun vist hvis ikke på sidste side */}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)} // Går til næste side
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