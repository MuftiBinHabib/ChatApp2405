import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';


const FriendRequest = () => {
  const auth = getAuth()
  const [userList,setuserlist] = useState([])
  const [checkrequestid,setcheckrequestid] = useState([])
   const [checkfrndid,setcheckfrndid] = useState([])
  const db = getDatabase();

  useEffect(() =>{
    const starCountRef = ref(db, "userslist/");
onValue(starCountRef, (snapshot) => {
  const array = []
  snapshot.forEach((item) =>{
    if(item.key != auth.currentUser.uid){

      array.push({...item.val() , id : item.key})
    }

    setuserlist(array)
  })
  
});
  } , [])

   //check request
    useEffect(() =>{
        const requestlistRef = ref(db, "friendrequestlist/");
    onValue(requestlistRef, (snapshot) => {
      const array = []
      snapshot.forEach((item) =>{
        // if(item.key != auth.currentUser.uid){  condition if not match with uid
        // }
        
       
      
          array.push(item.val().senderid + item.val().receiverid)
          
      })
      setcheckrequestid(array)
      
    });
      } , [])

       useEffect(() =>{
        const requestlistRef = ref(db, "friendlist/");
    onValue(requestlistRef, (snapshot) => {
      const array = []
      snapshot.forEach((item) =>{
        // if(item.key != auth.currentUser.uid){  condition if not match with uid
        // }
        
       
      
          array.push(item.val().senderid + item.val().receiverid)
          
      })
      setcheckfrndid(array)
      
    });
      } , [])

//for adding frnd
  const handlefrndreq = (item) =>{
    
      set(push((ref(db, "friendrequestlist/"))), {
                      sendername : auth.currentUser.displayName,
                      senderid : auth.currentUser.uid,
                      receivername : item.name,
                      receiverid : item.id,
                    })
  }


  //for delete frnd
  const handleremove = (item) => {
  // alert("Remove button clicked");
  // console.log("Remove button clicked");
remove(ref(db, "friendrequestlist/"))
                    

}
  return (
    <div className="container">
        <section className='mt-4 font-display border  rounded w-60'>

            <h2 className='w-60 bg-green-400 text-white rounded'>Friend Request</h2>

            <ul className='space-y-2 mt-4 ms-4'>


              {userList.map((item) =>{
                return(
                  <>
                  <p className='w-fit inline-block'>{item.name} </p>
                   {checkfrndid.includes(auth.currentUser.uid + item.id) || checkfrndid.includes(item.id+ auth.currentUser.uid )
                  ?
                  
                <button onClick={handleremove}className='ms-2 px-2 border inline-block'>Remove</button> : 
                   
                   
                   checkrequestid.includes(auth.currentUser.uid + item.id) || checkrequestid.includes(item.id+ auth.currentUser.uid )
                  ?
                <button onClick={handleremove} className='ms-2 px-2 border'>Remove</button> : 
                   <button onClick={()=>handlefrndreq(item)} className='bg-green-400 text-white ms-4 px-2 py-0.5 rounded'>+</button>}

                  </>
                  
                  
             
            

                );
              })}
            </ul>

        </section>
    </div>
  )
}

export default FriendRequest