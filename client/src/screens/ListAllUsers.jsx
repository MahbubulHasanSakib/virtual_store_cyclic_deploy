import React from 'react'
import { useEffect } from 'react'
import {getUsersList} from '../actions/user'
import {useSelector,useDispatch} from 'react-redux'
import {Spinner,Alert,Table} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {deleteUser} from '../actions/user'

const ListAllUsers = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userInfo}=useSelector(state=>state.userReducer)
    const {users,loading,error}=useSelector(state=>state.usersListReducer)
    useEffect(()=>
    {
        if(userInfo && userInfo.isAdmin)
      {
        dispatch(getUsersList())
      }
       else
       {
           navigate('/login')
       }
    },[userInfo,dispatch,navigate])

    const handleDelete=(userId)=>{
        dispatch(deleteUser(userId))
    }
    const handleEdit=(userId)=>{
     navigate(`/editUsers/${userId}`)
    }
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Registered Users</h1>
            {
                loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />
                :error?<Alert  variant='warning'>{error}</Alert>:
                <>
             {(users && users.length>0)?
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Admin</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user,index)=>{
    return <tr key={index}>
    <td>{user._id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.isAdmin?<i style={{color:'blue'}} className="fas fa-check"></i>
    :
    <i style={{color:'red'}} className="fas fa-times"></i>}</td>
    <td className='action'><span style={{color:'green',marginRight:'5px'}}><i onClick={(e)=>handleEdit(user._id)} className="far fa-edit"></i></span><span style={{color:'red'}}><i onClick={(e)=>handleDelete(user._id)} className="fas fa-trash"></i></span></td>
     </tr>
  })
}

  </tbody>
</Table>:<h1>Users list empty</h1>
}
                </>
            }
        </div>
    )
}

export default ListAllUsers
