const jwt = require('jsonwebtoken');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { username, password } = req.body;

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admindataa';

    if (username === envUsername && password === envPassword) {
        const token = jwt.sign({ username: envUsername }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            username: envUsername,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

module.exports = { login };
