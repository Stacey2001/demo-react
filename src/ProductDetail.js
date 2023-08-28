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
          {"id" : 2,"name" : "A.S.O黑色粗跟鞋", "price" : 3, "image" : "3.jpg","description":"顏色是高冷氣質黑，材質為舒適好穿的皮革材質，不只好看還可以久站!"},
          {"id" : 3,"name" : "effie白色平底鞋", "price" : 4, "image" : "5.jpg","description":"最舒適好穿的平底鞋，小花裝飾超可愛!出遊上班都可搭配~~"},
          {"id" : 4,"name" : "粉色長袖帽踢", "price" : 20,"image" : "4.jpg","description":"冬天必備!裡面為絨毛材質，讓你不只好看又保暖，出遊玩也不怕冷!"},
          {"id" : 5,"name" : "韓系針織上衣", "price" : 10,"image" : "2.jpg","description":"韓系氣質小姐姐風，編織材質簡約又不失特色，一秒變身氣質小姐姐!"},
          {"id" : 6,"name" : "可愛小束口包", "price" : 5,"image" : "6.jpg","description":"超可愛的束口包，輕巧好攜帶出遊玩最方便!一般常用到的小物都可以放得下!"}
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
