import React from 'react'
import { useAuth } from '../../context/usersContext'

function Unauthorized() {
  const {logout} = useAuth()

 const handleHome = () =>{
  logout()
  window.location.href = "/"
 }


  return (
    <div>
  <div class="grid h-screen place-content-center bg-white px-4">
    <div class="text-center">
      <h1 class="text-9xl font-black text-red-500">401!</h1>

      {/* <p class="text-2xl font-bold tracking-tight text-red-500 sm:text-4xl">Uh-oh!</p> */}

      <p class="mt-4 text-2xl text-gray-500">Unauthorized Access! </p>

      <button
       onClick={handleHome}
        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </button>
    </div>
  </div>
</div>

  )
}

export default Unauthorized