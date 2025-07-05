import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { blogData } from '../data/data'

interface BlogData{
    id: number;
    image: string;
    date: string;
    title: string;
    desc: string;
}

export default function BlogOne() {
  return (
    <div className="row justify-content-center g-4">
        {blogData.slice(0,3).map((item:BlogData,index:number)=>{
            return(
                <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                    <div className="blog-wrap-grid h-100 shadow">
                        <div className="blog-thumb">
                            <Link href={`/blog-detail/${item.id}`}><Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" /></Link>
                        </div>
                        <div className="blog-info">
                            <span className="post-date label bg-primary text-light"><i className="ti-calendar"></i>{item.date}</span>
                        </div>
                        <div className="blog-body">
                            <h4 className="bl-title"><Link href={`/blog-detail/${item.id}`}>{item.title}</Link></h4>
                            <p>{item.desc} </p>
                            <Link href={`/blog-detail/${item.id}`} className="text-primary fw-medium">Continue<i className="fa-solid fa-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            )
        })}      
    </div>
)}
