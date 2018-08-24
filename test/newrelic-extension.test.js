/* eslint-env jest */

const NewRelicExtension = require('../src/newrelic-extension')

describe('NewRelicExtension', () => {
  describe('requestDidStart', () => {
    it(
      'creates a newrelic transaction with custom attributes when a request begins'
    )
  })

  describe('willSendResponse', () => {
    it(
      'instruments a trace summary and error count before sending the response to the client'
    )
  })
})
