'use strict'

const Quark = require('proton-quark')
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')

module.exports = class AJVQuark extends Quark {

  constructor(proton) {
    super(proton)
    proton.app.ajv = {}
  }

  configure() {
    this.ajv = Ajv({ allErrors: true })
  }

  validate() {
    // Nothing to do ....
  }

  initialize() {
    this._compileSchemas()
  }

  _compileSchemas() {
    const schemas = this._schemas
    this.proton.app.ajv.compiled = {}
    for (let nameSchema in schemas) {
      console.log('nameSchema', nameSchema)
      const schema = schemas[nameSchema]
      this._compileSchema(schema, nameSchema)
    }
    this.proton.app.ajv.native = this.ajv
  }

  _compileSchema(schema, name) {
    this.proton.app.ajv.compiled[name] = this.ajv.compile(schema)
  }

  get _schemas() {
    const schemas = path.join(this.proton.app.path, '/ajv/schemas')
    return fs.existsSync(schemas) ? require('require-all')(schemas) : {}
  }

}
