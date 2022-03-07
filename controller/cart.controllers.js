const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;


/**
 * Get Previous Cart
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getCart = async (req, res, next) => {
    const {limit, skip, ...filter} = req.query

	const options = {
		db: 'theautomobiles',
		table: 'cart',
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
 * Create Cart
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createCart = async (req, res, next) => {
    const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'cart',
		method: 'insertOne',
		data: data,
		upsert: true
	}	
	const result = await database(options)
	res.send(result)
}


/**
 * Delete Cart
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.deleteCart = async (req, res, next) => {
    const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'cart',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
}
