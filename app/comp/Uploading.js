"use client";
import axios from 'axios';
import React, { useState } from 'react'

function Uploading() {
    const [uploading,setUploading] = useState(false);
    const [selectedImage,setSelectedImage] = useState("");
    const [selectedFile,setSelectedFile] = useState();
    const [data,setData] = useState([]);

    const handleUpload = async (e)=>{
        e.preventDefault();        
        setUploading(true);

        if(!selectedFile) return;
        const formData = new FormData(e.target);
        //formData.append("myImage",selectedFile);
        const a = Object.fromEntries(formData)
        console.log(a)
        const dataUpload = await axios.post("/api",formData);
        setData([...data, dataUpload.data.file])
        setUploading(false)
    }

  return (
    <>
    <form onSubmit={handleUpload} method='post' encType='multipart/form-data'>
        <input type="text" name="title" />
        <input type="file" name="myImage"
            onChange={({target})=>{
                if(target.files){
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                }
            }}
        />
        {selectedImage ? (
            <img src={selectedImage} alt=""/>
        ) : (
            <span>Select Image</span>
        )}

        <button disabled={uploading}>
            {uploading ? "Uploading.." : "Upload"}
        </button>
    </form>

            {
                data.map((obj,k)=>(
                    <p key={k}><img src={`./images/${obj}`}  /></p>
                ))
            }
    </>
  )
}

export default Uploading