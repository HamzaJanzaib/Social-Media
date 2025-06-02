import { Navigation } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MobileTopHeader = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[70px] md:hidden w-full px-4 flex items-center justify-between border-b border-gray-100 bg-white'>
            <div className="flex items-center space-x-1 min-w-[160px]">
                <img
                    className="h-9"
                    src="/Logomark.png"
                    alt="dummyLogoColored"
                />
                <span className="font-semibold text-lg">Social</span>
            </div>

            <Navigation size={20} onClick={() => { navigate('/messages'); }} className='text-black/60 cursor-pointer' />
        </div>
    )
}

export default MobileTopHeader