import React from 'react'
import {Link} from 'react-router-dom'
import Title from './Title'
import {useState, useEffect} from 'react'
import QuantityBtn from './QuantityBtn'

export default function ProductList() {

  let [productList,setProductList]=useState([])


  //useEffect
  useEffect(()=>{
    //1.無第二個參數時:component每次render都會觸發(第一次跑網頁時跟State有改變時都會re-render)
    //2.第二個參數(Dependency Array)是空array時:代表只有在網頁第一次render會觸發
    //3.第二個參數(Dependency Array)有變數時:第一次網頁render時 + 指定的變數改變時會觸發
    let data=[
      {"id" : 1,"name" : "ORIN氣質粗跟鞋", "price" : 299, "image" : "1.jpg","description":"最受歡迎的奶茶灰!搭配簡單又優雅的蝴蝶結裝飾，增添唯美氣質，材質為舒適好穿的皮革材質，不只好看還可以久站!"},
      {"id" : 2,"name" : "A.S.O黑色粗跟鞋", "price" : 499, "image" : "3.jpg","description":"新鮮橙50克，又甜又好吃"},
      {"id" : 3,"name" : "effie白色平底鞋", "price" : 399, "image" : "5.jpg","description":"新鮮芒500克，宜做甜品"},
      {"id" : 4,"name" : "粉色長袖帽踢", "price" : 299,"image" : "4.jpg","description":"新鮮西瓜2公斤，夏季必備"},
      {"id" : 5,"name" : "韓系針織上衣", "price" : 249,"image" : "2.jpg","description":"新鮮藍梅50克，補眼之寶"},
      {"id" : 6,"name" : "可愛小束口包", "price" : 129,"image" : "6.jpg","description":"新鮮白蘿蔔1公斤，宜煲湯"}
  ]
    setProductList(data)
  },[])//第二個參數是Dependency Array

  
  return (  
    //React Fragment的簡寫
    <>
      <Title mainTitle="請選擇要購買的商品"/>
      
      <div className="container">
      {
        productList.map(product=>(
          <React.Fragment key={product.id}>
            <div className="containerItem">
               <Link to={'/product/'+product.id}>
                  <img src={process.env.PUBLIC_URL+'/image/'+product.image} alt={product.name} />
               </Link>
              <div className="productName">
                {product.name}  -  {product.price}元/件
              </div>            
              <QuantityBtn productInfo={product} />
              </div>
          </React.Fragment>
        ))
      }
      </div>
    </>
  )
}
