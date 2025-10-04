import { useState } from "react";
import { GetStaticProps } from "next";
import Header from "@/components/layout/Header";
import PostCard from "@/components/common/PostCard";
import PostModal from "@/components/common/PostModal";
import { PostProps, PostData } from "@/interfaces";

interface PostsPageProps {
  initialPosts: PostProps[];
}

const Posts: React.FC<PostsPageProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = (newPost: PostData) => {
    const post: PostProps = {
      ...newPost,
      id: newPost.id || Date.now(),
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Post
          </button>
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <PostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: PostProps[] = await response.json();

    return {
      props: {
        initialPosts: posts,
      },
    };
  } catch (error) {
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};

export default Posts;
