const axios = require('axios');
const cheerio = require('cheerio');


const webRequest = async( url ) => {
    const { data } = await axios({
        url,
        method:"GET",
        transformResponse: [body => cheerio.load(body)],
    })

    return {
        link: url,
        data
    };
}

module.exports = {
    webRequest
}