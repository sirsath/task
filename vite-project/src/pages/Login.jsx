
import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Login({setadmin}) {
    
    const [loginData, setloginData] = useState({
        username:"",
        password:""
    })

    const navigate=useNavigate()

    const handleLogin=async()=>{
        const {data}=await axios.get("http://localhost:5000/users")
        const result=data.find(item=>item.username==loginData.username && item.password==loginData.password)
        if(result.username){
            result.username=="admin" ?setadmin(true):setadmin(false)
        console.log("matched");
        navigate('/dashboard')
}else{
console.log("invlaid credentials");
}
    }

  return (
    <div class="container">
          <div class="row">
            <div class="col-sm-6 offset-sm-3">
              <div class="card">
                <div class="card-header bg-primary text-center text-light">
                    <h3>Login</h3>
                </div>
                <div class="card-body">
                  <div>
                    <label for="username" class="form-label">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      value={loginData.username}
                      onChange={e=>setloginData({...loginData,username:e.target.value})}
                      placeholder="Enter Your username"
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                  <div class="mt-2">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      value={loginData.password}
                      onChange={e=>setloginData({...loginData,password:e.target.value})}
                      placeholder="Enter Your Password"
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                  <button 
                  onClick={handleLogin}
                  type="button" class="btn btn-outline-primary w-100 mt-3">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
