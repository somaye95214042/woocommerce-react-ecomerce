import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../utils/Posts";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPostById = async () => {
      const data = await fetchPostById(id);
      setPost(data);
    };
    loadPostById();
  }, [id]);

  if (!post) return <p className="text-center text-lg text-gray-600">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-50">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">{post.title.rendered}</h1>

      {/* Featured Image */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <div className="mb-6">
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose prose-lg text-gray-700 space-y-4">
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
};

export default PostPage;
