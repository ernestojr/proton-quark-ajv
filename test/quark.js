const path = require('path')
const Quark = require('../index.js')

const proton = { app: { path: __dirname } }

const data = {
  "name": "Ernesto Rojas",
  "email": "ernesto20145@gmail.com",
  "address": "Guayana City, Bolívar, Venezuela.",
  "phone": "+584249491925",
  "age": 25,
  "status": "on",
}

describe('Quark test', () => {
  it('should load pre controllers', function*() {
    const quark = new Quark(proton)
    quark.configure()
    quark.initialize()
  })
  it('should show `proton.app.ajv.compiled`', function() {
    const isValid = proton.app.ajv.compiled.createUser(data)
    if (isValid) {
      console.log('The data is valid')
    } else {
      const ajv = proton.app.ajv.native
      console.error('The data is invalid', ajv.errorsText(proton.app.ajv.compiled.createUser.errors))
    }
  })
})
