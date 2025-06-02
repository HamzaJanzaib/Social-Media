import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { CloudUpload } from 'lucide-react'
import React from 'react'

const WritePost = () => {
    return (
        <div className="bg-white rounded-xl shadow border p-4 w-full mx-auto">
            <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage
                        src="https://avatar.iran.liara.run/public"
                        className="w-12 h-12 rounded-full"
                    />
                </Avatar>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1 bg-transparent outline-none border-b-1 0 border-gray-500 text-lg placeholder-gray-300 text-gray-600 py-3"
                />
            </div>
            <div className="flex items-center justify-between mt-4">
                <button
                    type="button"
                    className="flex items-center gap-2 text-gray-900 cursor-pointer ml-10 font-medium px-2 py-1 rounded hover:bg-gray-50 transition"
                >
                    <label htmlFor="image" className='text-gray-500 cursor-pointer text-[14px] font-medium flex items-center gap-1'>
                        <CloudUpload />
                        Add Media
                    </label>
                </button>
                <input id='image' type="file" className="hidden" />
                <button
                    type="button"
                    className="bg-[#4C68D5] text-white cursor-pointer font-medium px-6 py-2 rounded-full"
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default WritePost