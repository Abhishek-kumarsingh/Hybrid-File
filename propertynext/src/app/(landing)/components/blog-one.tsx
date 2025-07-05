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
                            <Link href={`/blog-detail/${item.id}`}>
                                {item.image ? (
                                    <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" />
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center text-white"
                                        style={{
                                            background: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            height: '200px',
                                            borderRadius: '8px 8px 0 0'
                                        }}
                                    >
                                        <div className="text-center">
                                            <i className={`${item.icon || 'fa-solid fa-newspaper'} fs-1 mb-2`}></i>
                                            <div className="badge bg-white text-dark">{item.category}</div>
                                        </div>
                                    </div>
                                )}
                            </Link>
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
