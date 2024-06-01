"use client"

import Image from 'next/image';
import React from 'react';
import {useSession, signIn, signOut} from "next-auth/react";
import { useRouter } from 'next/navigation';
import PinList from './Pins/PinList';


const UserProfileInfo = ({ UserInfo }) => {
  if (!UserInfo) {
    // Optionally render nothing or a placeholder
    return <div className=' flex text-center justify-center items-center font-medium text-3xl  text-slate-600 mt-7 '  >Loading...</div>;
  }
  
  const router = useRouter()
  const {data:session} = useSession()
  const onclickLockOut =  ()=>{

    signOut()
    router.push("/")

  }

  console.log(UserInfo);
  
  return (
    <div>
    <div  className=' flex items-center justify-center  flex-col gap-6 ' > 
    <Image className='  bg-slate-400 hover:bg-slate-500  cursor-pointer  rounded-full mt-5 '   src={UserInfo.image} alt='User_img' width={120} height={100} />
      <h1 className=' font-semibol text-2xl  uppercase '  >{UserInfo.name}</h1>
      <h3 className='   text-zinc-400 lowercase  ' > {UserInfo.email} </h3>

      <div>
        <button className='mx-2  rounded-sm px-6 py-3 bg-slate-400  hover:bg-slate-500  font-semibold  ' >Share</button>
{
  session?.user.email == UserInfo.email ? <button className='mx-2 rounded-sm px-6 py-3 bg-slate-400  hover:bg-slate-500  font-semibold ' onClick={()=>{ onclickLockOut()} } >Sign Out</button> : null
}

  
      </div>

    </div>
    </div>
  );
};

export default UserProfileInfo;

