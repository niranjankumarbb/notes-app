const express= require('express')
 const app = express()
const port = 3050
 
//setup db
const configuredb = require('./config/database')
configuredb()
 
//enable express to parse json data 
app.use(express.json())
 
//setup routes
const routes = require('./config/routes')
 app.use('/',routes)
 
app.listen(port,()=>{
    console.log('Listening on port', port)
})     