import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getOrderDetails} from '../actions/cart'
import {Spinner,Alert,ListGroup,Row,Col} from 'react-bootstrap'
import CheckOut from '../components/CheckOut'
import {Button} from 'react-bootstrap'
import {deliverForOrder} from '../actions/orderDeliver'

const OrderDetails = () => {
    const dispatch=useDispatch()
    const {userInfo}=useSelector(state=>state.userReducer)
    const {loading:loadingPay,success:successPay}=useSelector(state=>state.orderPayReducer)
    const {loading:loadingDeliver,success:successDeliver}=useSelector(state=>state.orderDeliverReducer)
    const {orderDetails,error,loading,success}=useSelector(state=>state.orderDetailsReducer)
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>
    {
       if(!userInfo)
       navigate('/login')
       else if(id || !orderDetails || successPay||successDeliver){
         dispatch(getOrderDetails(id))
       }
    },[dispatch,id,successPay,userInfo,successDeliver])
  
    console.log(orderDetails)

    const handleDeliver=()=>{
        dispatch(deliverForOrder(id))
    }
    return (
        <>
       {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert severity="warning">{error}</Alert>
      ) : (
        userInfo && (
        <div className='place_order'>
        <div className='place_order_left'>
            {userInfo?
                <>
            <h2>Order {orderDetails._id}</h2>
            <h3>Shipping</h3>
            <p>{`Name: ${userInfo.name}`}</p>
            <p>{`Email: ${userInfo.email}`}</p>
            <p>{`Address:${orderDetails.shippingAddress.address},${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}</p>
            {orderDetails.isDelivered?<Alert  variant='success'>{`Delivered at ${orderDetails.deliveredAt.substring(0,10)}`}</Alert>:
            <Alert  variant='warning'>Not Delivered</Alert>}
            <h3>Payment Method</h3>
            <p>{orderDetails.paymentMethod}</p>
            {orderDetails.isPaid?<Alert  variant='success'>{`Paid At ${orderDetails.paidAt.substring(0,10)}`}</Alert>:
            <Alert  variant='warning'>Not paid</Alert>}
            </>:null
           }
            <h3>Order Items</h3>
            {
                (orderDetails.orderItems.map((item, index) => {
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
                <ListGroup.Item>
                    {`Items: $${(orderDetails.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0)).toFixed(2)}`}
                </ListGroup.Item>
                <ListGroup.Item>{`Shipping:$${orderDetails.shipping_price}`}</ListGroup.Item>
                <ListGroup.Item>{`Tax:$${orderDetails.tax}`}</ListGroup.Item>
                <ListGroup.Item>{`Total:$${orderDetails.total_price.toFixed(2)}`}</ListGroup.Item>
                {(!orderDetails.isPaid && orderDetails.user===userInfo._id) &&
                <ListGroup.Item><CheckOut amount={Number(orderDetails.total_price)}/></ListGroup.Item>
                }
                {(userInfo && !orderDetails.isDelivered && userInfo.isAdmin) &&
                <ListGroup.Item><Button onClick={handleDeliver} className='add_to_cart_btn'  variant="dark" size="lg">
                Mark As Delivered
            </Button></ListGroup.Item>
                }
            </ListGroup>
        </div>
        
    </div>
        ))
                }
        </>
    )
}

export default OrderDetails
