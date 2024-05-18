// {
//     id: '1',
//     firstName: 'John',
//     secondName: 'Doe',
//     login: 'funnkyBoy',
//     password: 'pass',
//     avatar: 'pathToPicture.jpg',
//     phone: '123456',
// },

const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    user: { type: String, required: false, ref: 'User' },
    login: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Credential', credentialSchema); 