"use client"
import React, { useState } from 'react'

export default function AddImg() {
    const [file, setFile] = useState('');

    function handleChange(e:any) {
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
    <div className='position-absolute w-100 h-100 top-0 bottom-0'>
        <input type="file" onChange={handleChange} style={{width:'100%', height:'100%', opacity:'0'}}/>
    </div>
    
    <form action="/upload-target" className="dropzone profile-logo dz-clickable primary-dropzone">
        {file && 
            <div className='dz-image'>
            <img src={file} className='object-fit-cover' alt='' style={{width:'120px', height:'120px', borderRadius:'15px'}}/>
            </div>
        }
        {!file && 
            <div className="dz-default dz-message">
                <i className="fa-solid fa-images"></i>
            </div>
        }
    </form>
    </>
  )
}
