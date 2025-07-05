import React from 'react'

import { propertyData } from '@/app/data/data';

import GridProperty from './grid-property';

interface Property{
    id: number;
    image: string[];
    tag: string[];
    tag2: string;
    type: string;
    name: string;
    loction: string;
    size: string;
    beds: string;
    sqft: string;
    value: string;
}

export default function GridPropertyOne({border}:{border:any}) {
  return (
    <div className="row justify-content-center g-4">
        {propertyData.slice(0,6).map((item:Property,index:number)=>{
            return(
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                    <GridProperty item={item} border={border}/>
                </div>
            )
        })}
    </div>
  )
}
