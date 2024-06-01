"use client"
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import UserProfileInfo from "../componets/UserProfileInfo";
import PinList from "@/app/componets/Pins/PinList"

const page = (params) => {
  const [userInfo, setUserInfo] = useState()
  let id = params.params.userId.replace("%40", "@");

  console.log("your email is " + id);
  useEffect(() => {
    if (id) {
      getUserInfo()
    }
  }, [id])

  const getUserInfo = async () => {

    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      setUserInfo(docSnap.data())

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return <>
  {userInfo?  <UserProfileInfo UserInfo={userInfo}   /> :null }
  


  </>;
};

export default page;
