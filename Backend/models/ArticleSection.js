const mongoose = require('mongoose');

const ArticleItemSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    }
});

const ArticleSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    articles: [ArticleItemSchema],
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('ArticleSection', ArticleSectionSchema);
