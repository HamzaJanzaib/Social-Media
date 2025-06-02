import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Bell, Home, Navigation, User } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileNavigation = () => {
    const [active, setActive] = useState('home')
    const navigate = useNavigate()

    const navLinks = [
        {
            name: 'Home',
            path: '/',
            active: "home",
            icon: <Home size={20} />
        },
        {
            name: 'Profile',
            path: '/profile',
            active: "profile",
            icon: <User size={20} />
        },
        {
            name: 'Messages',
            path: '/messages',
            active: "messages",
            icon: <Navigation size={20} />
        },
        {
            name: 'Notifications',
            path: '/notifications',
            active: "notifications",
            icon: <Bell size={20} />
        },
    ]

    return (
        <div className="max-w-[300px] rounded-xl shadow bg-white border border-gray-200 p-0 overflow-hidden">
            {/* Cover image */}
            <div className="h-20 relative w-full bg-cover bg-center " style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNp8wSqZzRfEzh-YAy6Hp1AKNLSRDPjYV0Q&s')" }}>
                <Avatar  className=" absolute  right-2/3 -bottom-7 w-16 h-16 overflow-hidden border-4 border-white rounded-full shadow">
                    <AvatarImage src="https://avatar.iran.liara.run/public" />
                </Avatar>
            </div>
            <div className="flex flex-col justify-center ml-8 mt-10 mb-6">
                <h5 className="font-semibold text-lg text-gray-900">Robert Fox</h5>
                <span className="text-sm text-gray-500">Software Engineer</span>
            </div>
            <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors cursor-pointer border-b-1  ${active === link.active
                            ? ' text-black'
                            : 'text-gray-400'
                            }`}
                        onClick={() => { setActive(link.active); navigate(link.path); }}
                    >
                        {link.icon}
                        <span className="ml-3">{link.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProfileNavigation