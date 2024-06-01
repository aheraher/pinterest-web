"use client";
// after login user we change update next version
import Image from "next/image";
import React, { useEffect } from "react";
import {IoNotifications} from "react-icons/io5";
import {FaSearch} from "react-icons/fa";
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {useSession, signIn, signOut} from "next-auth/react";
import { collection, addDoc , setDoc, doc} from "firebase/firestore"; 
import { db } from "../firebaseConfig";
import { useRouter } from "next/navigation";



const Header = () => {
  // const db = getFirestore(app);
    const {data: session} = useSession();
    // console.log(session);
    const router = useRouter()


    useEffect(()=>{
      goData()
    },[session])

    const onclickCreate = ()=>{
      if (session) {
        router.push("/pin-builder")
      }
      else { 
        signIn()
      }
    }
  let goData = async ()=>{
    if (session?.user) {

    await  setDoc(doc(db,"user",session.user.email ),{
        name:session.user.name,
        email:session.user.email,
        image:session.user.image

        })
      
      
    }
    else {
      console.log("something wrong");
      
    }
    
  }



 

  return (

    <> 
    
      <div className=" flex items-center gap-4 p-6 ">
        <Image
          src="/logo.png" 
          alt="logo"
          width={50}
          height={50}
          className="  hover:bg-[#e6e2e2] p-2 rounded-full "
          onClick={()=>{router.push("/")}}
        />
        <button className=" bg-black text-white  px-4 py-2 rounded-[20px] font-semibold ">
          Home
        </button>
        <button className="    px-4 py-2 rounded-[20px] font-semibold " onClick={()=> { onclickCreate() }  }  >
          Create
        </button>

        <div className="  gap-3  md:gap-2  bg-[#efe7e7] hover:bg-[#cdcbcb]  p-3 items-center  rounded-full w-full hidden md:flex ">
          <FaSearch className=" text-[20px] text-gray-500 " />
          <input
            type="text"
            placeholder="Search"
            className=" bg-transparent outline-none font-mono  "
          />
        </div>
        <FaSearch className=" text-[20px] text-gray-500  md:hidden" />
        <IoNotifications className=" text-[35px] text-gray-500 " />
        <IoChatbubbleEllipsesSharp className=" text-[35px] text-gray-500 " />
        {session?.user? (
          <Image
            src={session?.user?.image  }
            alt="account"
            width={50}
            height={50}
            onClick={()=> router.push(`/${session.user?.email}`) }
            className="  hover:bg-[#e6e2e2] p-2 rounded-full "
          />
          
        ) : (
          <button
            onClick={() => signIn()}
            className="    px-4 py-2 rounded-[20px] font-semibold "
          >
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Header;

