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

const createUser = async (user) => {
	const userId = uuidv4();
	const passwordHash = await bcrypt.hash(user.password, 10);
	const timestamp = new Date().toISOString();
	const params = {
		TableName: tableName,
		Item: {
			userId,
			passwordHash,
			createdAt: timestamp,
			updatedAt: timestamp,
			...user,
		}
	}

	try {
		await db.put(params).promise();
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
	createUser,
	updateUser,
	deleteUser
};