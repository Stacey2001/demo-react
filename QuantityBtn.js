import React from 'react'
import { useContext, useState } from 'react'
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {

    //findIndex()
    //如果是購物車內找到該件產品=>返回索引位置 0,1,2,3...
    //該物件產品沒有被加入過去購物車=>返回-1
    const {cartItems, setCartItems} = useContext(CartContext) //使用共享的cartItems
    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })
    
    //如果購物車沒有該產品->代表數量=0
    //否則數量等於購物車裡該產品的原有數量
    let [numInCart,setNumInCart]=useState(
        (productIndexInCart===-1)? 0:cartItems[productIndexInCart].quantity
    )

    const handleSub=()=>{
        //購物車中只剩一件的話就remove object
        if(cartItems[productIndexInCart].quantity===1){
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1) //從該位置的index刪除一個元素
            setCartItems(newCartArray)
        }
        //只減個quantity
        else{
            let newCartArray=[...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart-1)
    }
    const handleAdd=()=>{
        //購物車本身沒有，在cartItems array中加個新element(object)
        if(productIndexInCart===-1)
        {
            setCartItems(
                [{
                    "id" : productInfo.id,
                    "name" : productInfo.name,
                    "price" : productInfo.price,
                    "image" : productInfo.image,
                    "quantity" : 1,
                    "description":productInfo.description
                },
                ...cartItems] //spread syntax->在cartItems多加object成為新的array

            )
        }
        //購物車有該產品，只加個quantity
        else{
            //購物車有該產品，只加個quantity
            let newCartArray=[...cartItems]
            newCartArray[productIndexInCart].quantity++
            setCartItems(newCartArray)
            //cartItems[productIndexInCart].quantity++  (因為react有規矩不能這樣寫會錯->有使用到setcardItems功能，我們就一定要用它)
        }
        setNumInCart(numInCart+1)
    }

    return (
    <div className="addToCart">{/*確定購物車數量後如何顯示 */}
        {
            (numInCart===0)?
            <span className="addToCartBtn" onClick={handleAdd}>加入購物車</span>:
            <div>
                <span className="subtractBtn" onClick={handleSub}>-</span>
                {numInCart}件
                <span className="addBtn" onClick={handleAdd}>+</span>
                
            </div>
        }
    </div>
    )
}
