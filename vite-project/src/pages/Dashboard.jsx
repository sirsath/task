import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Dashboard({admin}) {

    const [users, setusers] = useState([])

    const [newuser, setnewuser] = useState({
        name:"",
        username:"",
        admin:false
    })

    const [euser, seteuser] = useState({
        name:"",
        username:""  
    })

    const handleAddNewUser=async()=>{
        await axios.post("http://localhost:5000/users",newuser)
        getAllUsers()
    }

const getAllUsers=async()=>{
const {data}=await axios.get("http://localhost:5000/users")
data.splice(0,1)
setusers(data)
}

const handleUpdate=async()=>{
await axios.put(`http://localhost:5000/users/${euser.id}`,euser)
getAllUsers()
}

const handleDelete=async(item)=>{
    await axios.delete(`http://localhost:5000/users/${item.id}`)
    getAllUsers()
}

useEffect(() => {
  getAllUsers()
  return () => {
    
  }
}, [])


  return (
    <div className='dashboard-body'>
    {  
    admin
    ?<>
    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add User
</button>
<table className='table table-bordered'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map(user=><tr key={user.id}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.username}
                    </td>
                    <td>
<button 
data-bs-toggle="modal" data-bs-target="#updateModal"
onClick={e=>seteuser(user)}
className='btn btn-outline-warning'>
<i className='bi bi-pencil-square'></i>
</button>
<button 
onClick={e=>handleDelete(user)}
className='btn btn-outline-danger'>
    <i className='bi bi-trash'></i>
</button>
                    </td>
                </tr>)
            }
        </tbody>
      </table>
    </>
    
      
    :<table className='table table-bordered'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Username</th>
        </tr>
    </thead>
    <tbody>
        {
            users.map(user=><tr key={user.id}>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.username}
                </td>
            </tr>)
        }
    </tbody>
  </table>
    }



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="inp-group">
        <label htmlFor="name">Name</label>
        <input 
        value={newuser.name}
        onChange={e=>setnewuser
            ({...newuser,name:e.target.value})}
            className='form-control' type="text" name="" id="name" /><br />
        </div>
        <div className="inp-group mt-2">
        <label htmlFor="username">Username</label>
        <input 
        value={newuser.username}
        onChange={e=>setnewuser
            ({...newuser,username:e.target.value})}
        className='form-control' type="text" name="" id="username" />
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" 
        onClick={handleAddNewUser}
        class="btn btn-primary">Add User</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="inp-group">
        <label htmlFor="name">Name</label>
        <input 
        value={euser.name}
        onChange={e=>seteuser
            ({...euser,name:e.target.value})}
            className='form-control' type="text" name="" id="name" /><br />
        </div>
        <div className="inp-group mt-2">
        <label htmlFor="username">Username</label>
        <input 
        value={euser.username}
        onChange={e=>seteuser
            ({...euser,username:e.target.value})}
        className='form-control' type="text" name="" id="username" />
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"
        onClick={handleUpdate}
        >Save changes</button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
