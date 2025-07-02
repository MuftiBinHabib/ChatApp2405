import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { chattinguser } from '../slices/chatSlice';
import { useSelector } from 'react-redux';

const FriendListMsg = () => {
  const user = useSelector((state)=>state.chatInfo.value)
 
    const[friendlist, setfriendlist] = useState([])
const[filterresult, setfilterresult] = useState([])
const[testresult, settestresult] = useState([])
     const db = getDatabase();
     const auth = getAuth();
     const dispatch = useDispatch()
     
    
       useEffect(() =>{
          const requestlistRef = ref(db, "friendlist/");
      onValue(requestlistRef, (snapshot) => {
        const array = []
        snapshot.forEach((item) =>{
          // if(item.key != auth.currentUser.uid){  condition if not match with uid
          // }
          
      
         
        if(auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid  ){
    
            array.push({...item.val() , id : item.key})
        }
        })
        setfriendlist(array)
      });
        } , [])
console.log(friendlist)

let handleSelectUser = (item) =>{
 if(auth.currentUser.uid == item.senderid){
 dispatch(chattinguser({name: item.receivername, id: item.receiverid}))
 } else {
   dispatch(chattinguser({name: item.sendername, id: item.senderid}))
 }
}

let handleSearch = (e) => {
  
  let filterresult = friendlist.filter((item) => item.sendername.toUpperCase().replaceAll(" ","").includes(e.target.value.toUpperCase()) || item.receivername.toUpperCase().replaceAll(" ","").includes(e.target.value.toUpperCase()));
  setfilterresult(filterresult)
}

console.log(filterresult)
  return (
    <div className="w-1/4 border-r-2 overflow-y-auto">
        {/* search compt */}
        <div className="border-b-2 py-4 px-2">
          <input
          onChange={handleSearch}
            type="text"
            placeholder="Search Users"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        {/* end search compt */}
        {/* user list */}
        

        {filterresult ?
        filterresult.map((item) => (

        <div onClick = {() => handleSelectUser(item)} className={`flex flex-row py-4 px-2 ${user?.id == item.senderid || user?.id == item.receiverid ? "bg-green-400 text-white" : "bg-transparent"} justify-center items-center border-b-2`}>
          
          <div className="w-100">
            {auth.currentUser.uid == item.senderid ? (
            <div className="text-lg font-semibold">{item.receivername}</div> ):( 
            <div className="text-lg font-semibold">{item.sendername}</div> )
            }
          
          </div>
        </div>
        )) : 
        
        friendlist.map((item) => (

        <div onClick = {() => handleSelectUser(item)} className={`flex flex-row py-4 px-2 ${user?.id == item.senderid || user?.id == item.receiverid ? "bg-green-400 text-white" : "bg-transparent"} justify-center items-center border-b-2`}>
          
          <div className="w-100">
            {auth.currentUser.uid == item.senderid ? (
            <div className="text-lg font-semibold">{item.receivername}</div> ):( 
            <div className="text-lg font-semibold">{item.sendername}</div> )
            }
          
          </div>
        </div>
        ))}
       
        {/* end user list */}
      </div>
  )
}

export default FriendListMsg