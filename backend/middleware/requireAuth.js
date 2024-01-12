const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'Authorization token required' });

    // req.headers.authoriztion like e.g. 'Bearer eiowijfoi234.weuhf23948.wei8hf9234'
    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' })
    }
};

module.exports = requireAuth;
