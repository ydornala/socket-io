const mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name: String,
    status: {
        type: String,
        enum: ['p', 'c'],
        default: 'p'
    },
    sequence: Number
});

var Sections = mongoose.model('Section', sectionSchema);

module.exports = Sections;