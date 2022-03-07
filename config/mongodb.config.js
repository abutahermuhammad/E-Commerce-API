const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');


// Initialization
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yfq1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

exports.initializeMongoDB = () => {
	return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
