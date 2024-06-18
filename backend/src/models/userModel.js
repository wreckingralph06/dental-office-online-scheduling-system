const db = require('config/dynamoConfig');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const tableName = 'users';

const getUser = async (userId) => {
	const params = {
		TableName: tableName,
		Key: { userId }
	};

	try {
		const data = await db.get(params).promise();
		return data.Item;
	} catch (error) {
		console.error('Error retrieving user:', error);
	}
};

const getUserByEmail = async (email) => {
	const emailLookupParams = {
			TableName: 'emailLookup',
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': email
			}
	};

	try {
		const emailLookupResult = await db.query(emailLookupParams).promise();
		if (emailLookupResult.Items.length === 0) {
				throw new Error('User not found');
		}
		const { userId } = emailLookupResult.Items[0];

		const userParams = {
				TableName: 'users',
				Key: {
						userId
				}
		};

		const userResult = await db.get(userParams).promise();
		return userResult.Item;
	} catch (error) {
			console.error('Error getting user by email: ', error);
			throw new Error('Error getting user by email');
	}
};

const createUser = async (user) => {
	const userId = uuidv4();
	const timestamp = new Date().toISOString();
	const { email, password, firstName, lastName } = user;

	const userParams = {
		TableName: tableName,
		Item: {
			userId,
			firstName,
			lastName,
			email,
			passwordHash: await bcrypt.hash(password, 10),
			createdAt: timestamp,
			updatedAt: timestamp,
		}
	}

	const emailLookupParams = {
		TableName: 'emailLookup',
		Item: {
				email,
				userId
		}
	};

	try {
		await db.put(userParams).promise();
		await db.put(emailLookupParams).promise();
		console.log("User created successfully.");
	} catch (error) {
		console.log("Error creating user: ", error);
	}
}

const updateUser = async (userId, updateParams) => {
	const updateExpressions = [];
	const updateAttributeNames = {};
	const updateAttributeValues = {};

	for (const key in updateParams) {
		updateExpressions.push(`#${key} = :${key}`);
		updateAttributeNames[`#${key}`] = key;
		updateAttributeValues[`:${key}`] = updateParams[key];
	}

	const params = {
		TableName: tableName,
		Key: { userId },
		UpdateExpression: `SET ${updateExpressions.join(', ')}`,
		ExpressionAttributeNames: updateAttributeNames,
		ExpressionAttributeValues: updateAttributeValues,
		ReturnValues: 'ALL_NEW',
	};

	try {
		const data = await db.update(params).promise();
		return data.Attributes;
	} catch (error) {
		console.error("Error updating user: ", error);
		throw new Error('Could not update user');
	}
}

const deleteUser = async (userId) => {
	const params = {
		TableName: tableName,
		Key: { userId },
	}

	try {
		await db.delete(params).promise();
		console.log("User deleted successfully.");
	} catch (error) {
		console.log("Error deleting user: ", error);
		throw new Error("Could not delete user");
	}
} 

module.exports = {
	getUser,
	getUserByEmail,
	createUser,
	updateUser,
	deleteUser
};