const mongoose = require('mongoose');

const VipImageSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    src: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
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

const VipSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    images: [VipImageSchema],
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('VipSection', VipSectionSchema);
