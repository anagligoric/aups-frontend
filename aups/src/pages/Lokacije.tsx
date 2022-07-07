
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Lokacija } from '../models/Location'
import { getAllLokacija } from '../services/service'
import '../assets/lokacije.css'

const Lokacije = () => {
  const [lokacijaDB, setLokacijaDB] = useState<Lokacija[]>([])

  useEffect(() => {
    getAllLokacija().then((res:any) => {
      setLokacijaDB(res.data)
    })
  })
  return (
  <>
    <Header/>

          <div className="alati">
  <table>
    <tr>
      <th>City</th>
      <th>Street</th>
      <th>Number</th>
      <td></td>
      <td></td>
    </tr>
    {lokacijaDB.map((lokacija, id) => (
    <tr key={lokacija.id}>
      <td>{lokacija.city}</td>
      <td>{lokacija.street}</td>
      <td>{lokacija.number}</td>
      <td><button>edit</button></td>
      <td><button>delete</button></td>

    </tr>
    ))}

  </table>
</div>
  </>
  )
}
export default Lokacije
