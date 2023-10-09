"use client";
import axios from 'axios';
import React, { useState } from 'react'

function Uploading() {
    const [uploading,setUploading] = useState(false);
    const [selectedImage,setSelectedImage] = useState("");
    const [selectedFile,setSelectedFile] = useState();
    const [data,setData] = useState([]);


    function blobChange(){
        const url = URL.createObjectURL(selectedFile);
        console.log(url)
        const fr = new FileReader();
        fr.readAsDataURL(selectedFile);
        fr.addEventListener('load',()=>{
            console.log(fr.result)
            fileChange(fr.result);
        })
    }

    function fileChange(file){
        const contentType = 'image/png';
        const image_data = atob(file.split(',')[1]); 
        // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다

        const arraybuffer = new ArrayBuffer(image_data.length);
        const view = new Uint8Array(arraybuffer);

        for (let i = 0; i < image_data.length; i++) {
            view[i] = image_data.charCodeAt(i) & 0xff;
            // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
            // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
        }

        const blob =  new Blob([arraybuffer], { type: contentType });
        const blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl)
    }



    const handleUpload = async (e)=>{
        e.preventDefault();        
        setUploading(true);

        if(!selectedFile) return;
        blobChange();


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