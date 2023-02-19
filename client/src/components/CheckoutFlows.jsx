import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav} from 'react-bootstrap'

const CheckoutFlows = ({flow1,flow2,flow3,flow4}) => {
    return (
        <div className='checkout_flow'>
             <Nav className="ms-auto">
                {flow1?<LinkContainer to='/login'>
                <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>:<Nav.Link disabled>Sign in</Nav.Link>}
                {flow2?<LinkContainer to='/shipping'>
                <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>:<Nav.Link disabled>shipping</Nav.Link>}
                {flow3?<LinkContainer to='/payment'>
                <Nav.Link>Payment</Nav.Link>
                </LinkContainer>:<Nav.Link disabled>Payment</Nav.Link>}
                {flow4?<LinkContainer to='/login'>
                <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>:<Nav.Link disabled>Place Order</Nav.Link>}
            </Nav>
        </div>
    )
}

export default CheckoutFlows
