import React from 'react'
import { useSelector } from 'react-redux'

const SideBar = () => {

  const data = useSelector((state)=>(state.userLogin.value))
   console.log(data)

   
  return (
    <div className="container">
        <section className='font-display ms-4 mt-4 border min-h-screen w-55'>
            <h2 className='mt-4 ms-4'>Welcome! {data.name}</h2>

            <ul className='w-50 space-y-2 mt-5 ms-4'>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Chats</li>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500' >Groups</li>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Friend Requests</li>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Settings</li>
            </ul>


            <ul></ul>
        </section>
    </div>
  )
}

export default SideBar