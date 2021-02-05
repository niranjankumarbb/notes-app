const mongoose = require('mongoose')

const configuredb = () => {
        mongoose.connect('mongodb://localhost:27017/notes-app-jan', {   
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
  }   

module.exports = configuredb   
 