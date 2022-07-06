
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Lokacija } from '../models/Lokacija'
import { getAllLokacija } from '../services/service'

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
    <div>LOKACIJE</div>
    <div className='alati'>
          {lokacijaDB.map((lokacija, id) => (
          <div className="alat" key={lokacija.id}>
            <div>
                <h3>{lokacija.grad} </h3>
                <p>{lokacija.ulica}</p>
                <p>{lokacija.broj}</p>
      </div>
          </div>
          ))}
          </div>
  </>
  )
}
export default Lokacije
