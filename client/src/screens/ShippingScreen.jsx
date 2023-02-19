import React from 'react'
import {useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {shipping} from '../actions/shipping'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import CheckoutFlows from '../components/CheckoutFlows'
const ShippingScreen = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {shipping_details}=useSelector(state=>state.shippingReducer)
    const [address,setAddress]=useState(shipping_details.address)
    const [city,setCity]=useState(shipping_details.city)
    const [postalCode,setPostalCode]=useState(shipping_details.postalCode)
    const [country,setCountry]=useState(shipping_details.country)
    const {userInfo}=useSelector(state=>state.userReducer)
    useEffect(()=>
    {
       if(!userInfo)
       navigate('/login')
       else navigate('/shipping')
    },[userInfo])
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log(`${address} ${city} ${postalCode} ${country}`)
        dispatch(shipping(address,city,postalCode,country))
        navigate('/payment')

    }
    return (
        <div>
             <CheckoutFlows flow1 flow2/>
          <h1>Shipping</h1>
          <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control name='address' value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Enter address" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control name='city' value={city} onChange={(e)=>setCity(e.target.value)} type="text" placeholder="Enter city" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control name='postalCode' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} name="postalCode" type="text" placeholder="Enter postal code" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control name='country' value={country} onChange={(e)=>setCountry(e.target.value)} name="country" type="text" placeholder="Enter country" />
        </Form.Group>
        <Button onSubmit={(e)=>handleSubmit(e)} variant="primary" type="submit">
          Continue
        </Button>
      </Form>
        </div>
    )
}

export default ShippingScreen
