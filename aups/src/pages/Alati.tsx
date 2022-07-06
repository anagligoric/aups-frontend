
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Alat } from '../models/Alat'
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
    <div>ALATI</div>
    <div className='alati'>
          {alatDB.map((alat, id) => (
          <div className="alat" key={alat.id}>
            <div><h3>{alat.naziv} </h3>
      </div>
          </div>
          ))}
          </div>
  </>
  )
}
export default Alati
