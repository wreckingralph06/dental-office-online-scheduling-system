const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('models/userModel');
const secretKey = process.env.JWT_SECRET;

const signInHandler = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await getUserByEmail(email);
		if (!user) {
			return res.status(400).json({ error: 'Invalid email or password' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			return res.status(400).json({ error: 'Invalid email or password' });
		}

		const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: 'Error signing in' });
	}
};

module.exports = { signInHandler };