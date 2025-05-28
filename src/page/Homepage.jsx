import React, { useContext } from 'react'
import Chats from '../components/Chats'
import Groups from '../components/Groups'
import FriendRequest from '../components/FriendRequest'
import Settings from '../components/Settings'
import LoginData from '../../context/LoginData'
import {logindata} from '../../context/LoginData'
import { useSelector } from 'react-redux'



const Homepage = () => {

 const data = useSelector((state)=>(state.userLogin.value))
 console.log(data)

 
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