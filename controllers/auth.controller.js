const User = require('../models/User.model');
const Credential = require('../models/Credential.model');
const Session = require('../models/Session.model');

const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
    try {

        const {login, password, firstName, secondName, phone} = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'uknown';
        const filePath = req.file.path
        console.log('Register: ', req.body, req.file)

        if (login && typeof login === 'string' && password && typeof password === 'string'
            && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

            const userWithLogin = await Credential.findOne({ login });
            if (userWithLogin) {
                fs.unlinkSync(filePath)                                                         //  clear file from disk in case of error
                return res.status(409).send({message: 'User with this login already exists'})
            }

            const userCredentials = await Credential.create({ login, password: await bcrypt.hash(password,10)});
            const user = await User.create({ firstName, secondName, phone, avatar: req.file.filename, credentials: userCredentials._id});
            await Credential.updateOne({ _id: userCredentials._id }, { $set: { user: user._id }});
            res.status(201).send({ message: 'Account created for ' + userCredentials.login })
        } else {
            fs.unlinkSync(filePath)
            res.status(400).send({ message: 'Bad request' });
        }

    } catch (err) {
        fs.unlinkSync(filePath)                                     
        res.status(500).send({message: err.message});
    }

}

exports.login = async (req, res) => {
    try {

        const { login, password } = req.body;

        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const userCredentials = await Credential.findOne({ login });

            if (!userCredentials) {
                res.status(400).send({ message: 'Login or password are incorrect'});
            } else {
                if (bcrypt.compareSync(password, userCredentials.password)) {
                    req.session.user = { login: userCredentials.login, id: userCredentials.user };     // add login to session
                        const item = await User.findById(userCredentials.user);
                        if(!item) res.status(404).json({ message: 'Not found' });
                        else res.status(200).json({ login: userCredentials.login, user: item });
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
    // res.json({ 
    //     message: 'User logged in!',
    //     login: req.session.user.login,
    //     id: req.session.user.id,
    //  });

     try {
        const item = await User.findById(req.session.user.id);
        if(!item) res.status(404).json({ message: 'No logged user' });
        else res.json({ login: req.session.user.login, user: item });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }

    // if (req.session.login) {                        // check if login is in session
    //     res.status(200).send({ login: req.session.login });
    // } else {
    //     res.status(401).send({ message: 'You are not authorized' });
    // }
}