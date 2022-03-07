const {initializeMongoDB} = require('../config/mongodb.config');

const client = initializeMongoDB();

/**
 * Database
 * 
 * Input:
 * 		db			: Database
 * 		collection	: Database Collection
 * 		method		: MongoDB Operation Method
 * 		data		: Data
 * 			find: Query
 *			limit: RQuery Limit
 *			skip: Record Skip
 */

exports.database = async ({ db, table, method, data, upsert }) => {
	
	try {		
        await client.connect();
        // console.info('Connected successfully')

        const collection = client.db(db).collection(table);

		if (method === 'count') {
			// Record Insert: Single
            const result = await collection.find({}).count();
            console.info('Operation successfull')

            return result;
        } else if (method === 'insertOne') {
			let result = await collection.insertOne(data);
            console.info('Inserted successfully')

            return result;
        } else if (method === 'find') {
			// Record Find
			const queryLength = Object.keys(data).length;
			
			if (data.find) {
				if ( data.limit && !data.skip) {
					// Record with only limit()
					const result = await collection.find(data.find).limit(data.limit).toArray();
					
					return result;
				}  else if (data.skip && !data.limit) {
					// Record with only skip()
					const result = await collection.find(data.find).skip(data.skip).toArray();
					
					return result;
				} else if (data.skip && data.limit) { 
					// Record with skip() and limit().
					const result = await collection.find(data.find).skip(data.skip).limit(data.limit).toArray();
					
					return result;
				} else {
					// Records
					const result = await collection.find(data.find).toArray();
					
					return result;
				}
			} else {
				console.error('Somethig wrong');
				
				return;
			}
			
            // console.info('Data retrived successfully.')
			
        } else if (method === 'updateMany') {
			/**
			 *Record Update
			 * options: 
			 *		db: Database
			 *		table: collection
			 *		method: updateMany
			 *		data: 
			 *			filter: Current Data 
			 *			replace: Replacement Data
			 */
            const result = await collection.updateOne(data.filter, data.replace);
            // console.info('Record updated successfully.')

            return result;
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
            const result = await collection.updateOne(data.current, data.replace);
            // console.info('Record updated successfully.')

            return result;
        } else if (method === 'deleteOne') {
			// Record Remove
            const result = await collection.deleteOne(data);
            // console.info('Record removed successfully.')
			
            return result;
        } else {
            console.warn('Provide a valid method');
        }        
    } catch {
        'Error: ', console.error;
    } finally {
        client.close();
        // console.info('Connection closed successfully')
    }
}