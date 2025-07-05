import React from 'react'
import Link from 'next/link'

import { blogCategories, tagCloud, trendingPost } from '../data/data'

export default function BlogSidebar() {
  return (
    <>
    <div className="single-widgets widget_search">
        <h4 className="title">Search</h4>
        <form className="sidebar-search-form">
            <input type="search" name="search" placeholder="Search.."/>
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>

    <div className="single-widgets widget_category">
        <h4 className="title">Categories</h4>
        <ul>
            {blogCategories.map((item:any, index:number)=>{
                return(
                    <li key={index}><Link href="#">{item.title} <span>{item.value}</span></Link></li>
                )
            })}
        </ul>
    </div>
    
    <div className="single-widgets widget_thumb_post">
        <h4 className="title mb-3">Trending Posts</h4>
        <ul>
            {trendingPost.map((item:any,index:number)=>{
                return(
                    <li key={index}>
                        <span className="left">
                            <img src={item.image} alt="" className=""/>
                        </span>
                        <span className="right">
                            <Link className="feed-title" href="#">{item.title}</Link> 
                            <span className="post-date"><i className="ti-calendar"></i>{item.time}</span>
                        </span>
                    </li>
                )
            })}
        </ul>
    </div>
    <div className="single-widgets widget_tags">
        <h4 className="title">Tags Cloud</h4>
        <ul>
            {tagCloud.map((item,index)=>{
                return(
                    <li key={index} style={{margin:'0 2px 4px 2px'}}><Link href="#">{item}</Link></li>
                )
            })}
        </ul>
    </div>
    </>
  )
}
