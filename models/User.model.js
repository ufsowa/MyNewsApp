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

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },   // TODO model redesign to have name field with {first, second}
    credentials: { type: String, required: true, ref: 'Credential'},
    avatar: { type: String, required: true },   // multer middleware to handle formData/files. Keep only path to file here
    phone: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema); 