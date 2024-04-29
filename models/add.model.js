// {
//     id: '3',
//     title: 'Article title3',
//     shortDescription: 'Short description of the article...',
//     content: 'Main content of the article',
//     publishedDate: new Date('12-01-2024'),
//     author: 'John Doe',
//     imgPath: 'images/post-1.jpg',
//     price: '34',
//     address: 'Poland',
// },

const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, minlength: 5, maxlength: 200 },
    author: { type: String, required: true, ref: 'User' },   // dependency to User, keep User ID and use .populate('department'); to inject data
    address: { type: String, required: true },
    publishedDate: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },    // how to store jpg file?
});

module.exports = mongoose.model('Add', seatSchema); 