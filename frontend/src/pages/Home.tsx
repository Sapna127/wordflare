import { Appbar } from "../components/Appbar";
import { Card } from "../components/Card";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";

export const Home = () => {
    const { loading, blogs } = useBlogs();

    return (
        <div>
            <Appbar />
            <HeroSection />
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-screen-lg px-4">
                    <h2 className="text-2xl font-semibold mb-6">Recent Blogs</h2>
                    {loading ? (
                        <div>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </div>
                    ) : (
                        blogs.map(blog => (
                            <Card
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"12.4.2024"}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="bg-gray-100 py-16">
            <div className="max-w-screen-lg mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to wordflare</h1>
                <p className="text-lg text-gray-700 mb-6">Discover, read, and share stories on the topics that matter to you.</p>
                <Link to="/publish">
                    <button className="px-6 py-3 bg-green-700 text-white font-medium rounded-full hover:bg-green-800">
                        Write a Story
                    </button>
                </Link>
            </div>
        </div>
    );
};
