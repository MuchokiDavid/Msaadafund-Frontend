import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
     <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-9xl font-bold text-center text-red-300 mb-4">404!</h1>
        <p className="text-lg text-gray-700 mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go back to home
        </Link>
      </div>
    </div>

    </div>
  )
}

export default NotFound