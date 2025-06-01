import React, { useContext, useEffect } from 'react'
import Chats from '../components/Chats'
import Groups from '../components/Groups'
import FriendRequest from '../components/FriendRequest'
import Settings from '../components/Settings'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlices'



const Homepage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth()
  console.log(auth.currentUser)

  console.log(auth.currentUser)

 const data = useSelector((state)=>(state.userLogin.value))

 useEffect(() =>{

  onAuthStateChanged(auth, (user) => {
    console.log(user)
  if (user) {
   dispatch(userLoginInfo({
name: user.displayName,
    email: user.email,
    uid: user.uid
   }
    
   ))
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    dispatch(userLoginInfo(null))
  }
});
 }, [dispatch])

useEffect(() => {
  if(!data){
    navigate('/login')
  }
} , [])


 
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