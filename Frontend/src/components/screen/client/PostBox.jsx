import { Heart, MessageCircle } from 'lucide-react';
import React from 'react';

const PostBox = () => {
    return (
        <div className="border border-gray-200 rounded-xl bg-white max-w-xl mx-auto mt-6 font-sans shadow-md">
            {/* Header */}
            <div className="flex items-center px-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-3" />
                <div className="flex-1">
                    <div className="font-semibold text-base">Bessie Cooper</div>
                    <div className="text-gray-500 text-sm">Developer</div>
                </div>
                <button className="text-gray-500 hover:text-blue-500 font-medium px-3 py-1 rounded transition-colors duration-150 cursor-pointer">
                    Follow
                </button>
            </div>
            {/* Content */}
            <div className="px-6 py-3 tracking-tight text-gray-800/80">
                <p className="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos cum rem sequi excepturi deserunt ipsa odio neque at ducimus nesciunt.
                </p>
                <div className="w-full flex justify-center">
                    <img
                        src="https://triare.net/wp-content/uploads/2021/10/TRIARE-insights-post-development-support-for-business.png"
                        alt="Post"
                        className="rounded-lg max-h-60 object-contain"
                    />
                </div>
            </div>
            {/* Actions */}
            <div className="flex items-center py-2 px-4 border-t border-gray-200 pb-4 gap-4">
                <button className="flex items-center text-gray-500 hover:text-blue-500 font-medium transition-colors duration-150 cursor-pointer">
                    <Heart className="w-5 h-5 mr-1" />
                    Like
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500 font-medium transition-colors duration-150 cursor-pointer">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    Comment
                </button>
            </div>
        </div>
    );
};

export default PostBox;