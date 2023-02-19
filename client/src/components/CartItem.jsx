import React, { useEffect } from 'react'
import { useState } from 'react'
import {Row,Col,Dropdown} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {removeFromCart} from '../actions/cart'
import {addToCart} from '../actions/cart'
import axios from 'axios'
const CartItem = ({cartItem}) => {
    const dispatch=useDispatch()

   const {products}=useSelector((state)=>state.productReducer)
   console.log(products)
    const [findCartItem,setFindCartItem]=useState({})
    useEffect(()=>
    {
        const fetchProducts=async()=>
        {
            const response=await axios.get('/api/products/')
            setFindCartItem(response.data.find((itm)=>itm._id===cartItem.product))
        }
         fetchProducts()
        
    },[])
    const handleRemoveItem=(cartItem)=>
    {
        console.log("removed")
        dispatch(removeFromCart(cartItem))
    }
    const handleSelect=(e)=>
    {
       
        dispatch(addToCart(cartItem.product,Number(e)))
    }
    const numArr=[];
    if(findCartItem)
    for(let i=1;i<=findCartItem.countInStock;i++) numArr.push(i)
    console.log(numArr)
    return (
           <div className="cart_Item">
                <div className="cart_Item_Left">
            <img  src={cartItem.image} className='cart_image' />
       <div className="cartItemDetails">
                <p>{cartItem.name}</p>
            
            <p>{`$${cartItem.price}`}</p>
            <p><span onClick={()=>handleRemoveItem(cartItem)}>Remove<i  style={{cursor:"pointer"}} className="fas fa-trash"></i></span></p>
            </div>
           </div>
           <div className="cart_Item_Right">
            <Dropdown onSelect={(e)=>handleSelect(e)}>
                                        <Dropdown.Toggle style={{width:'100%'}} id="dropdown-button-dark-example1" variant="secondary">
                                        {cartItem.qty}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu  style={{width:'100%'}} variant="light">
                                        {
                                            numArr.map((num)=>
                                            {
                                                return <Dropdown.Item eventKey={num} key={num}>{num}</Dropdown.Item>
                                            })
                                        }
                                        </Dropdown.Menu>
                                    </Dropdown>


           
            <p>{`$${(cartItem.qty*cartItem.price).toFixed(2)}`}</p>

          
           </div>
            
            </div>
       
    )
}

export default CartItem
