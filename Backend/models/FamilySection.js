const mongoose = require('mongoose');

const FamilyImageSchema = new mongoose.Schema({
    id: String, // Keep id for frontend compatibility or use _id
    title: {
        type: String,
        trim: true
    },
    src: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
});

const FamilySectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    images: [FamilyImageSchema],
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('FamilySection', FamilySectionSchema);
