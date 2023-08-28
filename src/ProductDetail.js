import React, { useEffect,useState } from 'react'
import {useParams,Link} from "react-router-dom"
import Title from './Title'
import QuantityBtn from './QuantityBtn'

export default function ProductDetail() {
    let params = useParams()
    let [productDetail,setproductDetail] = useState()

   

    useEffect(()=>{
        //1.無第二個參數時:component每次render都會觸發(第一次跑網頁時跟State有改變時都會re-render)
        //2.第二個參數(Dependency Array)是空array時:代表只有在網頁第一次render會觸發
        //3.第二個參數(Dependency Array)有變數時:第一次網頁render時 + 指定的變數改變時會觸發
        let data=[
          {"id" : 1,"name" : "ORIN氣質粗跟鞋", "price" : 299, "image" : "1.jpg","description":"最受歡迎的奶茶灰!搭配簡單又優雅的蝴蝶結裝飾，增添唯美氣質，材質為舒適好穿的皮革材質，不只好看還可以久站!"},
          {"id" : 2,"name" : "橙", "price" : 3, "image" : "3.jpg","description":"新鮮橙50克，又甜又好吃"},
          {"id" : 3,"name" : "芒果", "price" : 4, "image" : "5.jpg","description":"新鮮芒500克，宜做甜品"},
          {"id" : 4,"name" : "西瓜", "price" : 20,"image" : "4.jpg","description":"新鮮西瓜2公斤，夏季必備"},
          {"id" : 5,"name" : "藍梅", "price" : 10,"image" : "2.jpg","description":"新鮮藍梅50克，補眼之寶"},
          {"id" : 6,"name" : "白蘿蔔", "price" : 5,"image" : "6.jpg","description":"新鮮白蘿蔔1公斤，宜煲湯"}
        ]
        let productInfo=data.find((element)=>{
            return element.id===parseInt(params.id)
        })
        setproductDetail(productInfo)
        },[params.id])//第二個參數是Dependency Array

    return (
        <div>
            {
                //conditional rendering->productDetail要有值才會顯示(因為一開始productDetail設null，且fetch是需要較長時間的，所以確保拿掉資料再顯示，不然會error)
                productDetail &&
                <div className="ProductDetail">
                    <Title mainTitle={productDetail.name + '產品資料'}/>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td align="right">
                                <img src={process.env.PUBLIC_URL+'/image/'+productDetail.image} alt={productDetail.name} width="400"></img>
                                </td>
                            <td width="45%" padding="10">
                                <p>名稱 : {productDetail.name}</p>
                                <p>售價 : {productDetail.price}元</p>
                                <p>描述 : {productDetail.description}</p><br/>
                                <QuantityBtn productInfo={productDetail} />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
            
            <Link to='/'>
                <div className="backToGoodsListBtn">↩️ 返回商品列表</div>
            </Link>
        </div>
    )
}
