import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, User } from 'lucide-react';

const Header = () => {
    return (
        <div className='hidden md:block'>
            <nav className="h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between border-b border-gray-100 bg-white">
                {/* Left: Logo and Social */}
                <div className="flex items-center space-x-3 min-w-[160px]">
                    <img
                        className="h-9"
                        src="/Logomark.png"
                        alt="dummyLogoColored"
                    />
                    <span className="font-semibold text-lg">Social</span>
                </div>

                {/* Center: Search */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-[500px]">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 w-full"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" size={18} />
                    </div>
                </div>

                {/* Right: Logout and User Icon */}
                <div className="flex items-center space-x-4 min-w-[100px] justify-end">
                    <span className="text-sm cursor-pointer">Logout</span>
                    <User className="text-black/60 cursor-pointer" size={20}  />
                </div>
            </nav>
        </div>
    );
};

export default Header;
