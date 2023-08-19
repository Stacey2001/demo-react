import React, { useEffect,useState } from 'react'
import {useParams,Link} from "react-router-dom"
import Title from './Title'
import QuantityBtn from './QuantityBtn'

export default function ProductDetail() {
    let params = useParams()
    let [productDetail,setproductDetail] = useState()

    //useEffect
    useEffect(()=>{
    //1.無第二個參數時:component每次render都會觸發(第一次跑網頁時跟State有改變時都會re-render)
    //2.第二個參數(Dependency Array)是空array時:代表只有在網頁第一次render會觸發
    //3.第二個參數(Dependency Array)有變數時:第一次網頁render時 + 指定的變數改變時會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
        .then(response => response.json())
        .then(data => {
            let productInfo=data.find((element)=>{
                return element.id===parseInt(params.id)
            })
            setproductDetail(productInfo)
        })
    },[])//第二個參數是Dependency Array

    return (
        <div>
            {
                //conditional rendering->productDetail要有值才會顯示(因為一開始productDetail設null，且fetch是需要較長時間的，所以確保拿掉資料再顯示，不然會error)
                productDetail &&
                <div>
                    <Title mainTitle={productDetail.name + '產品資料'}/>
                    <img src={process.env.PUBLIC_URL+'/image/'+productDetail.image} alt={productDetail.name} width="400">
                    </img>
                    <p>名稱：{productDetail.name}</p>
                    <p>售價：{productDetail.price}元</p>
                    <p>描述：{productDetail.description}</p>
                    <QuantityBtn productInfo={productDetail}/>
                </div>
            }
            
            <Link to='/'>回到產品列表</Link>
        </div>
    )
}
