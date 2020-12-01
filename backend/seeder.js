const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv')

// load env vars
dotenv.config({path: './config/config.env'});

console.log(process.env.NODE_ENV);

//load models
const Archive = require('./models/Archive');
const User = require('./models/User');

// connect to DB 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// read JSON files
const archives = JSON.parse(fs.readFileSync(`${__dirname}/_data/archives.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// import into DB 
const importData = async () => {
    try {
        await Archive.create(archives);
        await User.create(users);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// delete
const deleteData = async () => {
    try {
        await Archive.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2]=== '-d'){
    deleteData();
}

// // handle unhandle rejection, promise rejection instead of try catch(eg. for db.js)
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error : ${err.message}`.red);
//   server.close(() => process.exit(1));
// });