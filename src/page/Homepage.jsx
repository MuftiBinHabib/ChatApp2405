import React from 'react'
import Chats from '../components/Chats'
import Groups from '../components/Groups'
import FriendRequest from '../components/FriendRequest'
import Settings from '../components/Settings'

const Homepage = () => {
  return (
    <div className="container">
      <section className='grid grid-cols-2 gap-20'>
        <Chats />
        <Groups/>
        <FriendRequest />
        <Settings />
      </section>
    </div>
  )
}

export default Homepage