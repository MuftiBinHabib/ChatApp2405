import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';

const FriendRequestlist = () => {
  const [reqlist, setrequestlist] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const requestlistRef = ref(db, "friendrequestlist/");
    onValue(requestlistRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().senderid ||
          auth.currentUser.uid === item.val().receiverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setrequestlist(array);
    });
  }, [auth.currentUser.uid, db]);

  console.log(reqlist);

  const handlefriendaccept = (item) => {
    set(push(ref(db, "friendlist/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequestlist/" + item.id));
    });
    console.log(item);
  };

  return (
    <div className="container">
      <section className="mt-4 font-display border rounded w-50">
        <h2 className="w-50 bg-green-400 text-white rounded">Friend Request List</h2>

        <ul className="space-y-2 mt-4 ms-4">
          {reqlist.map((item) => {
            return (
              <li key={item.id || item.senderid + item.receiverid}>
                {auth.currentUser.uid === item.senderid ? (
                  <p className="w-fit inline-block">{item.receivername} <span className='text-white bg-yellow-500 rounded px-2 py-1'>... Pending</span></p>
                ) : auth.currentUser.uid === item.receiverid ? (
                  <>
                    <p className="w-fit inline-block">{item.sendername}</p>
                    <button
                      onClick={() => {
                        handlefriendaccept(item);
                      }}
                      className="ms-2 px-2 bg-blue-400 text-white rounded"
                    >
                      Accept
                    </button>
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default FriendRequestlist;
