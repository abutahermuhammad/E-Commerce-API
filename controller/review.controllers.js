const { database } = require('./mongodb.controller');
const ObjectId = require('mongodb').ObjectId;


/**
 * Get Reviews
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getReviews = async (req, res, next) => {
    let query;
	const {id, limit, skip} = req.query;

	if (id) query = await { _id: ObjectId(id) }
	if (!id) query = await {}

	const options = await {
		db: 'theautomobiles',
		table: 'reviews',
		method: 'find',
		data: {
			find: query,
			limit: parseInt(limit),
			skip: parseInt(skip)
		}
	}
	const data = await database(options);

    if (data?.length <= 0) {
        res.send({
            response: 200,
            message: "No data found"
        });
    }

	res.send({data});
}


/**
 * Add New Review
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addNewReview = async (req, res, next) => {
    const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'reviews',
		method: 'insertOne',
		data: data
	}	

	const result = await database(options);
	res.send(result);
}


/**
 * Update a Review
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateReview = async (req, res, next) => {
	const {id} = req.params;
	const {name, price} = await req.body;

    const filterQuery = { _id: ObjectId(id) };
    const replacementQuery = { $set: { name, price } };
	const options = {
		db: 'theautomobiles',
		table: 'reviews',
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
 * Delete A Review
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteReview = async (req, res, next) => {
	const {id} = req.params;

    const filterQuery = { _id: ObjectId(id) };
    
	const options = {
		db: 'theautomobiles',
		table: 'reviews',
		method: 'deleteOne',
		data: filterQuery
	}	
	const result = await database(options);

	res.send(result);
}


/**
 * Get a Single Review
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getSingleReview = async (req, res, next) => {
	const {id} = req.params;

	let query = await { _id: ObjectId(id) }

	const options = await {
		db: 'theautomobiles',
		table: 'reviews',
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