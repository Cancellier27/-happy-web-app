import express from 'express'
import './database/connection'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

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

