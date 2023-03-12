
const { webRequest } = require('../helpers/scrape');
const { Post } = require('../models')

const mefPosts = async() => {

    const {data: $} = await webRequest('https://www.mef.gob.pa/categoria/noticias/');

    const getWebsitePromises = []

    $('[data-categoryslug=noticias]').each((i, el) => {
        const postLink = $(el).find('.post-image-link').prop('href');
        getWebsitePromises.push( webRequest( postLink ))
    })

    const websites = await Promise.all( getWebsitePromises );

    const posts = websites.map( e => {
        const postId = e.data('div[id="content"] article').prop('id')
        const title = e.data('.post-title').text().trim();
        const pubDate = e.data('.info-date').text();
        const tags = ['economia']
        const image = e.data('.entry-image img').prop('data-src');
        const content = e.data('.entry-content').text().trim();
        const link = e.link;
        const source = "mef"

        return {
            postId, title, content, image, pubDate, link, source, tags
        }
    })
    
    let results = []

    //Validate to don't insert duplicated
    await Promise.all(
        posts.map( async (post) => {
            const resp = await Post.findOne({postId: post.postId}).exec()
            if( !resp ) results.push(post);
        })
    )

    //console.log(results)
    try {
        await Post.insertMany(results);
        console.log('MEF - Data inserted')
        return { msg: 'Ok' }
    } catch (error) {
        throw new Error(error);
    }
    


}

const prensaPosts = async() => {
    const {data: $} = await webRequest('https://www.laestrella.com.pa/nacional');

    let websitePromises = []
    $('article .title a').each((i, el) => {
        const postLink = 'https://www.laestrella.com.pa' + $(el).prop('href')
        websitePromises.push( webRequest(postLink) )
    })

    const websites = await Promise.all( websitePromises );

    const posts = websites.map( e => {
        const postId = e.data('article').prop('id');
        const title = e.data('.article-title').text();
        const pubDate = e.data('.published-date time').prop('datetime')
        const description = e.data('.article-epigraph').text();
        const content = e.data('.content-modules').text().trim().replace(/\n/g,'');
        const tags = ['nacional'];
        const image = e.data('.image-container img').prop('src');
        const link = e.link;
        const source = "laestrella"

        return { postId, title, pubDate, description, content, image, link, source, tags }
    })

    let results = []

    //Validate to don't insert duplicated
    await Promise.all(
        posts.map( async (post) => {
            const resp = await Post.findOne({postId: post.postId}).exec()
            if( !resp ) results.push(post);
        })
    )

    //console.log(results)
    try {
        await Post.insertMany(results);
        console.log('LaEstrella - Data inserted')
        return { msg: 'Ok' }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    mefPosts,
    prensaPosts
}