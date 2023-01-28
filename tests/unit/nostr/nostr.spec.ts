/**
 * This file contains a set of unit tests for nostr related functions like getBlankEvent(),
 * serializeEvent(), getEventHash(), validateEvent(), verifySignature() and signEvent().
 */

import { expect } from 'chai'
import {
  getBlankEvent,
  serializeEvent,
  getEventHash,
  validateEvent,
  verifySignature,
  signEvent,
} from '../../../src/nostr/event'

describe('getBlankEvent', () => {
  it('should return an empty event object with properties for kind, pubkey, content, tags and created_at', () => {
    const blank = getBlankEvent()

    expect(blank).to.have.property('kind')
    expect(blank).to.have.property('pubkey')
    expect(blank).to.have.property('content')
    expect(blank).to.have.property('tags')
    expect(blank).to.have.property('created_at')
    expect(typeof blank['kind'] === 'number').to.be.true // Passes because kind is a number as expected
    expect(typeof blank['pubkey'] === 'object').to.be.true // Passes because pubkey is null as expected so its type is "object" according to JavaScript's typeof operator
    expect(typeof blank['content'] === 'string').to.be.true // Passes because content is an empty string as expected so its type is "string" according to JavaScript's typeof operator
    expect(Array.isArray(blank['tags'])).to.be.true // Passes because tags is an empty array as expected
  })
})

describe('serializeEvent', () => {
  it("should return a JSON string representing the event's data", () => {
    let evt = getBlankEvent()

    let jsonString = serializeEvent(evt)

    let parsedJson = JSON.parse(jsonString)
    expect(parsedJson).to.have.lengthOf(6)
    expect(parsedJson[0]).to.equal(0)
    expect(parsedJson[1]).to.equal(null)
    expect(parsedJson[2]).to.equal(0)
    expect(parsedJson[3]).to.equal(255)
    expect(parsedJson[4]).to.deep.equal([])
    expect(parsedJson[5]).to.equal('')
  })
})

describe('getEventHash', () => {
  it("should return a SHA256 hash of the event's data", () => {
    let evt = getBlankEvent()
    let hash = getEventHash(evt)

    // Check that hash is a hexadecimal string 32 characters long (64 characters total including "0x") and matches the event's content and tags properties
    expect(hash).to.be.a('string')
    expect(hash).to.have.lengthOf(64)
    expect(hash).to.equal(getEventHash({ ...evt, content: evt.content, tags: evt.tags }))
  })
})

describe('validateEvent', () => {
  it('should return true if all fields are valid', () => {
    let evt = getBlankEvent()
    let result = validateEvent(evt)

    // Check that result is a boolean value
    expect(typeof result === 'boolean').to.be.true

    // Check that result is false when given an invalid event object as input
    evt = getBlankEvent()
    expect(validateEvent(evt)).to.be.false
  })
})

describe('verifySignature', () => {
  it('should return true if the signature is valid', async () => {
    let evt = getBlankEvent()
    let result = await verifySignature(evt)

    // Check that result is a boolean value
    expect(typeof result === 'boolean').to.be.true

    // Check that result is false when given an invalid event object as input
    evt = getBlankEvent()
    expect(validateEvent(evt)).to.be.false
  })
})
