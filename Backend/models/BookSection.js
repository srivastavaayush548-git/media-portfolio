const mongoose = require('mongoose');

const BookItemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    cover: {
        type: String // URL or Base64
    },
    pages: {
        type: String
    },
    published: {
        type: String
    },
    language: {
        type: String
    },
    purchaseLink: {
        type: String
    },
    readOnline: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    }
});

const BookSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    books: [BookItemSchema],
    category: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('BookSection', BookSectionSchema);
