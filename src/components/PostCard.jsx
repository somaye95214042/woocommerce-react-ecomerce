import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Title box centered vertically but not horizontally */}
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-[#fee7cd] bg-opacity-60 text-[#1e3c72] text-left py-8 px-4 font-normal text-xl z-10">
        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </div>

      {/* Featured Image */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <Link to={`/post/${post.id}`}>
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            className="w-full h-120 object-cover"
          />
        </Link>
      )}
    </div>
  );
};

export default PostCard;
