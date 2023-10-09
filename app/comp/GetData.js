'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GetData() {
    const [data,setData] = useState(null);

    useEffect(()=>{
        axios.get('/api')
        .then(res=>{
            setData(res.data)
        });
    },[])
    
    if(!data) return<>loading...</>;

    return (
     <div className="test">
        {data.a}
     </div>
    )
}

export default GetData