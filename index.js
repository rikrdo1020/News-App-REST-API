require('dotenv').config();
const CronJob = require('cron').CronJob;

const { prensaPosts, mefPosts } = require('./services/scraping');

const Server = require('./models/server');

const server = new Server();
server.listen();


// const scrapingJob = new CronJob(process.env.CRON_TIME, () => {
//     console.log('ScrapingJob Executing...')
//     mefPosts();
//     prensaPosts();
// })

scrapingJob.start();





