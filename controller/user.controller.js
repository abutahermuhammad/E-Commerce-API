const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;


/**
 * Get Products
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUsers = async (req, res, next) => {
    const {limit, skip, ...filter} = req.query

	const options = {
		db: 'theautomobiles',
		table: 'users',
		method: 'find',
		data: {
			find: {...filter},
			limit: parseInt(limit),
			skip: parseInt(skip)
		}
	}
	
	const data = await database(options)
	res.status(200).send(data)
}


/**
 * Get User
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.createUser = async (req, res, next) => {
    const data = req.body;
	
	const options = {
		db: 'theautomobiles',
		table: 'users',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options);

	res.send(result);
 }


/**
 * Get Single User
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getSingleUser = async (req, res, next) => {
	const {id} = req.params;

	let query = await { _id: ObjectId(id) }

	const options = await {
		db: 'theautomobiles',
		table: 'users',
		method: 'find',
		data: {
			find: query,
			limit: 1,
			skip: 0
		}
	}
	const data = await database(options);

    if (data?.length <= 0) {
        res.send({
            response: 200,
            message: "No data found"
        });
    }

	res.send(data);
}