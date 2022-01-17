import React from 'react';
import poster_home from '../images/poster_home.jpg';
import Product from './Product';
import './Home.css';
import productData from "../productData"
import { v4 as uuid } from 'uuid';




export default function Home(){

 
    const RowProductsDisplay=(row)=>{
        let RowProducts=[]
        let k=3*row;

       
        for(let i=0; i<3;i++)
        {
            RowProducts.push(<Product id= {uuid()} title={productData.data[k+i].title} image={productData.data[k+i].image } price={productData.data[k+i].price} rating={productData.data[k+i].rating}/>)
               
           

        }
        return RowProducts


    }
    return <div className="home">
        <img src={poster_home} className="poster_home"/>
        <div className="row-1">
            
            {RowProductsDisplay(0)}
            
                    </div>
        <div className="row-2">
            {RowProductsDisplay(1)}
        </div>
       
    </div>;
}