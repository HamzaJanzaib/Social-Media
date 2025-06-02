import {  ChevronLeft } from 'lucide-react'
import React from 'react'

const Back = () => {
    return (
        <div className='text-gray-500 md:hidden flex items-center cursor-pointer'>
            <ChevronLeft /> <h5 >Back</h5>
        </div>
    )
}

export default Back