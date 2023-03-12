const { response } = require("express");
const bcryptjs = require('bcryptjs')

const User = require("../models/user");
const { genAPIKey } = require("../helpers/generate-apikey");


const usersGet = async(req, res = response) =>{

    const {limit = 5, from = 0} = req.query;
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const usersPost = async(req, res = response) =>{
    const { name, email, password, role } = req.body;
    
    const api_key = genAPIKey();
    const user = new User({name, email, password, role, api_key});

    //Ecrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Save in DB
    await user.save();

    res.json({
        user
    })
}


module.exports = {
    usersGet,
    usersPost
}