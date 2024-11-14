const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.googleCallback = (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
};
