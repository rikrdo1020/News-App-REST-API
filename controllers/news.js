const { response } = require("express");
const { Post } = require("../models");

const newsGet = async(req, res = response) => {

    const { limit = 5, page = 1, source = null } = req.query;
    const query = source ? { source } : {}
    const [ total, posts ] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
            .skip(Number(page) * Number(limit))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        totalResults: limit,
        page,
        posts
    });
}

module.exports = {
    newsGet
}