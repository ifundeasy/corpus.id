const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    method: 'GET',
    uri: 'https://www.google.com',
    headers: {
        'User-Agent': 'curl',
        'Accept': 'application/json'
    },
    timeout: 10000,
    resolveWithFullResponse: true,
    transform: function (body) {
        return cheerio.load(body, {
            xml: {
                withDomLvl1: true,
                normalizeWhitespace: true,
                xmlMode: false,
                decodeEntities: true
            }
        });
    }
};

module.exports = function (params = {}) {
    let opts = Object.assign(options, params);
    return rp(opts)
};
