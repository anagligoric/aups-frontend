import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../assets/alati.css'
import { Alat } from '../models/Tool'
import { getAlatById, getAllAlat, updateAlat } from '../services/service'

const EditAlat = () => {
  const [alatDB, setAlatDB] = useState<Alat>()
  const [name, setName] = useState<string>('')
  const { id } = useParams()
  console.log(alatDB)

  useEffect(() => {
    if (id) {
      getAlatById(id).then((res:any) => {
        setAlatDB(res.data)
        if (res.data) {
          setName(res.data.name)
        }
      })
    }
    getAllAlat().then((res:any) => {
      setAlatDB(res.data)
    })
  }, [])

  function update (event:any) {
    event.preventDefault()
    if (id) {
      updateAlat(id, name)
        .then(() => {
          window.location.href = '/'
        })
    }
  }

  return (
    <form className= "add_alat_form">
  <label htmlFor="fname">Naziv:</label>
  <input type="text" name="fname" onChange={event => { setName(event.target.value) }} value = {name} ></input>
  <button type="submit" onClick = {update} className="btn_add_book">EDIT</button>
</form>
  )
}
export default EditAlat
