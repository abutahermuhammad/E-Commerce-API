const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;


/**
 * Get Payment
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getPayment = async (req, res, next) => {
    const {limit, skip, ...filter} = req.query

	const options = {
		db: 'theautomobiles',
		table: 'payments',
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
 * Place New Payment
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.placeNewPayment = async (req, res, next) => {
    const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'payments',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
}


/**
 * Get Single Payment
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getSinglePayment = async (req, res, next) => {
	const {id} = req.params;

	let query = await { _id: ObjectId(id) }

	const options = await {
		db: 'theautomobiles',
		table: 'payments',
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
 * Update a Payment
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateSingleOPayment = async (req, res, next) => {
	const {id} = req.params;
	const {name, price} = await req.body;

    const filterQuery = { _id: ObjectId(id) };
    const replacementQuery = { $set: { name, price } };
	const options = {
		db: 'theautomobiles',
		table: 'payments',
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