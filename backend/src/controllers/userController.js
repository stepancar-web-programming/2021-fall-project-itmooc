require('dotenv').config();
require('../config/database').connect();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const isUserExisted = async ({ login }) => await User.findOne({ login });

const checkUserPassword = async ({ login, password }) => {
    let user = await User.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
        user.token = jwt.sign({ user_id: user._id, login }, process.env.TOKEN_KEY, {
            expiresIn: '2h'
        });
    } else user = null;
    return user;
};

const createUser = async ({ login, password, birthday, gender }) => {
    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        login: login.toLowerCase(),
        password: encryptedPassword,
        birthday,
        gender
    });
    user.token = jwt.sign({ user_id: user._id, login }, process.env.TOKEN_KEY, {
        expiresIn: '2h'
    });
    return user;
};

module.exports = { isUserExisted, checkUserPassword, createUser };
