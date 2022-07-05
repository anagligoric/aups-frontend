import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/login.css'
import { login } from '../services/service'

export const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const nav = useNavigate()

  function handleSubmit (event:any) {
    event.preventDefault()
    login(username, password)
      .then(() => {
        nav('/')
        window.alert('Login is successfull')
      })
  }

  return (<div >
  <form className="loginForm" onSubmit={handleSubmit}>
  <div className="imgcontainer">
    <img src="avatar.png" alt="Avatar" className="avatar"/>
  </div>
  <div className="container">
    <input type="text" placeholder="Enter Username" name="username" onChange={event => { setUsername(event.target.value) }} value = {username} required/>

    <input type="password" placeholder="Enter Password" name="password" onChange={event => { setPassword(event.target.value) }} value = {password} required/>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" name="remember"/> Remember me
    </label>
  </div>
  <div className="container">
    <span className="psw">Forgot <a href="#">password?</a></span>
  </div>
  </form>
  </div>
  )
}
