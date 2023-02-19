import React from 'react'
import {useState,useEffect} from 'react'
import { Navbar, Nav, Container ,Dropdown,Form,Button,FormControl,FormGroup} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import {logout} from '../actions/user'
import {searchProduct} from '../actions/products'

const Header = () => {
  const [searchText,setSearchText]=useState('')
const dispatch=useDispatch()
const navigate=useNavigate()
  const {userInfo}=useSelector(state=>state.userReducer)
  const {userDetails}=useSelector(state=>state.userProfileReducer)
   const [totalItems,setTotalItems]=useState(0)
   const {cartItems}=useSelector((state)=>state.cartReducer)
  console.log("from top")
   let total=cartItems.reduce((acc,item)=>acc+item.qty,0)
   useEffect(()=>
   {   
          setTotalItems(total)
   },[cartItems])

   useEffect(()=>
   {   
    dispatch(searchProduct(searchText))
   },[searchText])

   const handleLogout=()=>{
     dispatch(logout())
     setTotalItems(0)
   }
   const handleClick=()=>
   {
     navigate('/profile')
   }
   const handleClickUsers=()=>
   {
    navigate('/users')
   }

   const handleProducts=()=>
   {
    navigate('/listProducts')
   }
   const handleOrders=()=>
   {
     navigate('/listOrders')
   }
   

   const handleSearch=()=>{
    /* e.preventDefault();
     if(searchText==='')
     navigate('/')
     else navigate(`/search/${searchText}`)*/
    dispatch(searchProduct(searchText))
   }
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" className='fixed-top' >
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand >Mh Shop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto">
              <Form className="d-flex">
                <FormGroup>
        <FormControl 
          type="search"
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}
          onKeyUp={handleSearch}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        </FormGroup>

      </Form>
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> CART<sup className='cart_total'><span>{totalItems}</span></sup></Nav.Link>
                </LinkContainer>
                {userInfo?<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {userDetails.name||userInfo.name}
  </Dropdown.Toggle>

  <Dropdown.Menu>
  <Dropdown.Item onClick={handleClick}>Profile</Dropdown.Item>
    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    {
      userInfo.isAdmin?<>
      <Dropdown.Item onClick={handleClickUsers}>users</Dropdown.Item>
    <Dropdown.Item onClick={handleProducts}>products</Dropdown.Item>
        <Dropdown.Item onClick={handleOrders}>orders</Dropdown.Item>
        </>
        :null
    }
  </Dropdown.Menu>
</Dropdown>:
                <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user"></i> SIGN IN</Nav.Link>
                </LinkContainer>
                 }
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
