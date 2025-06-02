import React from 'react'
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Plus } from 'lucide-react';

const AddPerson = ({ friend }) => {
    return (
        <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-xs">
            <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={friend.image} />
                </Avatar>
                <div>
                    <h6 className="text-lg font-semibold text-gray-900">{friend.name}</h6>
                    <span className="text-sm text-gray-500">{friend.Bio}</span>
                </div>
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <Plus className="text-gray-500 cursor-pointer" />
            </button>
        </div>
    )
}

export default AddPerson