import React from 'react'
import {Form,Button,Alert,Spinner,Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getUserDetails,updateUserDetails} from '../actions/user'
import {showMyOrders} from  '../actions/showMyOrders'
import {Link} from 'react-router-dom'
const UserProfileScreen = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {userInfo}=useSelector(state=>state.userReducer)
    const {userDetails,error,loading}=useSelector(state=>state.userProfileReducer)
    const {myOrders,error:showMyOrdersError,loading:showMyOrdersLoading}=useSelector(state=>state.showMyOrdersReducer)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  const [confirmPass,setConfirmPass]=useState('')
  const [Errormessage,setErrorMessage]=useState('')
  const [Message,setMessage]=useState(null)
  console.log(myOrders)
    useEffect(()=>
    {
         if(!userInfo)
          navigate('/login')
         else{
           if(!userDetails.name)
           {
      
            dispatch(getUserDetails())
            setMessage(null)
           }
          else
          {
            setName(userDetails.name)
            setEmail(userDetails.email)
          }
          dispatch(showMyOrders())
         }

    },[userInfo,dispatch,userDetails])
    
    const handleSubmit=(e)=>
    {
      e.preventDefault();
      if(password)
      {
        if(password!==confirmPass)
        setErrorMessage('Passwords does not matched')
        else {
          dispatch(updateUserDetails(name,email,password))
          setErrorMessage('')
          setMessage('Profile Information is updated')
        }
      }
      else
      {
        dispatch(updateUserDetails(name,email))
        setErrorMessage('')
        setMessage('Profile Information is updated')
      }
     
    }
    return (
        <div  className="userProfile">
          <div className='userProfile_left'>
          <h1>Your Profile</h1>
          {Message && <Alert variant="success">{Message}</Alert>}
          {Errormessage && <Alert  variant='warning'>{Errormessage}</Alert>}
            {loading?'Loading...':error?<Alert  variant='warning'>{error}</Alert>:
            <>
           <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e)=>setName(e.target.value)} value={name} name='name'  type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} name='email' type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e)=>setPassword(e.target.value)} name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control onChange={(e)=>setConfirmPass(e.target.value)}  name="confirmPassword" type="password" placeholder="Password" />
        </Form.Group>
        <Button  variant="primary" type="submit">
          Update
        </Button>
      </Form>
      </>
}
</div>
<div className='userProfile_right'>
  <h1>Orders</h1>
  {
    showMyOrdersLoading?<Spinner style={{ width: "60px", height: "60px" }} className='mx-auto' animation="border" variant="dark" />:
    showMyOrdersError?<Alert  variant='warning'>{showMyOrdersError}</Alert>:
    <>
    {(myOrders && myOrders.length>0)?
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Total Amount</th>
      <th>Paid</th>
      <th>Delivered</th>
    </tr>
  </thead>
  <tbody>
  {myOrders.map((item,index)=>{
    return <tr key={index}>
    <td><Link to={`/order/${item._id}`}>{item._id}</Link></td>
    <td>{item.createdAt.substring(0,10)}</td>
    <td>{`$${item.total_price}`}</td>
    <td>{item.isPaid?`${item.paidAt.substring(0,10)}`:<i style={{color:'red'}} className="fas fa-times"></i>}</td>
    <td>{item.isDelivered?`${item.deliveredAt.substring(0,10)}`:<i style={{color:'red'}} className="fas fa-times"></i>}</td>
  </tr>
  })
}

  </tbody>
</Table>:<h1>Order is empty</h1>
}
    </>
  }
</div>
        </div>
    )
}

export default UserProfileScreen
