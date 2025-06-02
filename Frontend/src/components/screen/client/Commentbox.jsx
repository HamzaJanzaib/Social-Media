import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const Commentbox = () => {
    return (
        <div className="bg-[#f6f8fb] rounded-xl p-5 max-w-xl">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12">
                    <Avatar>
                        <AvatarImage
                            src="https://avatar.iran.liara.run/public"
                            className="rounded-full w-12 h-12"
                        />
                    </Avatar>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-900">Bessie Cooper</h4>
                            <span className="text-xs text-gray-500">Digital Marketer</span>
                        </div>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <div className="mt-3 text-gray-800 text-[15px]">
                        Fantastic post! Your content always brings a smile to my face. Keep up the great work!
                        <span className="ml-1">👏</span>
                    </div>
                    <button className="mt-4 text-sm text-gray-500 hover:underline px-0 py-0 bg-transparent border-none cursor-pointer">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Commentbox