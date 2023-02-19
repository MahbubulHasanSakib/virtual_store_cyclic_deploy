import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {payForOrder} from '../actions/orderPay'
const CheckOut = ({amount}) => {
    const dispatch=useDispatch()
    const {id}=useParams()
    console.log(id)
    const tokenHandler=(token)=>
    {
        
        dispatch(payForOrder(id,token,amount))
    }
    return (
        <div>
            <StripeCheckout
            amount={Number((amount)*100).toFixed(2)}
            shippingAddress
            billingAddress
            stripeKey='pk_test_51KI7u4AYcKCeJe3Fo802VMkPT4KoZfq0BytDFErZ7VuLG941kyFkFNouW4yOJgLRI9EqBGuKoiySofAJmuwGMRxr001CjebpiU'
            token={tokenHandler}
            currency='USD'
            >
                <Button className='success'>Pay Now</Button>
            </StripeCheckout>
        </div>
    )
}

export default CheckOut
