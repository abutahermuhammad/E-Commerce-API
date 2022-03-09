const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;


/**
 * Get Products
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOrders = async (req, res, next) => {
    const {limit, skip, ...filter} = req.query

	const options = {
		db: 'theautomobiles',
		table: 'orders',
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
 * Place New Order
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.placeNewOrder = async (req, res, next) => {
    const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'orders',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
}


/**
 * Get Single order
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getSingleOrder = async (req, res, next) => {
	const {id} = req.params;

	let query = await { _id: ObjectId(id) }

	const options = await {
		db: 'theautomobiles',
		table: 'orders',
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


/**
 * Update a order
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateSingleOrder = async (req, res, next) => {
	const {id} = req.params;
	const {name, price} = await req.body;

    const filterQuery = { _id: ObjectId(id) };
    const replacementQuery = { $set: { name, price } };
	const options = {
		db: 'theautomobiles',
		table: 'orders',
		method: 'updateOne',
		data: {
			current: filterQuery,
			replace: replacementQuery
		}
	}	
	const result = await database(options);
    console.log(result);

	res.send(result);
}


/**
 * Track Order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.trackOrder = async (req, res, next) => {
	const {id, email} = await req.params;

	let query = await { _id: ObjectId(id), email: email }

	const options = await {
		db: 'theautomobiles',
		table: 'orders',
		method: 'find',
		data: {
			find: query
		}
	}
	const data = await database(options);

	await res.send(data[0]);
}