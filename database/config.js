const mongoose = require('mongoose');


const dbConnection = async()=> {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Database connected')
        console.log('--------------------------')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error initializing database');
    }
}

module.exports = {
    dbConnection
}