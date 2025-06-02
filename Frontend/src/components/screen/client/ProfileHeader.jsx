import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Bookmark, Grid2x2, Settings } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileHeader = () => {
    const [active, setActive] = useState('Posts')
    const navigate = useNavigate()
    return (
        <div className="mx-auto mt-6 bg-white rounded-lg border border-gray-100 xs:max-w-md md:w-full">
            <div className="flex flex-col items-center px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                {/* Avatar and user info */}
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
                    <Avatar className="w-20 h-20 rounded-full border-4 border-white shadow-md">
                        <AvatarImage
                            src="https://avatar.iran.liara.run/public"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </Avatar>
                    <div className="text-center md:text-left">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
                            <h4 className="text-xl font-semibold text-gray-900">Robert Fox</h4>
                            <span className="text-sm text-gray-400 font-medium md:ml-2">@robert</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Software Engineer</div>
                    </div>
                </div>
                {/* Stats */}
                <div className="flex items-center justify-center gap-8 mt-6 md:mt-0 md:gap-12">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">12</div>
                        <div className="text-sm text-gray-500">Posts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">207</div>
                        <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">64</div>
                        <div className="text-sm text-gray-500">Following</div>
                    </div>
                </div>
            </div>
            {/* Tabs */}
            <div className="border-t border-gray-100 flex flex-row justify-between sm:flex-row gap-2 sm:justify-evenly sm:gap-8 px-6 sm:px-8">
                <button onClick={() => {
                    setActive("Posts")
                    navigate("/posts")
                }} className={`py-4 text-gray-500 hover:text-gray-900 text-sm font-semibold focus:outline-none ${active === "Posts"
                        ? "text-gray-900 border-b-2 border-gray-900 font-semibold"
                        : "text-gray-500 hover:text-gray-900 font-medium"
                    }`}>
                    <span className='hidden md:block'>
                        My Posts
                    </span>
                    <Grid2x2 className=' md:hidden' />
                </button>
                <button onClick={() => {
                    setActive("Saved")
                    navigate("/saved")
                }} className={`py-4 text-gray-500 hover:text-gray-900 text-sm font-semibold focus:outline-none ${active === "Saved"
                        ? "text-gray-900 border-b-2 border-gray-900 font-semibold"
                        : "text-gray-500 hover:text-gray-900 font-medium"
                    }`}>
                    <span className='hidden md:block'>Saved Posts</span>
                    <Bookmark className='md:hidden' />
                </button>
                <button onClick={() => {
                    setActive("Settings")
                    navigate("/settings")
                }} className={`py-4 text-gray-500 hover:text-gray-900 text-sm font-semibold focus:outline-none ${active === "Settings"
                        ? "text-gray-900 border-b-2 border-gray-900 font-semibold"
                        : "text-gray-500 hover:text-gray-900 font-medium"
                    }`}>
                    <span className='hidden md:block'>Settings</span>
                    <Settings className='md:hidden' />
                </button>
            </div>
        </div>
    )
}

export default ProfileHeader