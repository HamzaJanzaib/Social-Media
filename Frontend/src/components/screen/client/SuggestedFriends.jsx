import React from 'react'
import AddPerson from './AddPerson'

const SuggestedFriends = () => {
    const SuggestedFriend = [
        {
            name: "Olivia Anderson",
            Bio: "Financial Analyst",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            name: "Thomas Baker",
            Bio: "Project Manager",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Lily Lee",
            Bio: "Graphic Designer",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            name: "Andrew Harris",
            Bio: "Data Scientist",
            image: "https://randomuser.me/api/portraits/men/44.jpg"
        },
    ]
    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs">
            <h5 className="font-semibold text-gray-800 mb-4">Suggested Friends</h5>
            <div className="space-y-2 border-t-1 py-4">
                {SuggestedFriend.map((friend, index) => (
                    <AddPerson key={index} friend={friend} />
                ))}
            </div>
        </div>
    )
}

export default SuggestedFriends