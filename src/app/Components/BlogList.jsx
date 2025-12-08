import { Suspense } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <FetchBlogPosts />
    </Suspense>
  );
};

const FetchBlogPosts = async () => {
  "use server";
  const response = await fetch('http://localhost:4000/blogposts');
  const posts = await response.json();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-7xl mx-auto">
        {posts.map((post, index) => (
          post ? <BlogCard key={post.id || index} post={post} index={index} isLast={index === posts.length - 1}/> : null
        ))}
      </div>
    </div>
  );
};

export default BlogList;