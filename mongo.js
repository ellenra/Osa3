const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const person_name = process.argv[3]
const person_number = process.argv[4]

const url =
  `mongodb+srv://ellenr:{}@puhelinluettelo.gi9udhc.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: person_name,
  number: person_number
})

if(process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log(`phonebook:`)
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if(process.argv.length === 5) {
  person.save().then(() => {
    console.log(`added ${person_name} number ${person_number} to phonebook`)
    mongoose.connection.close()
  })
}
