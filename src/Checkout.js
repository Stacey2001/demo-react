import React, { useContext } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'

export default function Checkout() {
  
  let {cartItems} = useContext(CartContext)
  let cartEmpty = cartItems.length<=0? true:false
  let grandTotal = cartItems.reduce((total,product)=>{
    return total += product.price*product.quantity
  },0)
  const freeShippingPrice = 99

  return (
    <div>
      <Title mainTitle="你的購物車"/>
      {
        cartEmpty &&
        <div>
          購物車現在沒有商品<br/>
          <Link to='/'>去產品頁看看吧</Link>
        </div>
      }

      {
        !cartEmpty &&
        <div>
          {/*產品列表 */}
          <div id="cartSection">
          {
            cartItems.map((product)=>(
              <div key={product.id}>
                <img src={process.env.PUBLIC_URL+'/image/'+product.image} alt={""}></img>
                {product.name}
                {product.description}
                {product.price}
                購買數量{product.quantity}
                <QuantityBtn productInfo={product}/>
              </div>
            
            ))
          }
           
          </div>
          {/*價錢總數+免費送貨 */}
          <div id="checkOutSection">
            <div>全部貨品總共{grandTotal}元</div>
            {
              grandTotal>=freeShippingPrice?
              <div>我們免費送貨</div>:
              <div>滿${freeShippingPrice}免運費<br/>
              還差${freeShippingPrice-grandTotal}</div>
            }

          </div>
        </div>
      }
    </div>
  )
}
