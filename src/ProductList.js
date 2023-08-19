import React from 'react'
import styles from './ProductList.module.css'
import {Link} from 'react-router-dom'
import Title from './Title'
import {useState, useEffect} from 'react'
import QuantityBtn from './QuantityBtn'

export default function ProductList() {

  let [productList,setProductList]=useState([])
  let [input,setInput]=useState('')


  //useEffect
  useEffect(()=>{
    //1.無第二個參數時:component每次render都會觸發(第一次跑網頁時跟State有改變時都會re-render)
    //2.第二個參數(Dependency Array)是空array時:代表只有在網頁第一次render會觸發
    //3.第二個參數(Dependency Array)有變數時:第一次網頁render時 + 指定的變數改變時會觸發
    fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
    .then(response => response.json())
    .then(data => setProductList(data))
  },[])//第二個參數是Dependency Array

  useEffect(()=>{
    if(input.length>4)
      console.log("長度太長")
    else 
      console.log("長度太短")
  },[input])
  
  return (  
    <>
      <Title mainTitle="請選擇要購買的水果"/>
      <input type="text" onChange={e=>setInput(e.target.value)}></input>
      <div>
      {
        productList.map(product=>(
          <div className={styles.productborder} key={product.id}>
              {product.name}<br/>
              {product.price}<br/>
              <Link to={'/product/'+product.id}>
                <img src={process.env.PUBLIC_URL+'/image/'+product.image} alt={""}/><br/> 
              </Link>
              {product.description}<br/>
              <QuantityBtn productInfo={product}/>{/*productInfo={product} 知道是按哪一個產品的按鈕*/}
          </div> 
        ))
      }
      </div>
    </>
  )
}
