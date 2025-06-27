import { getAuth, onAuthStateChanged , signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import { userLoginInfo } from '../slices/userSlices'



const SideBar = () => {

  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth()
  


 useEffect(() =>{

  onAuthStateChanged(auth, (user) => {
    
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
    navigate('/login')
  }
});
 }, [dispatch])

useEffect(() => {
  if(!data){
    navigate('/login')
  }
} , [])


  const data = useSelector((state)=>(state.userLogin.value))
  //  console.log(data)

   const handleLogOut=()=> {
    signOut(auth).then(() => {
      navigate('/')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  alert(error)
});
   }

  //  }
  return (
    <div className="container">
        <section className='font-display border min-h-screen w-55'>
          <Link to='/homepage'><h2
  className={`mt-4 ms-4 ${
    pathname === '/homepage' ? 'bg-red-500 text-white' : ''
  }`}
>
  Welcome! {data.name}
</h2>
</Link>


            <ul className={`w-50 space-y-2  mt-5 ms-4 `}>
                <Link to='/homepage/chats'>
  <li
    className={`text-black hover:bg-green-400 ${
      pathname === '/homepage/chats' ? 'bg-red-500 text-white' : ''
    } hover:text-white duration-500`}
  >
    Chats
  </li>
</Link>
                <li className={`text-black hover:bg-green-400  hover:text-white duration-500`}>Users</li>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Friend Requests</li>
                <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Settings</li>
                 <li className='text-black hover:bg-green-400 hover:text-white duration-500'>Friends</li>
                <li><button  onClick={handleLogOut} className ='cursor-pointer'>Logout</button></li>
            </ul>


            <ul></ul>
        </section>
    </div>
  )
}

export default SideBar