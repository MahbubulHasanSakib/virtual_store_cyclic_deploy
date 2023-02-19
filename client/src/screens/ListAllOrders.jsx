import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getOrdersList} from '../actions/orderPay'
import {getUsersList} from '../actions/user'
import {Spinner,Alert,Table} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const ListAllOrders = () => {
    const {orders,loading,error}=useSelector((state)=>state.ordersListReducer)
    const {userInfo}=useSelector(state=>state.userReducer)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>
    {
           try {
            if(userInfo && userInfo.isAdmin)
            {
              dispatch(getOrdersList())
              dispatch(getUsersList())
            }
             else
             {
                 navigate('/login')
             }
           } catch (error) {
               console.log(error)
           }
         
    },[dispatch,userInfo])

    console.log(orders)

  
    return (
        <div>
            <h1 className='text-center'>All Orders</h1>
            {
                loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />
                :error?<Alert  variant='warning'>{error}</Alert>:
                <>
             {(orders && orders.length>0)?
             <>
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>User</th>
      <th>Date</th>
      <th>Total</th>
      <th>Paid</th>
      <th>Delivered</th>
    </tr>
  </thead>
  <tbody>
  {orders.map((order,index)=>{
    return <tr key={index}>
    <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
    <td>{order.username}</td>
    <td>{order.createdAt}</td>
    <td>{order.total_price}</td>
    <td>{order.isPaid?`${order.paidAt.substring(0,10)}`:<i style={{color:'red'}} className="fas fa-times"></i>}</td>
    <td>{order.isDelivered?`${order.deliveredAt.substring(0,10)}`:<i style={{color:'red'}} className="fas fa-times"></i>}</td>
  </tr>
  })
}

  </tbody>
</Table>
</>:<h1>Products list is empty</h1>
}
                </>
            }
        </div>
    )
}

export default ListAllOrders
