'use strict'

/**
 * Esplora module.
 * @module Esplora
 * @author EternityWall
 * @license LPGL3
 */

const fetch = require('cross-fetch');
require('./extend-error.js')
const URLError = Error.extend('URLError')

// Default public Esplora explorer url
const PUBLIC_ESPLORA_URL = 'https://blockstream.info/api'

/** Class used to query Esplora API */
module.exports = class Esplora {
  /**
   * Create a Esplora.
   * @param {Object} options - Esplora options parameters
   * @param {String} options.url -  explorer url
   * @param {int} options.timeout - timeout (in seconds) used for calls to esplora servers
   */
  constructor (options = {}) {
    this.url = options.url ? options.url : PUBLIC_ESPLORA_URL
    this.timeout = options.timeout ? options.timeout : 1000
  }

  /**
   * Retrieve the block hash from the block height.
   * @param {String} height - Height of the block.
   * @returns {Promise<String>} A promise that returns blockhash string
   */
  blockhash (height) {
    const url = this.url + '/block-height/' + height;
    const options = {
      method: 'GET',
      headers: { Accept: 'plain/text' },
      timeout: this.timeout,
    }
    // console.log('opentimestamps blockhash')
    return fetch(url, options)
      .then(r => r.text())
      .then(body => {
        if (!body) { throw URLError('Empty body') }
        return body
      }).catch(err => {
        console.error('Response error: ' + err.toString().substr(0, 100))
        throw err
      })
    // return {}
  }

  /**
   * Retrieve the block information from the block hash.
   * @param {Long} height - Height of the block.
   * @returns {Promise<String,Long>} A promise that returns merkleroot and timestamp
   */
  block (hash) {
    const url = this.url + '/block/' + hash;
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json' },
      timeout: this.timeout,
    }
    
    // console.log('opentimestamps block')
    return fetch(url, options)
      .then(r => r.json())
      .then(body => {
        if (!body) { throw URLError('Empty body') }
        if (!body.merkle_root || !body.timestamp) {
          throw URLError(body)
        }
        return { merkleroot: body.merkle_root, time: body.timestamp }
      }).catch(err => {
        console.error('Response error: ' + err.toString().substr(0, 100))
        throw err
      })
    // return {}
  }
}
