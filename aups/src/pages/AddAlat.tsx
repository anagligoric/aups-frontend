import React from 'react'
import '../assets/alati.css'

const AddAlat = () => {
  return (
    <form className= "add_alat_form">
  <label htmlFor="fname">Naziv:</label>
  <input type="text" name="fname" placeholder="Enter naziv" ></input>
  <button type="submit" className="btn_add_book">ADD</button>
</form>
  )
}
export default AddAlat
