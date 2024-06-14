const { getUser, createUser } = require('models/userModel');

const getUserHandler = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await getUser(userId);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({error: "Error retrieving user"});
    }
}

const createUserHandler = async (req, res) => {
    const user = req.body;

    try {
        await createUser(user);
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: "Error creating user"});
    }
}

module.exports = {
    getUserHandler,
    createUserHandler,
};