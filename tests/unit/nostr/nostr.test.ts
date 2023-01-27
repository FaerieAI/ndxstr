/**
 * This file contains a set of unit tests for nostr related functions like getBlankEvent(),
 * serializeEvent(), getEventHash(), validateEvent(), verifySignature() and signEvent().
 */

import { expect } from 'chai'
import { getBlankEvent } from '../../../src/nostr/event'

describe('getBlankEvent', () => {
  it('should return an empty event object with properties for kind, pubkey, content, tags and created_at', () => {
    const blank = getBlankEvent()

    expect(blank).to.have.property('kind')
    expect(blank).to.have.property('pubkey')
    expect(blank).to.have.property('content')
    expect(blank).to.have.property('tags')
    expect(blank).to.have.property('created_at')

    // TODO: Add more assertions here to check the types of each property value in the blank event object returned by the function
  })
})
