import React from 'react'
import CheckoutFlows from '../components/CheckoutFlows'
import { useSelector ,useDispatch} from 'react-redux'
import { Row, Col, ListGroup,Button } from 'react-bootstrap'
import {placeOrder} from '../actions/cart'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const PlaceOrderScreen = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const { shipping_details } = useSelector(state => state.shippingReducer)
    const { userInfo } = useSelector(state => state.userReducer)
    const { paymentMethod } = useSelector(state => state.paymentMethodReducer)
    const { cartItems } = useSelector(state => state.cartReducer)
    const {placeOrderDetails,success,loading}=useSelector(state=>state.placeOrderReducer)

    const roundDecimal=(num)=>
    {
        return Number(Math.round(num*100)/100).toFixed(2)
    }
 
    const itemsPrice = roundDecimal(cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0))
    let shippingPrice, tax, totalPrice;
    if (itemsPrice > 150) shippingPrice = 0.0;
    else shippingPrice = 60.00

    tax =roundDecimal(Number(itemsPrice * 0.10))
    totalPrice =(Number(itemsPrice) + Number(shippingPrice) + Number(tax)).toFixed(2)
    
    const handlePlaceOrder=()=>
    {
        const orderData={
            user:userInfo._id,
            username:userInfo.name,
            orderItems:cartItems,
            paymentMethod:paymentMethod,
            shippingAddress:shipping_details,
            tax:tax,
            shipping_price:shippingPrice,
            total_price:totalPrice,
            isPaid:false,
            isDelivered:false,
            
        }
        dispatch(placeOrder(orderData))
     
    }

    useEffect(()=>{
       if(success)
       {
          navigate(`/order/${placeOrderDetails._id}`)
       }
    },[success,placeOrderDetails._id,placeOrderDetails])
    
    return (
        <>
            <CheckoutFlows flow1 flow2 flow3 flow4 />
            <div className='place_order'>
                <div className='place_order_left'>
                    <h3>Shipping</h3>
                    <p>{`Address:${shipping_details.address},${shipping_details.city},${shipping_details.country}`}</p>
                    <h3>Payment Method</h3>
                    <p>{paymentMethod}</p>
                    <h3>Order Items</h3>
                    {
                        (cartItems.map((item, index) => {
                            return (
                                <div key={index}>
                                <Row  className="ordered_item" >
                                    <Col>
                                        <img src={item.image} className='cart_image' />
                                    </Col><Col>
                                            <p>{item.name}</p>
                                        </Col><Col>
                                            <p>{item.qty} x {`$${item.price}`} = {`$${(item.qty * item.price).toFixed(2)}`}</p>
                                        </Col>

                                  
                                </Row>
                                </div>

                            )
                        }))
                    }
                </div>
                <div className='place_order_right'>

                    <ListGroup>
                        <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
                        <ListGroup.Item>{`Items: $${itemsPrice}`}
                        </ListGroup.Item>
                        <ListGroup.Item>{`Shipping:$${shippingPrice}`}</ListGroup.Item>
                        <ListGroup.Item>{`Tax:$${tax}`}</ListGroup.Item>
                        <ListGroup.Item>{`Total:$${totalPrice}`}</ListGroup.Item>
                        <ListGroup.Item>
                        <Button className='add_to_cart_btn' onClick={handlePlaceOrder} variant="dark" size="lg">
                            Place Order
                        </Button></ListGroup.Item>

                    </ListGroup>
                </div>
            </div>

        </>
    )
}

export default PlaceOrderScreen
