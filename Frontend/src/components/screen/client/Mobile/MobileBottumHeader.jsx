import { Bell, Home, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom'

const MobileBottumHeader = () => {
    const [active, setActive] = useState('home')
    const navgate = useNavigate()

    return (
        <div className='flex md:hidden items-center justify-between p-5 border-t-1 px-8'>
            <Home
                className={`cursor-pointer ${active === 'home' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => {
                    navgate("/")
                    setActive('home')
                }}
            />
            <Search
                className={`cursor-pointer ${active === 'search' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => {
                    setActive('search');
                    navgate("/search")
                }}
            />
            <Bell
                className={`cursor-pointer ${active === 'bell' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => {
                    setActive('bell');
                    navgate("/notifications")
                }}
            />
            <Avatar
                className={`cursor-pointer ${active === 'avatar' ? 'ring-2 ring-black' : ''}`}
                onClick={() => {
                    setActive('avatar');
                    navgate("/profile")
                }}
            >
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
        </div>
    )
}

export default MobileBottumHeader