const User = require('../models/User.model');
const Session = require('../models/Session.model');

const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
    try {

        const {login, password, firstName, secondName, phone} = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'uknown';
        console.log('Register: ', req.body, req.file)

        if (login && typeof login === 'string' && password && typeof password === 'string'
            && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                return res.status(409).send({message: 'User with this login already exists'})
            }

            const user = await User.create({ login, password: await bcrypt.hash(password,10), firstName, secondName, phone, avatar: req.file.filename});
            res.status(201).send({ message: 'User created ' + user.login })
        } else {
            res.status(400).send({ message: 'Bad request' });
        }

    } catch (err) {
        res.status(500).send({message: err.message});
    }

}

exports.login = async (req, res) => {
    try {

        const { login, password } = req.body;

        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });

            if (!user) {
                res.status(400).send({ message: 'Login or password are incorrect'});
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = { login: user.login, id: user._id };     // add login to session
                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }
        } else {
            res.status(400).send({ message: 'Bad request' });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

exports.logout = async (req, res) => {
    const user = req.session.user;

    if (process.env.NODE_ENV !== "production")
        await Session.deleteMany({});
    
    req.session.destroy();

    res.status(200).send({ message: `${user.login} has been logout!` });

}

exports.getUser = async (req, res) => {

    res.send({ message: 'Yeah, I\'m logged!' });

    // if (req.session.login) {                        // check if login is in session
    //     res.status(200).send({ login: req.session.login });
    // } else {
    //     res.status(401).send({ message: 'You are not authorized' });
    // }
}