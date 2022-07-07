import React from 'react'
import '../assets/alati.css'

const AddLokacija = () => {
  return (
    <form className= "add_alat_form">
  <label htmlFor="fname">Grad:</label>
  <input type="text" name="fname" placeholder="Enter grad" ></input>
  <label htmlFor="fname">Ulica:</label>
  <input type="text" name="fname" placeholder="Enter ulica" ></input>
  <label htmlFor="fname">Broj:</label>
  <input type="text" name="fname" placeholder="Enter broj" ></input>
  <button type="submit" className="btn_add_book">ADD</button>
</form>
  )
}
export default AddLokacija
