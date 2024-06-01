
"use client"
import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
// import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from "@/app/componets/Pins/PinList";
import { db } from './firebaseConfig';


export default function Home() {
  // const db=getFirestore(app);
  const [listOfPins,setListOfPins]=useState([]);
  
  useEffect(()=>{
    getAllPins();
  },[])
  const getAllPins=async()=>{
    setListOfPins([])
      const q=query(collection(db,
        'pinterest-post')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
       
      setListOfPins((listOfPins)=>
        [...listOfPins,doc.data()]);
    });
  }
  
  console.log(listOfPins);
  return (
    <>
    <div className='p-3'>
      <PinList listOfPins={listOfPins} />
      </div>
    </>
  )
}


// "use client"
// import React, { useEffect, useState } from 'react'
// import { collection, query, where, getDocs, doc } from "firebase/firestore";

// import { db } from '@/app/firebaseConfig';
// import {useSession, signIn, signOut} from "next-auth/react";
// import PinList from "@/app/componets/Pins/PinList"


// export default function Home() {
 
//   const [listofPins, setlistofPins] = useState([])
  
   

//     const {data: session} = useSession();
//     useEffect(() => {
//       if (session) {
//         DataGet();
//       }
//     }, [session]); // Include userInfo as a dependency
    
//     const DataGet = async () => {
//       if (!session) return; // Guard clause to ensure userInfo is not undefined
    
//       const q = query(collection(db, "pinterest-post"), where("email", "==", session?.user?.email));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.id, " => ", doc.data());
//         setlistofPins( listofPins=>[...listofPins,doc.data()] ) 
       
        
//       });


//     }
    

//     console.log(listofPins);
   
  
//       // Check if the listofPins is empty and if so, show loading placeholders
//       if (listofPins.length === 0) {
//         return (
//           <div className="grid grid-cols-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {Array.from({ length: 8 }).map((_, index) => ( // Assuming 8 loading placeholders
//               <div key={index} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden animate-pulse">
//                 <div className="w-full h-48 bg-gray-300"></div>
//                 <div className="p-5">
//                   <div className="h-6 bg-gray-300 rounded mb-2"></div>
//                   <div className="h-6 bg-gray-300 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       }
    
//       // Display the actual pins
//       return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
//           {listofPins.map((pin, index) => (
//             <div key={index} className="  max-w-sm bg-white rounded-lg border border-gray-200  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] overflow-hidden">
//               {pin.image && (
//                 <img className="w-full h-48 object-cover" src={pin.image} alt="Pin" />
//               )}
//               <div className="p-5">
//                 <h5 className="mb-2 text-2xl uppercase font-bold tracking-tight text-gray-900">{pin.title}</h5>
//                 <p className="mb-3 uppercase font-normal text-gray-700">{pin.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
    
    
   
    
  
// }



