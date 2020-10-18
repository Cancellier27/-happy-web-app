import express from 'express'
import { getRepository } from 'typeorm'
import Orphanage from './models/Orphanage'

import './database/connection'

const app = express()

app.use(express.json())

app.post('/orphanages', async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const orphanagesRepository = getRepository(Orphanage)

  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  })

  await orphanagesRepository.save(orphanage)

  return response.status(201).json(orphanage)
})

app.listen(3333)





// ------------------------

// const port = 

// Route =  conjunto
// recurse = usuário

//methods = GET, POST, PUT, DELETE
//params 

//GET = buscar ma informação(lista, item)
//POST = criando uma informação
//PUT = Editando uma informação
//DELETE = deletando uma informação

