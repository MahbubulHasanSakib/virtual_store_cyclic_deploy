import React from 'react'
import { Form, Button,Alert,Spinner } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {userRegistration} from '../actions/user'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const RegisterScreen = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPass,setConfirmPass]=useState('')
  const [Errormessage,setErrorMessage]=useState('')

  const {userInfo,message,loading}=useSelector((state)=>state.registerReducer)
  useEffect(()=>
    {
        if(userInfo)
        {
             navigate('/register')
        }
    },[navigate,userInfo])
    useEffect(()=>
    {
      setErrorMessage('')
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
    },[message])
  const handleSubmit=(e)=>
  {
    e.preventDefault()
    console.log("ds")
    if(name===''|| email==='' ||password==='' || confirmPass==='')
    setErrorMessage('All fields are required')
    else if(password.length<6)
    setErrorMessage('Password should be 6 characters long at least')
    else if(password!==confirmPass)
    setErrorMessage('Password does not match')
    else
    {
      dispatch(userRegistration(name,email,password))
      setErrorMessage('')
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPass('')
    }
  }

  return (
    <div>
      <h1>Registration Form</h1>
      {loading && <Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />}
     
      { Errormessage && <Alert  variant='warning'>{Errormessage}</Alert>}

      {  message && <Alert  variant='warning'>{message}</Alert>}
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} name="confirmPassword" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>Already have an account?<Link to='/login'><span>sign in</span></Link></p>
      </Form>
    </div>
  )
}

export default RegisterScreen
