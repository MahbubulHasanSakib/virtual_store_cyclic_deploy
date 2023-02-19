import React from 'react'
import CheckoutFlows from '../components/CheckoutFlows'
import {Form,Button} from 'react-bootstrap'
import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {PaymentMethod} from '../actions/cart'
const PaymentScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userInfo}=useSelector(state=>state.userReducer)
    const [paymentMethod,setPaymentMethod]=useState('PayPal')
    useEffect(()=>
    {
        if(!userInfo)
        navigate('/login')
    },[userInfo])
    const handleChange=(e)=>
    {
        console.log(e.target.value)
        setPaymentMethod(e.target.value)
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(paymentMethod)
        dispatch(PaymentMethod(paymentMethod))
        navigate('/placeOrder')
    }
    return (
        <div>
            <CheckoutFlows flow1 flow2 flow3  />
            <h2>Payment Method</h2>
            <h5>Select Payment Method</h5>
            <Form onSubmit={(e)=>handleSubmit(e)}>
      <Form.Group controlId="kindOfStand">
        <Form.Check
          value="PayPal"
          type="radio"
          aria-label="radio 1"
          checked={paymentMethod==='PayPal'?true:false}
          label="PayPal or Credit Card"
          onChange={(e)=>handleChange(e)}
        />
        <Form.Check
          value="Stripe"
          type="radio"
          aria-label="radio 2"
          label="Stripe"
          checked={paymentMethod==='Stripe'?true:false}
          onChange={(e)=>handleChange(e)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Continue
      </Button>
    </Form>
        </div>
    )
}

export default PaymentScreen
