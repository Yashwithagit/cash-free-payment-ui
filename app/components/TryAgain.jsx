'use client'
import React from 'react'

function TryAgain({handleTryAgainClick}) {
  return (
    <div className='flex justify-center h-screen items-center'>
        <button className='bg-white font-bold text-orange-800 hover:bg-orange-100  text-2xl py-2 px-4 border border-orange-400 rounded shadow' onClick={handleTryAgainClick}>Try Again</button>
    </div>
  )
}

export default TryAgain