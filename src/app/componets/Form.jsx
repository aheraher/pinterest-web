"use client"

import { useSession } from "next-auth/react"

import UserTag from "./UserTag"
import { useState } from "react";
import UserImageUpload from "./UserImageUpload"
import { getStorage ,ref, uploadBytes , uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { db } from "../firebaseConfig";
import { collection, addDoc , setDoc, doc} from "firebase/firestore"; 
import { useRouter } from "next/navigation";
import Image from "next/image";
// import load from ".././../../public/loading-indicator.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Form() {
const router =useRouter()

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [link, setLink] = useState(null)
    const [file, setFile] = useState(null)
    const postId= Date.now().toString()
    const [loading,setLoading]=useState(false)

  const {data:session}=useSession()
//   const notify = () => toast("Wow Done!");

 
//   console.log(session);

    const Onsave = async ()=>{
        // console.log(title,desc,link );
        // console.log(file);
        setLoading(true)
        await  uploadFile()

        
    }
    const storage =getStorage()
    

    const uploadFile = async ()=>{
        const storageref = ref(storage, "pinterest/"+file.name)
        uploadBytes(storageref, file).then((snapshot) => {
            console.log('Uploaded  file!');
          }).then(res=>{
            getDownloadURL(storageref).then( async(url)=>{ console.log("Download URL",url);  

            const postData = { 
                title:title,
                desc:desc,
                link:link,
                image:url,
                userName:session.user.name,
                email:session.user.email,
                userImage:session.user.image,
                id:postId

            }

            await  setDoc(doc(db,"pinterest-post",postId ),postData).then(res=>{
                
                console.log("Saved..");
                // alert("upload done..")
              
                setLoading(true)
               router.push("/") 

            })

             } );

          })
          
        
    }


    


    return (

        <>
            <div className=" flex  bg-slate-300  md:flex-row flex-col  " >

            
<UserImageUpload setFile={setFile} />
{/* <UserImageUpload setFile={(file)=>setFile(file)} /> */}
                <div className=" mx-6 mt-8 flex  items-center justify-start gap-5 flex-col text-center " >

                    <input className=" bg-transparent outline-none  font-bold  text-3xl  border-b-2  border-black " type="text" placeholder="Add Title"  value={title}  required onChange={(e)=>setTitle(e.target.value) } />

                    <UserTag user={ session?.user } />
                    
                    
                    <input className=" bg-transparent outline-none  font-bold  text-3xl  border-b-2  border-black " type="text" placeholder="add desc"  value={desc} required onChange={(e)=>setDesc(e.target.value) }  />

                    <input className=" bg-transparent outline-none  font-bold  text-3xl  border-b-2  border-black " type="text" placeholder="Add link" value={link} required onChange={(e)=>setLink(e.target.value) } />

                    <button className="px-6  py-3 bg-zinc-500 hover:bg-zinc-600 text-white font-semibold  rounded-sm   uppercase  " onClick={()=> Onsave() }  >
                  {
                    loading?  <Image className=" animate-spin   text-center mx-6 my-2 "  src="/loading-indicator.png" width={20} height={20}   />:
                    <span> submit</span>
                  }
                       
                         </button>
                      

                </div>


            </div>
        </>

    )

}

export default Form















