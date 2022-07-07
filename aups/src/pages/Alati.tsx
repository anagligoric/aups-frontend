
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Alat } from '../models/Tool'
import { getAllAlat } from '../services/service'

const Alati = () => {
  const [alatDB, setAlatDB] = useState<Alat[]>([])

  useEffect(() => {
    getAllAlat().then((res:any) => {
      setAlatDB(res.data)
    })
  })
  return (
  <>
    <Header/>
          <div className="alati">
  <table>
    <tr>
      <th>Id</th>
      <th>Naziv</th>
      <td></td>
      <td></td>
    </tr>
    {alatDB.map((alat, id) => (
    <tr key={alat.id}>
      <td>{alat.id}</td>
      <td>{alat.name}</td>
      <td><Link to={`/editAlat/${alat.id}`}><button>edit</button></Link></td>
      <td><button>delete</button></td>
    </tr>
    ))}

  </table>
</div>
  </>
  )
}
export default Alati
