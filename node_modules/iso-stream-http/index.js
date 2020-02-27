const http = require('http')
const https = require('https')
const { URL } = require('url')


module.exports = {
    http,
    https,
    getRequest: (options, cb) => {
        let protocol = 'http:'

        if(typeof options === 'string'){
            const url = new URL(options)
            protocol = url.protocol
        } else if(options.protocol){
            protocol = options.protocol
        }

        return protocol === 'http:' ? http.request(options, cb) : https.request(options, cb)
    }
}