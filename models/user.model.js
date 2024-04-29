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

const seatSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },   // image?
    phone: { type: String, required: true },
});

module.exports = mongoose.model('User', seatSchema); 