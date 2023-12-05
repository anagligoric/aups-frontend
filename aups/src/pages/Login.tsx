import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/login.css'
import { login } from '../services/AuthService'

export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const nav = useNavigate()

  function handleSubmit (event:any) {
    event.preventDefault()
    login(email, password)
      .then(() => {
        nav('/')
      })
  }

  return (<div >
  <form className="loginForm" onSubmit={handleSubmit}>
  <div className="imgcontainer">
    <img src="avatar.png" alt="Avatar" className="avatar"/>
  </div>
  <div className="container">
    <input type="text" placeholder="Enter email" name="email" onChange={event => { setEmail(event.target.value) }} value = {email} required/>

    <input type="password" placeholder="Enter Password" name="password" onChange={event => { setPassword(event.target.value) }} value = {password} required/>

    <button type="submit">Login</button>
  </div>
  </form>
  </div>
  )
}
