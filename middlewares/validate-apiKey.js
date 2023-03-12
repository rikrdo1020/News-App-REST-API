const { response } = require("express");
const { User } = require("../models");


const validateApiKey = async( req, res = response, next) => {

    const api_key = req.header('x-api-key');

    if( !api_key ) {
        return res.status(401).json({
            msg: 'No x-api-token in the request.'
        })
    }

    const account = await User.findOne({api_key});
    if( !account) {
        return res.status(401).json({
            msg: 'Invalid x-api-key.'
        })
    }

    next();
}

module.exports = {
    validateApiKey
}