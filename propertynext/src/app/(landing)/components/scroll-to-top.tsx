"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
    let[scroll,setScroll] = useState<boolean>(false)

    const scrollToTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(()=>{

        const handlerScroll=()=>{
            if(window.scrollY > 50){
                setScroll(true)
            }else{setScroll(false)}
        }
        window.addEventListener('scroll',handlerScroll)

        return () => {
            window.removeEventListener('scroll',handlerScroll)
          };
    },[])

  return (
    <Link id="back2Top" onClick={()=>scrollToTop()} className={`top-scroll ${scroll ? 'd-block' : ''}`} title="Back to top" href="#"><FiArrowUp className="ti-arrow-up"/></Link>
  )
}
