const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const dotenv = require('dotenv')
const chalk = require('chalk')
const path = require('path')


// Initialization
dotenv.config();
const app = express() 
const port = process.env.PORT || 5000

const credentialsOptions = {
	"type": "service_account",
	"project_id": process.env.PROJECT_ID,
	"private_key_id": process.env.PRIVATE_KEY_ID,
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV55IpX7lvyeVQ\nebL8CZZF1MdFJWPg1sqU5F8xL8fLo1dpT7Hl/70vOmJV0cQPMm6+TANN7jSHeLCp\nMb+aSW6QWEZqPQdUgtHJaPntl9yoPbN8+kiejEQUbn0Wskxplt+dae3baOgMJb3n\n3bOaLcWwNNhUZ57MmKQ2yeA2osjTyvDt2gRRCsaybrzj7+Lfk48VkU4+pOL3eSMb\n6UpTHtAQmC8LLu3VVDwuHiIOYXZxxUxbWt+pxmtD8LGbpsk6EzhBfdCmK2YYUB8N\nlHdWcrxJGTL7wUDjdWBXG4rQlM1b5oCDkxc3aBJQmdlS7JckueVnKo64Xs+5jdZ+\n3/kesh3HAgMBAAECggEAOYny+O2UzJt26U5lTMfTRgeX22swLLfVd5Q3E7au3nPa\nlAIym0FwGQY0g5NqSZkGmAWuSQXzZMKHMNJ3JJ4mEcLIeHPnceFq6//e2vttB6jz\nUbfyEuVtJliIrCMRIIB4YcAsvAjG9Q6xl6PqEfaayHloRfGmKws2EQ+o/9+47U4E\nWyDmwv4HD1FMZVJymc8XEK+NScA9c+uRwAp5zcuQDPmymvKfReMv1N/hfu/5gopT\nvz+szwuNAzftKqCtN6HUynob06iu80Qodar7pCrzKPgsAQTBEbH9H6fjb0e0ELIX\nsJjT6dywtH+s/pG0nLFLlbZyTz1byaJeNX7cnPzQAQKBgQDOEdxMjvtDTMwA+79J\n4M/L6BEaH1lZd4HnhX15nmL/vKkJdU08Y1pxir31NaXA+q6D/8r4GfTnXvBBKCgz\n5+0zsE4ZcAMX0k0iZPCDsSzEVJY+F9uv+OG6dCl5Y+fwbbqMBU+j8VPhMkxHT3A8\nBpmBTw2sXFDi7Om8r70g3CiQAQKBgQC6OeJAg33Frz139LgM4Tb2xVNn8arkBmuL\nrqOv2lPmq6Edu5BJl4XpjevJG0tT/M1lQZTxAOdB1GoQfUk6ebW+gfFVoSkG9fSe\nx8wHj1OKfDRNGEdXyjgmr7swdObWDpkgdGMF/UN2QxUzoeTuC3qJ2YP/2YqlMOuv\ncZIgOdotxwKBgQCj8F2copuOnQgnOCCke6+U/tisOYhxvrugHvkFylXkMokgNyvt\nAPWxIrmg3L8zWbuA0/z7iFrnvwXQMExbjwWMe5SGdDBhwTMQS9F0U33T659jYsOp\nqYybM1LTegHJquIgBxGm0ZTzsXoxuScG+hEhaGzuVLsc7XG+ZOlHvR6gAQKBgE67\nwkh8T2SQ3nAk6tunLFHQw56ishmODVIVF+d1axuPXKLxdeNnSJqiAhoYjBSKQVya\nCZqLQzq1z9IA5kDuzEQrNBl79ZiXzECFQGHB2xQlxwcBSMh5Gpxgl8e45Q+DRIJQ\nMr2JgkgxvHkD7YInIDu/1usI0nFc6YhXf+xYCUJpAoGAAeG69yq52zVXM9GvIveJ\ns8ci4JBgvoo2M1ylxU4aW6JaZ5ORocSM/qGP1UUiZ7i1kFZi+MDnuNR7xQT1RcW/\nL068PDdxDaeZ5DhsjTRyQvf5riOi+V6IILdOw6t7TWbUesFRsrLQD++qAks+Fs3o\nILFlcYnHBLrpQZRC/sHt12U=\n-----END PRIVATE KEY-----\n", 
	"client_email": process.env.CLIENT_EMAIL,
	"client_id": process.env.CLIENT_ID,
	"auth_uri": process.env.AUTH_URI,
	"token_uri": process.env.TOKEN_URI,
	"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
	"client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}
admin.initializeApp({	
	credential: admin.credential.cert(credentialsOptions)
});


// Middlewere 
app.use(cors())
app.use(express.json())


// MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yfq1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/**
 * Database
 * Input: 
 * 		db			: Database 
 * 		collection	: Database Collection 
 * 		method		: MongoDB Operation Method  
 * 		data		: Data
 * 			find: Query
 *			limit: RQuery Limit
 *			skip: Record Skip
 *			
 *			
 */
const database = async ({ db, table, method, data }) => {
	
	try {		
        await client.connect()
        // console.info('Connected successfully')

        const collection = client.db(db).collection(table)

        if (method === 'insertOne') {
			// Record Insert: Single
            const result = await collection.insertOne(data)
            // console.info('Inserted successfully')

            return result
        } else if (method === 'find') {
			// Record Find
			const queryLength = await Object.keys(data).length
			
			if (data.find) {
				if ( data.limit && !data.skip) {
					// Record with only limit()
					const result = await collection.find(data.find).limit(data.limit).toArray()
					
					return result
				}  else if (data.skip && !data.limit) {
					// Record with only skip()
					const result = await collection.find(data.find).skip(data.skip).toArray()
					
					return result
				} else if (data.skip && data.limit) { 
					// Record with skip() and limit().
					const result = await collection.find(data.find).skip(data.skip).limit(data.limit).toArray()
					
					return result
				} else {
					// Records
					const result = await collection.find(data.find).toArray()
					
					return result
				}
			} else {
				console.error('Somethig wrong')
				
				return
			}
			
            // console.info('Data retrived successfully.')
			
        } else if (method === 'updateOne') {
			/**
			 *Record Update
			 * options: 
			 *		db: Database
			 *		table: collection
			 *		method: updateOne
			 *		data: 
			 *			current: Current Data 
			 *			replace: Replacement Data
			 */
            const result = await collection.updateOne(data.current, data.replace)
            // console.info('Record updated successfully.')

            return result
        } else if (method === 'deleteMany') {
			// Record Remove
            const result = await collection.deleteMany(data)
            // console.info('Record removed successfully.')
			
            return result
        } else {
            console.warn('Provide a valid method')
        }        
    } catch {
        'Error: ', console.error
    } finally {
        client.close() 
        // console.info('Connection closed successfully')
    }
}


// Middleware: Authorize 
const authorize = async (req, res, next) => {
	if (req?.headers?.authorization?.startsWith("Bearer ")) {
		const token = req.headers.authorization.split("Bearer ")[1]
		
		try {
			const decodedUser = await admin.auth().verifyIdToken(token)
			console.log('user', decodedUser)
			req.aguid = decodedUser.uid  // Authorized user id.
			next()
		} catch {
			res.status(500).json({
				status: 500,
				messge: 'Internal Server Error'
			})
		}
	} else {
		res.status(401).json({
			status: 401,
			messge: 'User not authorized.'
		})
	}
}

// Middleware: Error 
const errorMiddleware = (err, req, res, next) => {
	console.log(err.message)
	
	res.status(500).json({
		status: 500,
		message: "There is a in server side."
	})
}

app.use(errorMiddleware)


// Routes
/**
 *Route: /
 */
app.get('/', async (req, res) => {	
	res.sendFile(path.join(__dirname, '/views/api.html'))
})


// Get Products
app.get('/products', async (req, res) => {
	let query;
	const {id, limit, skip} = req.query

	if (id) query = await { _id: ObjectId(id) }
	if (!id) query = await {}

	const options = await {
		db: 'theautomobiles',
		table: 'products',
		method: 'find',
		data: {
			find: query,
			limit: parseInt(limit),
			skip: parseInt(skip)
		}
	}
	const data = await database(options)
	res.send(data)
})
/**
 * Insert Products
 */ 
app.put('/products', authorize ,async (req, res) => {
	const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'products',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
})


// Get Reviews
app.get('/reviews', async (req, res) => {
	const {limit, skip, ...filter} = req.query

	const options = {
		db: 'theautomobiles',
		table: 'reviews',
		method: 'find',
		data: {
			find: {...filter},
			limit: parseInt(req.query.limit),
			skip: parseInt(req.query.skip)
		}
	}	
	const data = await database(options)
	res.send(data)
})
/**
 * Insert Reviews
 */ 
app.put('/reviews', authorize, async (req, res) => {
	const data = req.body
	console.log(data)
	
	const options = {
		db: 'theautomobiles',
		table: 'reviews',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
})



// Get Orders
app.get('/orders', authorize, async (req, res) => {
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
})
// Post Orders
app.post('/orders', authorize, async (req, res) => {
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
})

/**
 * Insert Orders
 */ 
app.put('/orders', authorize , async (req, res) => {
	const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'orders',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
})



// Get Payments
app.get('/payments', authorize, async (req, res) => {
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
})

/**
 * Insert Payments
 */ 
app.put('/payments', authorize, async (req, res) => {
	const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'payments',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
})


// Get Users
app.get('/users', authorize, async (req, res) => {
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
})

/**
 * Insert Users
 */ 
app.put('/users', authorize , async (req, res) => {
	const data = req.body
	
	const options = {
		db: 'theautomobiles',
		table: 'users',
		method: 'insertOne',
		data: data
	}	
	const result = await database(options)
	res.send(result)
})


// Server 
app.listen(port, () => {
	console.log(chalk.cyanBright(`API server started at ${port}`))
	console.log(chalk.cyanBright(`http://localhost:${port}`))
})




