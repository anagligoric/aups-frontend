import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/login.css'
import { register } from '../services/AuthService'
import { User } from '../models/User'
import { Role } from '../models/Role'

export const Register = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const nav = useNavigate()

  function handleSubmit (event:any) {
    event.preventDefault()
    const role: Role = {
      id: 2,
      ime: 'ROLE_USER'
    }
    const user: User = {
      firstName,
      surname,
      email,
      password,
      role
    }
    register(user)
      .then(() => {
        nav('/')
        //         window.alert('Login is successfull')
      })
  }

  return (<div >
  <form className="loginForm" onSubmit={handleSubmit}>
  <div className="imgcontainer">
    <img src="avatar.png" alt="Avatar" className="avatar"/>
  </div>
  <div className="container">
    <input type="text" placeholder="Enter Ime" name="ime" onChange={event => { setFirstName(event.target.value) }} value = {firstName} required/>
    <input type="text" placeholder="Enter Prezime" name="prezime" onChange={event => { setSurname(event.target.value) }} value = {surname} required/>
    <input type="text" placeholder="Enter Email" name="email" onChange={event => { setEmail(event.target.value) }} value = {email} required/>
    <input type="password" placeholder="Enter Lozinka" name="lozinka" onChange={event => { setPassword(event.target.value) }} value = {password} required/>
    <button type="submit">Register</button>
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
