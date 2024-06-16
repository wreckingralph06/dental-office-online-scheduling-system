const { getUser, createUser, updateUser, deleteUser } = require('models/userModel');

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

const updateUserHandler = async (req, res) => {
    const userId = req.params.userId;
    const updateParams = req.body;

    try {
        const updatedUser = await updateUser(userId, updateParams);
        res.status(200).json({ message: "User Updated successfully ", user: updatedUser});
    } catch (error){
        res.status(500).json({error: "Error updating user"});
    }
}

const deleteUserHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        await deleteUser(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Error deleting user"});
    }
}

module.exports = {
    getUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler
};