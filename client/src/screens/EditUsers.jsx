import React from 'react'
import { Form, Button ,Alert} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getUserToEdit } from '../actions/user'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {editAndUpdateUser,resetUserUpdate} from '../actions/user'

const EditUsers = () => {
    const dispatch = useDispatch()
    const { user, success, error } = useSelector(state => state.userDetailsReducer)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin,setIsAdmin]=useState(false)
    const { id } = useParams()
    useEffect(() => {
            dispatch(getUserToEdit(id))
    }, [dispatch, id])
    
    /*useEffect(() => {
        if(!user.name || user._id!==id)
        dispatch(getUserToEdit(id))
        else
        {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
         }, [user])*/

    useEffect(() => {
        if(user.name){
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        }
     }, [user])
     useEffect(() => {
        if (success || error) {
            const timeId = setTimeout(() => {
                dispatch(resetUserUpdate())
            }, 3000)

            return () => {
                clearTimeout(timeId)
            }
        }
    }, [user, success, error]);
     const handleSubmit=(e)=>{
         e.preventDefault();
         console.log(isAdmin)
         dispatch(editAndUpdateUser(id,name,email,isAdmin))
     }
    return (
        <div className='Edit_user_form'>
            <h1>Edit Users</h1>
            {success && <Alert  variant='success'>User Updated Successfully</Alert>}
           {error && <Alert  variant='warning'>{error}</Alert>}
                    <Form onSubmit={(e)=>handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e)=>setName(e.target.value)} value={name} name='name' type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicIsAdmin">
                            <Form.Check
                                inline
                                label="isAdmin"
                                name="group1"
                                type="checkbox"
                                value={isAdmin}
                                checked={isAdmin}
                                onChange={(e)=>{setIsAdmin(e.target.checked)}}
                                id="inline-checkbox-1"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
             
        </div>
    )
}

export default EditUsers
