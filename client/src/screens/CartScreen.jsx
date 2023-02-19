import React from 'react'
import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Row,Col,Spinner,Button,ListGroup,Card} from 'react-bootstrap'
import {useNavigate,useParams,Link} from 'react-router-dom'
import CartItem from '../components/CartItem'
const CartScreen = () => {
   
    //const dispatch=useDispatch();
    const history = useNavigate();
    //const { id } = useParams();
    const {cartItems}=useSelector((state)=>state.cartReducer)
    console.log(cartItems)
    let total=cartItems.reduce((acc,item)=>acc+item.qty,0)
    let totalPrice=cartItems.reduce((acc,item)=>acc+(item.qty*item.price),0)

    const handleClick=()=>
    {
        history('/shipping')
    }
    return (
        < >
    {
        (cartItems.length>0)? <>
        <h4 className='text-left my-3'>{`Cart(${cartItems.length} items)`}</h4>
        <div className="cartPage">
       <div className="cartItems">
       {
           (  cartItems.map((item,index)=>{
          return(
           
          <CartItem key={index} cartItem={item}/>
         
         
          )
         }))
       }
       </div>
       <div className="subTotal">
       
          <Row className='text-center'>
        
         <Card className='checkout_box' style={{ width: '18rem' }}>
  <ListGroup variant="flush">
    <ListGroup.Item>{`Total Items:${total}`}</ListGroup.Item>
    <ListGroup.Item>{`Total Price:$${totalPrice.toFixed(2)}`}</ListGroup.Item>
    <ListGroup.Item>
    
        <Button onClick={handleClick} className='proceed_to_checkout' variant="dark">Proceed to Checkout</Button>
        </ListGroup.Item>
  </ListGroup>
  </Card>
 
  
    
         </Row>
    </div>
    </div>
    </>:<h1 className='text-center'>Cart is empty</h1>
                
    }   
        </>
        
    )
}

export default CartScreen
