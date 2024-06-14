const db = require('config/dynamoConfig');
console.log("db: ", db);

const tableName = 'users';

const getUser = async (userId) => {
    const params = {
        TableName: tableName,
        Key: { userId }
    };

    try {
        const data = await db.get(params).promise();
        console.log('User retrieved:', data.Item);
        return data.Item;
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
};

const createUser = async (user) => {
    const params = {
        TableName: tableName,
        Item: user, 
    }

    try {
        await db.put(params).promise();
        console.log("User created successfully.");
    } catch (error) {
        console.log("Error creating user: ", error);
    }
}

module.exports = {
    getUser,
    createUser,
};