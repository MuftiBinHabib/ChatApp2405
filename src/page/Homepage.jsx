import React, { useContext, useEffect } from 'react'
import Chats from '../components/Chats'

import FriendRequest from '../components/FriendRequest'
import Settings from '../components/Settings'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlices'
import User from '../components/User'
import FriendRequestlist from '../components/FriendRequestlist'
import Friendlist from '../components/FriendList'
import BlockList from '../components/BlockList'



const Homepage = () => {

  

 
  return (
    <div className="container">
      <section className='grid grid-cols-2 gap-20'>
        
        <User />
        <FriendRequest />
        
        <FriendRequestlist />
        <Friendlist />
        <BlockList />
      </section>
    </div>
  )
}

export default Homepage